const express = require('express');
const formApp = express();


const cors = require('cors');

formApp.use(cors());

const mysql = require('mysql');
require('dotenv').config();

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
    // const sql = "SELECT s.id, CONCAT('Saison ', YEAR(s.start_date), ' / ', YEAR(s.end_date)) AS season_field, GROUP_CONCAT(DISTINCT CONCAT(f.id, ':', franchise_name) ORDER BY f.id ASC SEPARATOR ', ') AS `franchises` FROM     season s JOIN franchise_game fg ON s.id = fg.id_season JOIN     franchise f ON f.id = fg.id_franchise GROUP BY     s.id, `season_field` ORDER BY     `season_field` DESC;";
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

formApp.get('/teams_list', (req, res) => {

    console.log('connected to season_list route');
    const sql = "SELECT id, franchise_name as 'team_field' FROM franchise; ";

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
formApp.get('/leagues_list', (req, res) => {

    console.log('connected to season_list route');
    const sql = "SELECT id, league_name as 'league_field' FROM league; ";

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
