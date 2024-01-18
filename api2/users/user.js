const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

const userApp = express();
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATA,
    port: process.env.DB_PORT
});

userApp.use(cors());

// Gestion des requêtes liées aux utilisateurs
userApp.get('/api/users', (req, res) => {
    // Traitement des requêtes liées aux utilisateurs
    // ...
    res.json({ message: 'Endpoint pour les utilisateurs' });
});

module.exports = userApp;
