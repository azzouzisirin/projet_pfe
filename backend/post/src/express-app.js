const express = require('express');
const cors  = require('cors');
const { posts, appEvents  } = require('./api');
const HandleErrors = require('./utils/error-handler')


module.exports = async (app) => {

    app.use(express.json({ limit: '1mb'}));
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors());
    app.use(express.static(__dirname + '/public'))

    //Listeners
    appEvents(app);

    //api
    posts(app);

    // error handling
    app.use(HandleErrors);
    
}