const morgan = require('morgan');

morgan.token('id', (req,res) => req.auth.userId)

module.exports = morgan(':id :method :url :status :res[content-length]');

