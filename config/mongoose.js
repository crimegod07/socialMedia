const mongoose = require('mongoose');

//connecting in development environ ment
mongoose.connect('mongodb://localhost/codial_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to mongodb"));

db.once('open', function(){
    console.log("connected to Database :: MongoDB");
});

module.exports = db;