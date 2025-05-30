const { API_BASE_URL } = require('../config.js');

const express = require('express');
const cardApp = express();
cardApp.use(express.json());

const jwt = require('jsonwebtoken');
/////////////////////////////////////////
//////////    MIDDLEWARES   /////////////
/////////////////////////////////////////


// cors (against cross-origin requests but from http://coach.datadunk.io)
// and configure accessiblility of the API
const cors = require('cors');

const corsOptions = {
    origin: { API_BASE_URL },
    optionsSuccessStatus: 200
};
cardApp.use(cors(corsOptions));

const mysql = require('mysql');
const { Console } = require('console');

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

// Endpoint pour récupérer les données de la table 'franchise'
cardApp.get('/franchise/2023', (req, res) => {
    const sql = `SELECT fg.id_season AS season_id, 
    fg.id_franchise AS franchise_id, 
    fg.id_league AS league_id, 
    f.franchise_name,
    franchise_logo,
    l.league_logo 
    FROM franchise_game fg 
    JOIN franchise f ON fg.id_franchise = f.id
    JOIN league l ON fg.id_league = l.id
    WHERE fg.id_season = 24
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
cardApp.get('/games/:id', (req, res) => {

    const seasonId = req.params.id;

    const sql = `SELECT DISTINCT
    g.id AS 'id_games',
    g.game_date AS 'game_date',
    g.game_day AS 'game_day',
    l.league_logo AS 'league_logo',
    g.teamIdHome AS 'home_franchise_id',
    f_home.franchise_name AS 'home_franchise_name',
    f_home.franchise_logo AS 'home_franchise_logo',
    g.teamHomeScore AS 'home_score',
    g.teamIdVisitor AS 'visitor_franchise_id',
    f_visitor.franchise_name AS 'visitor_franchise_name',
    f_visitor.franchise_logo AS 'visitor_franchise_logo',
    g.teamVisitorScore AS 'visitor_score'
FROM
    games g
JOIN
    franchise f_home ON g.teamIdHome = f_home.id
JOIN
    franchise f_visitor ON g.teamIdVisitor = f_visitor.id
JOIN
	franchise_game fg ON fg.id_games = g.id 
JOIN
    league l ON fg.id_league = l.id
WHERE
    fg.id_season = ?
ORDER BY
    game_date DESC;
`;

    pool.query(sql, [seasonId], (error, results) => {
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
cardApp.get('/players/2023', (req, res) => {
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
        WHERE fg.id_season = 24 ) 
        GROUP BY p.id, gs.id_franchise 
        ORDER BY f.id ASC;
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


cardApp.post('/matchsubmit/:season/:team/:league', async (req, res) => {
    const { season, team, league } = req.params;

    var params = [];

    if (season != 0) { params.push(season) }
    if (team != 0) { params.push(team) }
    if (team != 0) { params.push(team) }
    if (league != 0) { params.push(league) }

    const sql = `
                SELECT DISTINCT
                    g.id AS 'id_games',
                    g.game_date AS 'game_date',
                    g.game_day AS 'game_day',
                    l.league_logo AS 'league_logo',
                    l.id AS 'league_id',
                    g.teamIdHome AS 'home_franchise_id',
                    f_home.franchise_name AS 'home_franchise_name',
                    f_home.franchise_logo AS 'home_franchise_logo',
                    g.teamHomeScore AS 'home_score',
                    g.teamIdVisitor AS 'visitor_franchise_id',
                    f_visitor.franchise_name AS 'visitor_franchise_name',
                    f_visitor.franchise_logo AS 'visitor_franchise_logo',
                    g.teamVisitorScore AS 'visitor_score'
                FROM
                    games g
                JOIN
                    franchise f_home ON g.teamIdHome = f_home.id
                JOIN
                    franchise f_visitor ON g.teamIdVisitor = f_visitor.id
                JOIN
                    franchise_game fg ON fg.id_games = g.id 
                JOIN
                    league l ON fg.id_league = l.id
                WHERE 1 = 1
                    ${season != 0 ? 'AND fg.id_season = ?' : ''}
                    ${team != 0 ? 'AND (g.teamIdHome = ? OR g.teamIdVisitor = ?)' : ''}
                    ${league != 0 ? 'AND l.id = ?' : ''}
                ORDER BY
                    game_date DESC
                `;

    pool.query(sql, params, (error, results) => {
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

// Endpoint pour récupérer les données de la table 'league'
cardApp.get('/league/', (req, res) => {
    const sql = `SELECT * FROM league;`

    pool.query(sql, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Error occurred',
                status: 'Failure'
            });
        } else {

            res.json(results);
        }

    });
});
// // Endpoint pour récupérer les données de la table 'league'
// cardApp.get('/league/', authenticateToken, (req, res) => {
//     const sql = `SELECT * FROM league;`

//     pool.query(sql, (error, results) => {
//         if (error) {
//             console.error(error);
//             return res.status(500).json({
//                 message: 'Error occurred',
//                 status: 'Failure'
//             });
//         }

//         // If the user is not null or not authorized
//         if (req.tokenObject.status !== 2) {
//             console.log('Vous n\'avez pas les droits');
//             return res.status(666).json({
//                 message: 'You are not allowed to access this resource',
//                 status: 'Failure',
//             });
//         }

//         res.json(results);
//     });
// });


module.exports = cardApp;

/**
 * 
 * Function to authenticate the token
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, tokenObject) => {

        // if user is null or token is not authorized
        if (err) return res.sendStatus(666);
        req.tokenObject = tokenObject;
        next();
    });
}