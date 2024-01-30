const express = require('express');
const statApp = express();
statApp.use(express.json());


const cors = require('cors');
statApp.use(cors());

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

// Endpoint pour récupérer les données de la table 'franchise'
statApp.get('/franchise/2023', (req, res) => {
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
statApp.get('/games/:id', (req, res) => {

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
statApp.get('/players/2023', (req, res) => {
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

// Endpoint pour récupérer les données de la table 'franchise'
statApp.get('/formule', (req, res) => {
    const sql = `SELECT * FROM game_stats gs 
    WHERE gs.id IN ( 
        SELECT id_game_stats 
        FROM to_play 
        WHERE id_games IN ( 
            SELECT DISTINCT g.id 
            FROM games g 
            JOIN franchise_game fg ON fg.id_games = g.id 
            WHERE fg.id_season = 24 
            ORDER BY g.id DESC ) ) 
            ORDER BY gs.id ASC
            LIMIT 20;
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
statApp.post('/matchsubmit/:season/:team/:league', async (req, res) => {

        const { season, team, league } = req.params;

        if (season && team && league) {
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
                WHERE
                    fg.id_season = ? AND (g.teamIdHome = ? OR g.teamIdVisitor = ?) AND l.id = ?
                ORDER BY
                    game_date DESC
                LIMIT 10;`;

                pool.query(sql, [season, team, team, league], (error, results) => {
                    if (error) {
                        console.error(error);
                        res.status(500).json({
                            message: 'Error occurred',
                            status: 'Failure'
                        });
                    } else {
                        res.json(results);
                    }});

        } else {
            res.status(400).json({ error: 'Paramètres de requête manquants ou incorrects.' });
        }
        
});

  
module.exports = statApp;
