var mongo = require("mongoose");
mongo.Promise = global.Promise;
var db = mongo.createConnection('mongodb://localhost:27017/myfirstdatabase');
db.once('open', function() { console.log("Connected to DB") });
db.on('error', function() { console.log("Error connecting to DB") });
console.log('Pending DB connection');

var Schema = mongo.Schema;
// Create a schema
var flowerSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    color: String,
    image: String,
    active: Boolean,
    price: Number,
    created_at: { type: Date, default: Date.now }
});

var flower = db.model('Flower', flowerSchema);
module.exports = flower;