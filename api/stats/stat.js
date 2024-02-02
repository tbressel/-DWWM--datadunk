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


statApp.post('/matchsubmit/:season/:team/:league', async (req, res) => {
    const { season, team, league } = req.params;

        var params = [];

        if(season != 0) {params.push(season)}  
        if(team != 0) {params.push(team)}  
        if(team != 0) {params.push(team)}  
        if(league != 0) {params.push(league)}  
        
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
                    }});

                    
   
                    
     
   
});


statApp.get('/matchsummary/:id', async (req, res) => {
    
    const gameId = req.params.id;

    const sql = `
    SELECT * 
    FROM game_stats 
    WHERE id IN ( 
        SELECT id_game_stats 
        FROM to_play 
        WHERE id_games = ?) 
        ORDER BY id ASC;    
    `;
    
    pool.query(sql, [gameId], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error occurred',
                status: 'Failure'
            });
        } else {
            const uniqueFranchiseArray = {};
    
            for (const item of results) {
                const franchiseId = item.id_franchise;
    
                if (!uniqueFranchiseArray[franchiseId]) {
                    uniqueFranchiseArray[franchiseId] = [];
                }
                uniqueFranchiseArray[franchiseId].push(item);
            }
    
            const arrays = Object.values(uniqueFranchiseArray);
    
            // Ajouter une ligne avec la somme des colonnes spécifiées
            for (const array of arrays) {
                const sumRow = {
                    id_franchise: array[0].id_franchise,
                    fiveD: 0,
                    min: 0,
                    pts: 0,
                    twoR: 0,
                    twoT: 0,
                    threeR: 0,
                    threeT: 0,
                    lr: 0,
                    lt: 0,
                    ro: 0,
                    rd: 0,
                    rt: 0,
                    pd: 0,
                    bp: 0,
                    in: 0,
                    ct: 0,
                    fte: 0,
                    cs: 0,
                    eval: 0,
                    plusMinus: 0
                };
    
                // Somme des colonnes spécifiées
                for (const item of array) {
                    sumRow.fiveD += item.fiveD || 0;
                    sumRow.min += item.min  || 0;
                    sumRow.pts += item.pts || 0;
                    sumRow.twoR += item.twoR || 0;
                    sumRow.twoT += item.twoT || 0;
                    sumRow.threeR += item.threeR || 0;
                    sumRow.threeT += item.threeT || 0;
                    sumRow.lr += item.lr || 0;
                    sumRow.lt += item.lt || 0;
                    sumRow.ro += item.ro || 0;
                    sumRow.rd += item.rd || 0;
                    sumRow.rt += item.rt || 0;
                    sumRow.pd += item.pd || 0;
                    sumRow.bp += item.bp || 0;
                    sumRow.in += item.in || 0;
                    sumRow.ct += item.ct || 0;
                    sumRow.fte += item.fte || 0;
                    sumRow.cs += item.cs || 0;
                    sumRow.eval += item.eval || 0;
                    sumRow.plusMinus += item.plusMinus || 0;
                }
    
                // Moyenne des colonnes spécifiées
                sumRow.twoPerc = calculateAverage(array, 'twoPerc');
                sumRow.threetPerc = calculateAverage(array, 'threetPerc');
                sumRow.lPerc = calculateAverage(array, 'lPerc');
    
                array.push(sumRow);
            }
    
            // console.log(arrays);
            // res.json(arrays);
            const lastRows = arrays.map(array => array[array.length - 1]);
            console.log(lastRows);
            res.json(lastRows);
        }
    });
    
    // Fonction pour calculer la moyenne d'une colonne donnée
    function calculateAverage(array, columnName) {
        const sum = array.reduce((total, item) => total + (item[columnName] || 0), 0);
        const average = sum / array.length;
        const roundedAverage = Number(average.toFixed(2));
        return isNaN(roundedAverage) ? 0 : roundedAverage;
    }
    
    
});



module.exports = statApp;
