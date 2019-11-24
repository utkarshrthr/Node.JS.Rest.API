const mongoose = require('mongoose')

// npm install mongoose

const mongoDb = 'mongodb://127.0.0.1:27017/test'

mongoose.connect(mongoDb)

mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Some error occured')) 

module.exports = mongoose;
