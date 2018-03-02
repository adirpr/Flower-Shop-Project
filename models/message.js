var mongo = require("mongoose");
mongo.Promise = global.Promise;
var db = mongo.createConnection('mongodb://localhost:27017/myfirstdatabase');
db.once('open', function() { console.log("Connected to DB") });
db.on('error', function() { console.log("Error connecting to DB") });
console.log('Pending DB connection');

var Schema = mongo.Schema;
// Create a schema
var MessageSchema = new Schema({
    from: String,
    content: String,
    room: String,
    date: Date
});

var message = mongo.model('Message', MessageSchema);
module.exports = message;