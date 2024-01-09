const express = require('express');
const mysql = require('mysql2/promise');
const basicAuth = require('express-basic-auth');

const app = express();
const port = 3000;

// // Configure basic auth
// app.use(basicAuth({
//     users: { 'admin': 'supersecret' },
//     unauthorizedResponse: 'Unauthorized'
// }));

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'zisquier',
    password: 'pass',
    database: 'datadunk',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.get('/teams', async (req, res) => {
    try {
        const [rows, fields] = await pool.execute('SELECT * FROM team');
        res.json(rows); // Envoie une réponse JSON
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});