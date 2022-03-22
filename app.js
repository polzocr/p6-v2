const express = require('express');
const mongoose = require('mongoose');

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




  
module.exports = app;


