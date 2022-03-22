const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

const dotenv = require('dotenv');
dotenv.config();
const NAME = process.env.USER;
const MDP = process.env.SECRET_PASS;
const BDD = process.env.CLUSTER_NAME;

const app = express();

mongoose.connect("mongodb+srv://"+ NAME +":" + MDP +"@"+ BDD + ".j5cho.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à nodemonMongoDB échouée !'));

app.use(express.json()); //on recupère le corps JSON des requête POST

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});



app.use('/api/auth', userRoutes);

module.exports = app;


