const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const statRoutes = require('./stats/stat'); 
const userRoutes = require('./users/user');

app.use('/api/stats', statRoutes);
app.use('/api/users', userRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Serveur en écoute sur le port', port);
});
