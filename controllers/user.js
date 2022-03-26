const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const sanitize = require('mongo-sanitize');
const dotenv = require('dotenv').config();
const TOKEN = process.env.TOKEN;


exports.signup = (req, res, next) => {
    bcrypt.hash(sanitize(req.body.password), 10)
    .then(hash => {
        const user = new User({
            email: sanitize(req.body.email),
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({message: "Utilisateur crée avec succès !"}))
        .catch(error => {
            console.log(error);
            res.status(400).json({error});
        });
    })

    .catch(error => {
        console.log(error);
        res.status(500).json({error});
    });
};

exports.login = (req,res, next) => {
    User.findOne({email: sanitize(req.body.email)})
    .then(user => {
        if(!user) {
            return res.status(401).json({error: "Utilisateur non trouvé"});
        }
        bcrypt.compare(sanitize(req.body.password), user.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({error: "Mot de passe incorrect"});
            }
            //res.setHeader('Authorization', 'Bearer '+ letokenenquestion);
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    {userId: user._id},
                    TOKEN,
                    {expiresIn: '24h'}
                )
            });
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

