"use strict"

require("dotenv").config();
var mongoose = require("mongoose"),
    DBConfig = require('../config/database'),
    conn1;
    mongoose.Promise = require('bluebird');

if (process.env.NODE_ENV === 'production'){
    conn1 = mongoose.createConnection(DBConfig.mongodb.uri, DBConfig.mongodb.options);
	//mongoose.connect('mongodb://username:password@ds161426.mlab.com:61426/database');
}
else{
    conn1 = mongoose.createConnection(DBConfig.mongodb.uri, DBConfig.mongodb.devOptions);
}


conn1.once('open', function callback() {
    console.log('db connection open');
});

const ResponseModel  = require("./userResponse-model")(mongoose, conn1);

module.exports = {
    Response: ResponseModel,
    connection: conn1,
    mongoose: mongoose,
    mongodbConfig: DBConfig.mongodb
}