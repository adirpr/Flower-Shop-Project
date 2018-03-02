var mongo = require("mongoose");
mongo.Promise = global.Promise;
var db = mongo.createConnection('mongodb://localhost:27017/myfirstdatabase');
db.once('open', function() { console.log("Connected to DB") });
db.on('error', function() { console.log("Error connecting to DB") });
console.log('Pending DB connection');

var Schema = mongo.Schema;
// Create a schema
var RoomSchema = new Schema({
    _id: String,
    protected: Boolean,
    password: String,
    clientIds: [String]
});

var room = mongo.model('Room', RoomSchema);
module.exports = room;