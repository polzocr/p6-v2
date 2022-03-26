const PasswordValidator = require('password-validator');

const schema = new PasswordValidator();
schema
.is().min(8, 'minimum 8')
.is().max(30)
.has().uppercase()
.has().lowercase()
.has().digits(1)
.is().not().oneOf(['Password123', 'Azerty123', '123Password'])

module.exports = (req,res,next) => {
    const password = req.body.password;
    if (schema.validate(password)) {
        next();
    } else {
        console.log(schema.validate(password, {details: true}));
        res.status(400).json({error : 'Le mot de passe est incorrect'});
    }
}