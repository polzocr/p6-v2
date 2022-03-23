const mongoose = require('mongoose');
//const mongooseValidator = require('mongoose-unique-validator');


const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true}, //[true, 'Le nom de la sauce est indispensable !']
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required:true},
    mainPepper: {type: String, required:true},
    imageUrl: {type: String},
    heat: {type: Number},
    likes: {type: Number}, //default:0
    dislikes: {type: Number}, //default:0
    usersLiked: {type: Array}, //[String], default: []
    usersDisliked: {type:Array} //[String], default: []
});


//sauceSchema.plugin(mongooseValidator);
module.exports = mongoose.model('Sauce', sauceSchema);