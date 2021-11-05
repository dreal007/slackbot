"use strict"

const Database = {},
    Promise = require("bluebird");

Database.mongodb = {
    uri: process.env.MONGODB_URI,
    options: {
        native_parser: true,
        socketTimeoutMS: 0,
        keepAlive: true,
        reconnectTries: 20,
        poolSize: 5,
        promiseLibrary: Promise,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    },
    devOptions: {
        useNewUrlParser : true,
        useFindAndModify : false,
        useCreateIndex : true,
        useUnifiedTopology : true
    }
}  
 
 module.exports = Database;