var mongo = require("mongoose");
mongo.Promise = global.Promise;
var db = mongo.createConnection('mongodb://localhost:27017/myfirstdatabase');
db.once('open', function() { console.log("Connected to DB") });
db.on('error', function() { console.log("Error connecting to DB") });
console.log('Pending DB connection');
var bcrypt = require('bcryptjs');

var Schema = mongo.Schema;
// Create a schema
var userSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    active: Boolean,
    occupation: String,
    branchNumber: { type: Number, default: -1 },
    age: { type: Number, min: 0, max: 120 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

// Callback
userSchema.pre('save', function(next) {
    var user = this;

    // Get the current date
    var currentDate = new Date();
    // Change the updated_at field to current date
    this.updated_at = currentDate;
    // If created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err)
                return next(err);
            console.log(user.password);
            user.password = hash;
            console.log('this.password: ' + user.password); // returns hashed password

            next();
        });
    });
    console.log('pre!');
});

var user = db.model('User', userSchema);
module.exports = user;

module.exports.getUserByUsername = function(userName, callback) {
    var query = { userName: userName, active: true };
    user.findOne(query, callback);
}

module.exports.getUserById = function(id, callback) {
    user.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}