const express = require('express');
const app = express();

const mysql = require('mysql');

const cors = require('cors');

require('dotenv').config();

const port = 5000;

app.use(cors());

// Utilise un pool de connexions
const pool = mysql.createPool({
    connectionLimit: 10, // Limite le nombre de connexions dans le pool
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATA,
    port: process.env.DB_PORT, // Ajoute cette ligne pour spécifier le port
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

app.listen(port, () => {
    console.log('Serveur en écoute sur le port', port);
});

app.get('/api/app.js', (req, res) => {
    // Crée une requête SQL préparée
    const sql = 'SELECT * FROM franchise'; 


    // Exécute la requête à partir du pool de connexions
    pool.query(sql, (error, results) => {
        if (error) {
            console.error(error);
            res.json({
                'message': 'Error occurred',
                'status': 'Failure'
            });
        } else {
            res.json(results);
        }
    });
});

app.get('/api/app.js', (req, res) => {
    // Crée une requête SQL préparée
    const sql = 'SELECT * FROM games LIMIT 10'; 


    // Exécute la requête à partir du pool de connexions
    pool.query(sql, (error, results) => {
        if (error) {
            console.error(error);
            res.json({
                'message': 'Error occurred',
                'status': 'Failure'
            });
        } else {
            res.json(results);
        }
    });
});
