const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const helmet = require('helmet');

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

const dotenv = require('dotenv');
dotenv.config();
const NAME = process.env.USER;
const MDP = process.env.SECRET_PASS;
const BDD = process.env.CLUSTER_NAME;
const BDD_NAME = process.env.DB_NAME;

const app = express();
app.use(helmet());

mongoose.connect("mongodb+srv://"+ NAME +":" + MDP +"@"+ BDD + ".j5cho.mongodb.net/"+BDD_NAME+"?retryWrites=true&w=majority",
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

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;


