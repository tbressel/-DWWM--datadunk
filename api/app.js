const { API_LISTEN_PORT } = require('./config.js');

///////////////////////////////////////
//////////    FRAMEWORK   /////////////
///////////////////////////////////////

// Express (to use routes and)
const express = require('express');
const app = express();


const port = process.env.PORT || API_LISTEN_PORT;

app.listen(port, () => {
    console.log('Serveur en écoute sur le port', port);
});


const cardRoutes = require('./cards/card'); 
const statRoutes = require('./stats/stat'); 
const userRoutes = require('./users/user');
const formRoutes = require('./forms/form');

app.use('/api/cards', cardRoutes); 
app.use('/api/stats', statRoutes); 
app.use('/api/users', userRoutes); 
app.use('/api/forms', formRoutes); 

