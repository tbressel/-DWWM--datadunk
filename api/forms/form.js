const express = require('express');
const formApp = express();


/////////////////////////////////////////
//////////    MIDDLEWARES   /////////////
/////////////////////////////////////////

// cors (against cross-origin requests but from http://coach.datadunk.io)
// and configure accessiblility of the API
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    // origin: 'http://coach.datadunk.io',
    optionsSuccessStatus: 200
};
formApp.use(cors(corsOptions));




const mysql = require('mysql');
require('dotenv').config();

// Create a pool of connections to the database
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATA,
    port: process.env.DB_PORT
});

// Check if database connexion is OK
pool.getConnection((err, connection) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Connected to MySQL database');
// Free pool connexion after using it
    connection.release(); 
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
