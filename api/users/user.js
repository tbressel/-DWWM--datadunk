// Express library used for routing, middleware, etc.
const express = require('express');
const userApp = express();

// Module pour la validation des données
const validator = require('validator'); 

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
///////////////////////////////////       USER ADD      /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
userApp.post('/add', (req, res) => {
    let {lastname, firstname, nickname, email, password, role } = req.body;

    // Validation des données
    firstname = validator.escape(firstname);
    lastname = validator.escape(lastname);
    nickname = validator.escape(nickname);
    email = validator.escape(email);
    password = validator.escape(password);
    role = validator.escape(role);

    if (!validator.isEmail(email)) {
        return res.status(400).json({
            message: 'Invalid email',
            status: 'Failure'
        });
    }

    // Hashage du mot de passe
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Error occurred',
                status: 'Failure'
            });
        }

        password = hash;

        const avatar = ('avatar-' + firstname + lastname + nickname + '.png').toLowerCase();
        console.log ('avatar:', avatar);
        const sql = `INSERT INTO _user_ (user_firstname, user_lastname,  user_pseudo, user_role, user_email, user_password, user_avatar) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
        
        pool.query(sql, [firstname, lastname, nickname, role, email, password, avatar], (error) => {
            if (error) {
                console.error(error);
                res.status(500).json({
                    message: 'Error occurred',
                    status: 'Failure'
                });
            } else {
                res.json({
                    message: notificationMessage.add_success,
                    status: 'Success',
                });
            }
        });
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////       USER UPDATE      /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////


userApp.post('/update', (req, res) => {

    // Get the data from the POST request and send them into variables
    let { id, new_lastname, new_firstname, new_nickname, new_email, new_password, new_role } = req.body;

    console.log('Received update request with data:', req.body);

    // Use Validator to escape the data like a striptags or htmlspecialchars in PHP (only on strings type)
    // new_role is a number so we don't need to escape it

    new_firstname = validator.escape(new_firstname);
    new_lastname = validator.escape(new_lastname);
    new_nickname = validator.escape(new_nickname);
    new_email = validator.escape(new_email);
    new_password = validator.escape(new_password);

    // input field contained string value, we must convert into number
    new_role = parseInt(new_role); 
    
    
    // Validator chack if the email is valid or not
    if (!validator.isEmail(new_email)) {
        return res.status(400).json({
            message: 'Invalid email',
            status: 'Failure'
        });
    }
    
    console.log('Data after validation:', { id, new_lastname, new_firstname, new_nickname, new_role, new_email, new_password });

    bcrypt.hash(new_password, 10, function (err, hash) {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Error occurred',
                status: 'Failure'
            });
        }
        // saving the hash
        new_password = hash;

        console.log('Data after hashing:', { id, new_lastname, new_firstname, new_nickname, new_role, new_email, new_password });

        const sql = `UPDATE _user_ 
        SET user_lastname=?, user_firstname=?, user_pseudo=?, user_role=?, user_email=?, user_password=? 
        WHERE id=?`;

        pool.query(sql, [new_lastname, new_firstname, new_nickname, new_role, new_email, new_password, id], (error) => {
            if (error) {
                console.error(error);
                res.status(500).json({
                    message: 'Error occurred',
                    status: 'Failure'
                });
            } else {
                res.json({
                    message: notificationMessage.update_success,
                    status: 'Success',
                    id: id,
                    new_lastname: new_lastname,
                    new_firstname: new_firstname,
                    new_pseudo: new_nickname,
                    new_email: new_email,
                    new_password: new_password,
                    new_role: new_role,
                });
            }
        });
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
    'logout_success': "Vous allez être à présent déconnecté de votre compte",
    'add_success': 'L\'utilisateur a bien été ajouté',
}



