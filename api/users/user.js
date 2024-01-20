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

userApp.post('/login', (req, res) => {

    // Récupérer les données de la requête POST
    const { pseudo, password } = req.body;
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
                                    message: 'Le mot de passe et pseudonyme correspondent',
                                    status: 'Success',
                                    id: queryResult[0].id,
                                    firstname: queryResult[0].user_firstname,
                                    lastname: queryResult[0].user_lastname,
                                    pseudo: queryResult[0].user_pseudo,
                                    email: queryResult[0].user_email,
                                    status: queryResult[0].user_role,
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

module.exports = userApp;
