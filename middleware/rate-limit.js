const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15*60* 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message : "Reessayer dans 12 heures"
});

module.exports = loginLimiter;
