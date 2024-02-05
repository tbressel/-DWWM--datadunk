const express = require('express');
const app = express();

const cors = require('cors');

app.use(cors());


const cardRoutes = require('./cards/card'); 
const statRoutes = require('./stats/stat'); 
const userRoutes = require('./users/user');
const formRoutes = require('./forms/form');

app.use('/api/cards', cardRoutes); 
app.use('/api/stats', statRoutes); 
app.use('/api/users', userRoutes); 
app.use('/api/forms', formRoutes); 

// const port = process.env.PORT || 4000;
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Serveur en écoute sur le port', port);
});
