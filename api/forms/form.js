const express = require('express');
const formApp = express();


const mysql = require('mysql');
const cors = require('cors');

require('dotenv').config();
formApp.use(cors());

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




// 
formApp.get('/seasons_list', (req, res) => {

    console.log('connected to season_list route');
    const sql = "SELECT id, CONCAT( 'Saison ', YEAR(start_date), ' / ', YEAR(end_date)) AS season_field FROM season ORDER BY id DESC";

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

formApp.get('/teams_seasons_list', (req, res) => {

    console.log('connected to season_list route');
    const sql = "SELECT id, franchise_name FROM franchise; ";

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



module.exports = formApp;
