const mongoose = require("mongoose");
const mongooseValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true}
})

userSchema.plugin(mongooseValidator, { message: 'Error, expected {PATH} to be unique.' });

module.exports = mongoose.model('User', userSchema);