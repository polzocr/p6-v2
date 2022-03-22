const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.auth = {userId};
        if(req.body.userId && req.body.userId !== userId){
            throw 'User Id non valable'; // res.status(403).json({error: 'Unauthorized request'});
        } else {
            //console.log("C'est bon le 'auth' fonctionne !")
            next();
        }
    } catch(error) {
        res.status(401).json({error: error | 'Requête non authentifiée !'});
    }
};