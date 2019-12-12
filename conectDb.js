const mongoose = require('mongodb');

mongoose.connect('mongodb://localhost/clinica').MongoClient;
mongoose.Promise = global.Promise;

module.exports = mongoose;