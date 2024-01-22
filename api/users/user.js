// Express library used for routing, middleware, etc.
const express = require('express');
const userApp = express();

// Cors library used for cross-origin resource sharing
const cors = require('cors');
userApp.use(cors());

// Dotenv library used for environment variables
const dotenv = require('dotenv');
dotenv.config();

// MySQL library used for database connection
const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATA,
    port: process.env.DB_PORT
});

// Body-parser library used for parsing request bodies
const bodyParser = require('body-parser');
userApp.use(bodyParser.json());

// Bcrypt library used for password hashing
const bcrypt = require('bcrypt');

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////       ENDPOINTS      //////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////





////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////       USER LOGIN      /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

userApp.post('/login', (req, res) => {

    // Récupérer les données de la requête POST
    const { action, pseudo, password } = req.body;
    const sql = 'SELECT * FROM _user_ WHERE user_pseudo = ?';

    // Utiliser le pool de connexions pour éviter la gestion manuelle des connexions
    pool.getConnection((error, connection) => {
        if (error) {
            console.error(error);
            res.status(500).json({
                message: 'Problème de connexion à la base de données',
                status: 'Failure'
            });
            return;
        }

        // Exécuter la requête SQL
        connection.query(sql, [pseudo], (error, queryResult) => {
            connection.release(); // Libérer la connexion du pool

            if (error) {
                console.error(error);
                res.status(500).json({
                    message: 'La requête a échoué',
                    status: 'Failure'
                });
            } else {
                if (queryResult.length > 0) {
                    const storedPassword = queryResult[0].user_password;

                    bcrypt.compare(password, storedPassword, (err, isMatch) => {
                        if (err) {
                            console.error(err);
                            res.status(500).json({
                                message: 'Erreur interne du serveur : comparaison des mots de passe a échoué',
                                status: 'Failure'
                            });
                        } else {
                            if (isMatch) {
                                res.json({
                                    action: action,
                                    message: notificationMessage.login_success,
                                    status: 'Success',
                                    id: queryResult[0].id,
                                    firstname: queryResult[0].user_firstname,
                                    lastname: queryResult[0].user_lastname,
                                    pseudo: queryResult[0].user_pseudo,
                                    email: queryResult[0].user_email,
                                    status: queryResult[0].user_role,
                                    status_name: queryResult[0].user_role_name,
                                    avatar: queryResult[0].user_avatar
                                });
                            } else {
                                res.status(401).json({
                                    message: 'Le mot de passe ou le pseudo ne correspondent pas',
                                    status: 'Failure'
                                });
                            }
                        }
                    });
                } else {
                    res.status(404).json({
                        message: 'Utilisateur inconnu',
                        status: 'Failure'
                    });
                }
            }
        });
    });
});


////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////       USER LOGOUT      /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
userApp.get('/logout', (req, res) => {
    const action = req.query.action;
    res.json({
        action: action,
        message: notificationMessage.logout_success,
        status: 'Success',
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////       USER DELETE      /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
userApp.delete('/delete', (req, res) => {
    const id = req.query.id;
    const action = req.query.action;

    const sql = `DELETE FROM _user_ WHERE id = ?`;

    pool.query(sql, [id], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error occurred',
                status: 'Failure'
            });
        } else {
            res.json({
                action: action,
                message: notificationMessage.delete_success,
                status: 'Success',
            });
        }
    });
});


////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////       USERS LIST      /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
// Endpoint pour récupérer les données de la table 'franchise'
userApp.get('/list', (req, res) => {
    const sql = `SELECT * FROM _user_;
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


module.exports = userApp;



const notificationMessage = { 
    'login_success': "Connexion à votre compte réussie",
    'delete_success': "La suppression de l'utilisateur a réussie",
    'login_failed': "Connexion à votre compte à échouée",
    'logout_success': "Vous allez être à présent déconnecté de votre compte"
}



