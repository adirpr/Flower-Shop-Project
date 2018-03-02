var mongo = require("mongoose");
mongo.Promise = global.Promise;
var db = mongo.createConnection('mongodb://localhost:27017/myfirstdatabase');
db.once('open', function() { console.log("Connected to DB") });
db.on('error', function() { console.log("Error connecting to DB") });
console.log('Pending DB connection');

var Schema = mongo.Schema;
// Create a schema
var branchSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: String,
    active: Boolean,
    address: String,
    phoneNumber: String,
    created_at: { type: Date, default: Date.now }
});

var branch = db.model('Branch', branchSchema);
module.exports = branch;