const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Importe le module cors
const app = express();
require('dotenv').config();

app.use(cors()); // Utilise cors middleware pour autoriser les requêtes cross-origin

app.listen(3001, () => {
    console.log('Serveur en écoute sur le port 3001');
});


require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    socketPath: process.env.SOCKET_PATH
});

connection.connect((err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Connected to MySQL');
    }
});



app.get('/api/app.js', (req, res) => {
    // Crée une requête SQL préparée
    const sql = 'SELECT * FROM team'; 

    // Exécute la requête
    connection.query(sql, (error, results) => {
        if (error) {
            // Si une erreur se produit, renvoie un message d'erreur
            res.json({
                'message': 'Error occurred',
                'status': 'Failure'
            });
        } else {
            // Sinon, renvoie les résultats de la requête
            res.json(results);
        }
    });
});

/**
 * 
 * Si le serveur renvoie ce message d'erreur : 
 *
 *  code: 'ER_NOT_SUPPORTED_AUTH_MODE',
 *  errno: 1251,
 *  sqlMessage: 'Client does not support authentication protocol requested by server; consider upgrading MySQL client',
 *  sqlState: '08004',
 *  fatal: true
 * 
 */

// ALTER USER 'zisquier'@'localhost' IDENTIFIED WITH mysql_native_password BY 'pass';
// FLUSH PRIVILEGES;