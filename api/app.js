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
    const sql = 'SELECT * FROM franchise';

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
    const sql = 'SELECT * FROM games ORDER BY game_date DESC LIMIT 50';

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
