const express = require('express');
const app = express();

const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000; // Utilisation du port spécifié dans le fichier .env ou du port 5000 par défaut

app.use(cors());

// Utilise un pool de connexions
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATA,
    port: process.env.DB_PORT
});

// Vérifie si la connexion à la base de données est réussie
pool.getConnection((err, connection) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Connected to MySQL');
    connection.release(); // Libère la connexion du pool après utilisation
});

// Endpoint pour récupérer les données de la table 'franchise'
app.get('/api/franchise', (req, res) => {
    const sql = `SELECT DISTINCT
    f.id_franchise,
    f.franchise_name,
    f.franchise_logo,
    l.league_logo
FROM
    franchise f
JOIN franchise_game fg USING (id_franchise)
JOIN
    league l ON fg.id_league = l.id_league

ORDER BY f.id_franchise ASC`;    

    pool.query(sql, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error occurred',
                status: 'Failure'
            });
        } else {
            res.json(results);
        }
    });
});

// Endpoint pour récupérer les 10 premières lignes de la table 'games'
app.get('/api/games', (req, res) => {
    const sql = `SELECT
    fg.id_games,
    l.league_name,
    l.league_logo,
    GROUP_CONCAT(DISTINCT fg.id_franchise) AS id_franchises,
    GROUP_CONCAT(DISTINCT f.franchise_name) AS franchise_names,
    GROUP_CONCAT(DISTINCT f.franchise_logo) AS franchise_logos,
    GROUP_CONCAT(DISTINCT g.teamHomeScore) AS teamHomeScores,
    GROUP_CONCAT(DISTINCT g.teamVisitorScore) AS teamVisitorScores,
    GROUP_CONCAT(DISTINCT g.game_day) AS game_days,
    GROUP_CONCAT(DISTINCT g.game_date) AS game_dates
FROM
    franchise_game fg
JOIN
    franchise f ON fg.id_franchise = f.id_franchise
JOIN
    games g ON g.id_games = fg.id_games
JOIN
    league l ON fg.id_league = l.id_league

GROUP BY
    fg.id_games, l.league_name, l.league_logo
ORDER BY g.game_date DESC LIMIT 50


`;

    pool.query(sql, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error occurred',
                status: 'Failure'
            });
        } else {
            res.json(results);
        }
    });
});

app.listen(port, () => {
    console.log('Serveur en écoute sur le port', port);
});
