const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const limitator = require('express-rate-limit');

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

const dotenv = require('dotenv');
dotenv.config();
const DATA_BASE = process.env.DATA_BASE_CONNEXION

const app = express();



mongoose.connect(DATA_BASE,
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



const rateLimit = limitator({
  windowMs: 15*60* 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message : "Trop de requêtes"
})

app.use(rateLimit);
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;


