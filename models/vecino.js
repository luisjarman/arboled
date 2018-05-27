const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Vecino Schema
const VecinoSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    Vecinoname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Vecino = module.exports = mongoose.model('Vecino', VecinoSchema);

module.exports.getVecinoById = function(id, callback){
    Vecino.findById(id, callback);
};

module.exports.getVecinoByVecinoname = function(Vecinoname, callback){
    const query = {Vecinoname: Vecinoname};
    Vecino.findOne(query, callback);
};

module.exports.addVecino = function(newVecino, callback){
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newVecino.password, salt, function (err, hash) {
            if (err) throw err;
            newVecino.password = hash;
            newVecino.save(callback);
        });
    });
}


module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (error, isMatch) {
        if (error) throw error;
        callback(null, isMatch);
    })
}