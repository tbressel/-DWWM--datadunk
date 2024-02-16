const { API_BASE_URL } = require('../config.js');

// Dotenv library used for environment variables
const dotenv = require('dotenv');
dotenv.config();

// MySQL library used for database connection
const mysql = require('mysql');

// Create a pool of connections to the database
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATA,
    port: process.env.DB_PORT
});

// Used to encrypt password
const bcrypt = require('bcrypt');


// Used to generate a token
const jwt = require('jsonwebtoken');

// Express application
const express = require('express');


// To create cookie (include a token inside)
const cookieParser = require('cookie-parser');

// to parse a body from a request 
const bodyParser = require('body-parser');


// to setting this API with requests coming only from one URL
const cors = require('cors');

// to clean up variables
const validator = require('validator');

// Start using Express on "userApp" endpoints
const userApp = express();

userApp.use(express.json());

// Setting Cors option
const corsOptions = {
    origin: { API_BASE_URL },
    optionsSuccessStatus: 200 
};

// Using Cors with previous setted options
userApp.use(cors(corsOptions));


// Analyse cookies 
userApp.use(cookieParser());

// Analyse body requests
userApp.use(bodyParser.urlencoded({ extended: false }));


///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////       ENDPOINTS      //////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
userApp.post('/verify', authenticateToken, (req, res) => {
    
    res.json({  valid: true,
                tokenObject: req.tokenObject });
});

////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////       USER LOGIN      /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

userApp.post('/login', (req, res) => {

    // Get datas from POST request
    const { action, pseudo, password } = req.body;
    const sql = 'SELECT * FROM _user_ WHERE user_pseudo = ?';

    // Use the connexion pools
    pool.getConnection((error, connection) => {
        if (error) {
            console.error(error);
            res.status(500).json({
                message: 'There is a probleme to connect to the database',
                status: 'Failure'
            });
            return;
        }

        // Execute a SQL query
        connection.query(sql, [pseudo], (error, queryResult) => {
            // Free the pool connexion
            connection.release(); 

            if (error) {
                console.error(error);
                res.status(500).json({
                    message: notificationMessage.login_failed,
                    status: 'Failure'
                });
            } else {
                if (queryResult.length > 0) {
                    const storedPassword = queryResult[0].user_password;

                    bcrypt.compare(password, storedPassword, (err, isMatch) => {
                        if (err) {
                            console.error(err);
                            res.status(500).json({
                                message: notificationMessage.login_failed,
                                status: 'Failure'
                            });
                        } else {
                            if (isMatch) {

                               // Utiliser une clé secrète fixe plutôt que de la générer à chaque fois
                                const secretKey = process.env.JWT_SECRET_KEY;

                                // Generate a token with user information and the secret key
                                const sessionToken = jwt.sign(
                                    {
                                        id: queryResult[0].id,
                                        firstname: queryResult[0].user_firstname,
                                        lastname: queryResult[0].user_lastname,
                                        pseudo: queryResult[0].user_pseudo,
                                        email: queryResult[0].user_email,
                                        status: queryResult[0].user_role,
                                        status_name: queryResult[0].user_role_name,
                                        avatar: queryResult[0].user_avatar,
                                    },
                                    secretKey,
                                    { expiresIn: '1h' }
                                );

                                // Generate the Json response    
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
                                    avatar: queryResult[0].user_avatar,
                                    sessionToken: sessionToken,
                                    
                                });
                            } else {
                                res.status(401).json({
                                    message: notificationMessage.login_failed,
                                    status: 'Failure'
                                });
                            }
                        }
                    });
                } else {
                    res.status(404).json({
                        message: 'Unknown user',
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

    // datas validation
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

    // calling bcrypt 
    const bcrypt = require('bcrypt');
    
    // repeat salt process during 10 rounds
    const saltRounds = 10;
    
    // hash the password with salt
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



// notification messages
const notificationMessage = { 
    'login_success': "Connexion à votre compte réussie",
    'delete_success': "La suppression de l'utilisateur a réussie",
    'login_failed': "Connexion à votre compte à échouée",
    'logout_success': "Vous allez être à présent déconnecté de votre compte",
    'add_success': 'L\'utilisateur a bien été ajouté',
}


// /**
//  * 
//  * Function to authenticate the token
//  * 
//  * @param {*} req 
//  * @param {*} res 
//  * @param {*} next 
//  * @returns 
//  */
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log(req.headers);
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);

    if (token == null) return res.sendStatus(401);

    // jwt.verify(token, process.env.JWT_SECRET_KEY, (err, {status}) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, tokenObject) => {

        // console.log(status)

        if (err) return res.sendStatus(403);
        req.tokenObject = tokenObject;
        next();
    });
}
module.exports = userApp;