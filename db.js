const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/clinica').MongoClient;
mongoose.Promise = global.Promise;

module.exports = mongoose;