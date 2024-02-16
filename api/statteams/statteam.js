const { API_BASE_URL } = require('../config.js');

const express = require('express');
const statApp = express();
statApp.use(express.json());


/////////////////////////////////////////
//////////    MIDDLEWARES   /////////////
/////////////////////////////////////////

// cors (against cross-origin requests but from http://coach.datadunk.io)
// and configure accessiblility of the API

// call the cors package
const cors = require('cors');

// configure the cors package
const corsOptions = {
    origin: { API_BASE_URL },
    optionsSuccessStatus: 200
};

// use the cors package
statApp.use(cors(corsOptions));




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


statApp.get('/matchsummaryteams/:id', async (req, res) => {

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

            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////          STATISTIQUES GLOBALES          //////////////////////////////// 
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            const uniqueFranchiseArray = {};

            for (const item of results) {
                const franchiseId = item.id_franchise;

                if (!uniqueFranchiseArray[franchiseId]) {
                    uniqueFranchiseArray[franchiseId] = [];
                }
                uniqueFranchiseArray[franchiseId].push(item);
            }
            const arrays = Object.values(uniqueFranchiseArray);

            // Add one row with the sum of each columns
            for (const array of arrays) {
                const globalStatRow = {
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

                // Columns Sum
                for (const item of array) {
                    globalStatRow.fiveD += item.fiveD || 0;
                    globalStatRow.min += item.min || 0;
                    globalStatRow.pts += item.pts || 0;
                    globalStatRow.twoR += item.twoR || 0;
                    globalStatRow.twoT += item.twoT || 0;
                    globalStatRow.threeR += item.threeR || 0;
                    globalStatRow.threeT += item.threeT || 0;
                    globalStatRow.lr += item.lr || 0;
                    globalStatRow.lt += item.lt || 0;
                    globalStatRow.ro += item.ro || 0;
                    globalStatRow.rd += item.rd || 0;
                    globalStatRow.rt += item.rt || 0;
                    globalStatRow.pd += item.pd || 0;
                    globalStatRow.bp += item.bp || 0;
                    globalStatRow.in += item.in || 0;
                    globalStatRow.ct += item.ct || 0;
                    globalStatRow.fte += item.fte || 0;
                    globalStatRow.cs += item.cs || 0;
                    globalStatRow.eval += item.eval || 0;
                    globalStatRow.plusMinus += item.plusMinus || 0;
                }

                // Specific column average
                globalStatRow.twoPerc = calculateAverage(array, 'twoPerc');
                globalStatRow.threetPerc = calculateAverage(array, 'threetPerc');
                globalStatRow.lPerc = calculateAverage(array, 'lPerc');

                array.push(globalStatRow);
            }

            const globalStatArray = arrays.map(array => array[array.length - 1]);
            // console.log(globalStatArray);


            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            ////////////////////////////          EFFICACITES OFFENSIVES ET DEFENSIVES          ///////////////////////// 
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////

            // Add one row with the sum of each columns
// Add one row with the sum of each columns
for (const array of arrays) {
    const defOffEfficiency = {
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
                // Columns Sum
                for (const item of array) {
                    defOffEfficiency.fiveD += item.fiveD || 0;
                    defOffEfficiency.min += item.min || 0;
                    defOffEfficiency.pts += item.pts || 0;
                    defOffEfficiency.twoR += item.twoR || 0;
                    defOffEfficiency.twoT += item.twoT || 0;
                    defOffEfficiency.threeR += item.threeR || 0;
                    defOffEfficiency.threeT += item.threeT || 0;
                    defOffEfficiency.lr += item.lr || 0;
                    defOffEfficiency.lt += item.lt || 0;
                    defOffEfficiency.ro += item.ro || 0;
                    defOffEfficiency.rd += item.rd || 0;
                    defOffEfficiency.rt += item.rt || 0;
                    defOffEfficiency.pd += item.pd || 0;
                    defOffEfficiency.bp += item.bp || 0;
                    defOffEfficiency.in += item.in || 0;
                    defOffEfficiency.ct += item.ct || 0;
                    defOffEfficiency.fte += item.fte || 0;
                    defOffEfficiency.cs += item.cs || 0;
                    defOffEfficiency.eval += item.eval || 0;
                    defOffEfficiency.plusMinus += item.plusMinus || 0;
                }

                // Specific column average
                defOffEfficiency.twoPerc = calculateAverage(array, 'twoPerc');
                defOffEfficiency.threetPerc = calculateAverage(array, 'threetPerc');
                defOffEfficiency.lPerc = calculateAverage(array, 'lPerc');

                array.push(defOffEfficiency);
            }

                res.json(globalStatArray);
            }
        });



});


/**
 * 
 * Function to calculate the average of a column
 * 
 * @param {*} array 
 * @param {*} columnName 
 * @returns 
 */
function calculateAverage(array, columnName) {
    const sum = array.reduce((total, item) => total + (item[columnName] || 0), 0);
    const average = sum / array.length;
    const roundedAverage = Number(average.toFixed(2));
    return isNaN(roundedAverage) ? 0 : roundedAverage;
}



module.exports = statApp;
