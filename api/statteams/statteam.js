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
                    lPerc: 0,
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
                globalStatRow.lPerc = globalStatRow.lr / globalStatRow.lt * 100;

                // push all added row into the array
                array.push(globalStatRow);
            }
            // rebuild a nwe array from this array.
            const globalArrays = arrays.map(array => array[array.length - 1]);
            console.log(globalArrays);

            let TeamA = globalArrays[0];
            let TeamB = globalArrays[1];

           
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            ///////////////////                 EFFICACITES OFFENSIVES ET DEFENSIVES              /////////////////////// 
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            possTeamA = (TeamA.twoT + TeamA.threeT) + (0.44 * TeamA.lt) + (TeamA.bp - TeamA.ro)
            possTeamB = (TeamB.twoT + TeamB.threeT) + (0.44 * TeamB.lt) + (TeamB.bp - TeamB.ro)
            
            scPossTeamA = (TeamA.twoR + TeamA.threeR) + (1 - (1 - (TeamA.lt > 0 ? TeamA.lr / TeamA.lt : 0))^2) * TeamA.lt * 0.4
            // scPossTeamA = (TeamA.twoR + TeamA.threeR)  + (1 - ((1 - (TeamA.lr / TeamA.lt))^2) ) + (TeamA.lt * 0.4)
            scPossTeamB = (TeamB.twoR + TeamB.threeR) + (1 - (1 - (TeamB.lt > 0 ? TeamB.lr / TeamB.lt : 0))^2) * TeamB.lt * 0.4
            // scPossTeamB = (TeamB.twoR + TeamB.threeR)  + (1 - ((1 - (TeamB.lr / TeamB.lt))^2) ) + (TeamB.lt * 0.4)
            
                        const offdefEfficiency = [
                            {
                                id_franchise: TeamA.id_franchise,
                                Poss: possTeamA,
                                Action: null,
                                ORtg: Math.round(100 * TeamA.pts / (possTeamA), 1),
                                FloorPerc: Math.round((scPossTeamA / possTeamA) * 100),
                                DRgt: Math.round(100 * TeamB.pts / possTeamB, 1),
                                StopPerc: null,
                                netRtg: null,
                            },
                            {
                                id_franchise: TeamB.id_franchise,
                                Poss: possTeamB,
                                Action: null,
                                ORtg: Math.round(100 * TeamB.pts / (possTeamB), 1),
                                FloorPerc: Math.round((scPossTeamB / possTeamB) * 100),
                                DRgt: Math.round(100 * TeamA.pts / possTeamA, 1),
                                StopPerc: null,
                                netRtg: null,
                            },               
                        ]

            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            ///////////////////                          FOUR FACTORS                             /////////////////////// 
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            
            // Add one row with the sum of each column
            
            const fourFactor = [
                {   
                    id_franchise: TeamA.id_franchise,
                    eFGPerc: Math.round((((TeamA.twoR + TeamA.threeR) + 0.5 * TeamA.threeR) / (TeamA.twoT + TeamA.threeT)) * 100),
                    twoPM: TeamA.twoR,
                    twoPA: TeamA.twoT,
                    twoPerc: TeamA.twoPerc,
                    threePM: TeamA.threeR,
                    threePA: TeamA.threeT,
                    threePerc: TeamA.threePerc,
                    ftm: TeamA.lr,
                    fta: TeamA.lt,
                    tir2pPerc: Math.round((TeamA.twoR * 100) / TeamA.twoT),
                    tir3pPerc: Math.round((TeamA.threeR * 100) / TeamA.threeT),
                },
                {
                    id_franchise: TeamB.id_franchise,
                    eFGPerc: Math.round((((TeamB.twoR + TeamB.threeR) + 0.5 * TeamB.threeR) / (TeamB.twoT + TeamB.threeT)) * 100),
                    twoPM: TeamB.twoR,
                    twoPA: TeamB.twoT,
                    twoPerc: TeamB.twoPerc,
                    threePM: TeamB.threeR,
                    threePA: TeamB.threeT,
                    threePerc: TeamB.threePerc,
                    ftm: TeamB.lr,
                    fta: TeamB.lt,
                    tir2pPerc: Math.round((TeamB.twoR * 100) / TeamB.twoT),
                    tir3pPerc: Math.round((TeamB.threeR * 100) / TeamB.threeT),
                },
            ]
            
            console.log(fourFactor);
          
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            ///////////////////            STATISTIQUES DE REUSSITE ET DE TENDANCE AUX TIRES      /////////////////////// 
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////


            const shootTryStats = [
                {   
                    id_franchise: TeamA.id_franchise,
                    eFGPerc: Math.round((((TeamA.twoR + TeamA.threeR) + 0.5 * TeamA.threeR) / (TeamA.twoT + TeamA.threeT)) * 100),
                    twoPM: TeamA.twoR,
                    twoPA: TeamA.twoT,
                    twoPerc: TeamA.twoPerc,
                    threePM: TeamA.threeR,
                    threePA: TeamA.threeT,
                    threePerc: TeamA.threePerc,
                    ftm: TeamA.lr,
                    fta: TeamA.lt,
                    ftPerc: TeamA.lPerc,
                    tir2pPerc: Math.round((TeamA.twoR * 100) / TeamA.twoT),
                    tir3pPerc: Math.round((TeamA.threeR * 100) / TeamA.threeT)
                },
                {
                    id_franchise: TeamB.id_franchise,
                    eFGPerc: Math.round((((TeamB.twoR + TeamB.threeR) + 0.5 * TeamB.threeR) / (TeamB.twoT + TeamB.threeT)) * 100),
                    twoPM: TeamB.twoR,
                    twoPA: TeamB.twoT,
                    twoPerc: TeamB.twoPerc,
                    threePM: TeamB.threeR,
                    threePA: TeamB.threeT,
                    threePerc: TeamB.threePerc,
                    ftm: TeamB.lr,
                    fta: TeamB.lt,
                    ftPerc: TeamB.lPerc,
                    tir2pPerc: Math.round((TeamB.twoR * 100) / TeamB.twoT),
                    tir3pPerc: Math.round((TeamB.threeR * 100) / TeamB.threeT)
                },
            ]

            console.log(shootTryStats);

            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            ///////////////////     STATISTIQUES DE REUSSITE ET DE TENDANCE AUX TIRS - DEFENSE    /////////////////////// 
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////

            const shootTryStatsDefense = [
                {   
                    id_franchise: TeamA.id_franchise,
                    eFGPerc: Math.round((((TeamB.twoR + TeamB.threeR) + 0.5 * TeamB.threeR) / (TeamB.twoT + TeamB.threeT)) * 100),
                    twoPM: TeamB.twoR,
                    twoPA: TeamB.twoT,
                    twoPerc: TeamB.twoPerc,
                    threePM: TeamB.threeR,
                    threePA: TeamB.threeT,
                    threePerc: TeamB.threePerc,
                    ftm: TeamB.lr,
                    fta: TeamB.lt,
                    ftPerc: TeamB.lPerc,
                    tir2pPerc: Math.round((TeamB.twoR * 100) / TeamB.twoT),
                    tir3pPerc: Math.round((TeamB.threeR * 100) / TeamB.threeT)
                },
                {
                    id_franchise: TeamB.id_franchise,
                    eFGPerc: Math.round((((TeamB.twoR + TeamB.threeR) + 0.5 * TeamB.threeR) / (TeamB.twoT + TeamB.threeT)) * 100),
                    twoPM: TeamB.twoR,
                    twoPA: TeamB.twoT,
                    twoPerc: TeamB.twoPerc,
                    threePM: TeamB.threeR,
                    threePA: TeamB.threeT,
                    threePerc: TeamB.threePerc,
                    ftm: TeamB.lr,
                    fta: TeamB.lt,
                    ftPerc: TeamB.lPerc,
                    tir2pPerc: Math.round((TeamB.twoR * 100) / TeamB.twoT),
                    tir3pPerc: Math.round((TeamB.threeR * 100) / TeamB.threeT)
                },
            ]

            console.log(shootTryStatsDefense);


            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            ///////////////////            STATISTIQUES DE REBOND ET EFFICACITE AU REBOND         /////////////////////// 
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////

            // Add one row with the sum of each column
            const rebArrays = [
                {
                    id_franchise: TeamA.id_franchise,
                    Oreb: TeamA.ro,
                    OrebPerc: Math.round((TeamA.ro / (TeamA.ro + TeamB.rd)) * 100),
                    Dreb: TeamA.rd,
                    DrebPerc:  Math.round((TeamA.rd / (TeamA.rd + TeamB.ro)) * 100),
                    reb: TeamA.rt,
                    rebPerc: Math.round((TeamA.rt / (TeamA.rt + TeamB.rt)) * 100)
                },
                {
                    id_franchise: TeamB.id_franchise,
                    Oreb: TeamB.ro,
                    OrebPerc: Math.round((TeamB.ro / (TeamB.ro + TeamA.rd)) * 100),
                    Dreb: TeamB.rd,
                    DrebPerc:  Math.round((TeamB.rd / (TeamB.rd + TeamA.ro)) * 100),
                    reb: TeamB.rt,
                    rebPerc: Math.round((TeamB.rt / (TeamB.rt + TeamA.rt)) * 100)
                },
            ]

            console.log(rebArrays);

            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            ///////////////////                 TENDANCES OFFENSIVES ET DEFENSIVES              /////////////////////// 
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////
            
                        const offdefTendances = [
                            {
                                id_franchise: TeamA.id_franchise,
                                astPerc: possTeamA,
                                astTov: null,
                                threePaPoss: null,
                                ftaPoss: null,
                                StlPerc: null,
                                blkPerc: null

                            },
                            {
                                id_franchise: TeamB.id_franchise,
                                astPerc: possTeamA,
                                astTov: null,
                                threePaPoss: null,
                                ftaPoss: null,
                                StlPerc: null,
                                blkPerc: null
                            },               
                        ]


            res.json([
                globalArrays,
                offdefEfficiency,
                fourFactor,
                shootTryStats, 
                rebArrays,
                shootTryStatsDefense,
                offdefTendances 
            ]);
        }
    });
    
    

});



/**
 * Function to calculate the average of a column, excluding zero values
 * 
 * @param {Array} array - The array of objects
 * @param {string} columnName - The name of the column
 * @returns {number} - The average value
 */
function calculateAverage(array, columnName) {
    // Filter out zero values before calculating the sum
    const filteredArray = array.filter(item => item[columnName] !== 0);

    // Calculate the sum of non-zero values
    const sum = filteredArray.reduce((total, item) => total + (item[columnName] || 0), 0);

    // Calculate the number of non-zero values
    const nonZeroCount = filteredArray.reduce((count, item) => count + (item[columnName] > 0 ? 1 : 0), 0);

    // Calculate the average
    const average = sum / nonZeroCount;

    // Round the average to two decimal places
    const roundedAverage = Number(average.toFixed(2));

    return isNaN(roundedAverage) ? 0 : roundedAverage;
}




module.exports = statApp;
