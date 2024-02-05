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
