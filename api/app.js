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
app.get('/api/franchise/2023', (req, res) => {
    const sql = `SELECT fg.id_season, 
    fg.id_franchise AS franchise_id, 
    fg.id_league AS league_id, 
    f.franchise_name,
    franchise_logo,
    l.league_logo 
    FROM franchise_game fg 
    JOIN franchise f ON fg.id_franchise = f.id
    JOIN league l ON fg.id_league = l.id
    WHERE fg.id_season = 23 
    GROUP BY fg.id_franchise, f.franchise_name,fg.id_league 
    ORDER BY fg.id_franchise ASC;
    ;
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
    franchise f ON fg.id_franchise = f.id
JOIN
    games g ON g.id = fg.id_games
JOIN
    league l ON fg.id_league = l.id

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
// Endpoint pour récupérer les données de la table 'franchise'
app.get('/api/players', (req, res) => {
    const sql = `SELECT p.id AS 'id_player',
    MAX(tp.id_games) AS id_games,
    MAX(p.player_firstname) AS player_firstname,
    MAX(p.player_name) AS player_name,
    p.player_birthdate,
    p.player_weight,
    p.player_height,
    p.player_photo,
    MAX(g.game_date) AS last_game_date,
    gs.id_franchise,
    f.franchise_logo
    FROM to_play tp 
    JOIN player p ON tp.id_player = p.id 
    JOIN games g ON tp.id_games = g.id 
    JOIN game_stats gs ON tp.id_game_stats = gs.id 
    JOIN franchise f ON gs.id_franchise = f.id
    WHERE tp.id_games IN ( 
        SELECT fg.id_games 
        FROM franchise_game fg 
        WHERE fg.id_season = 23 ) 
        GROUP BY p.id, gs.id_franchise 
        ORDER BY 'player_name' ASC;
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
