"use strict";

const express    = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');
const api = express();
const user_route  = require('../routes/user_route');
const transcript_route = require('../routes/transcript_route')
const partnerUniversity = require('../routes/partnerUniversity')
const middleware = require('../src/middleware')
const cors       = require('cors');
api.use(cors())
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(middleware.allowCrossDomain);


// Basic route
api.get('/', (req, res) => {
    res.json({
        name: 'Seba-Mobility backend application service'
    });
});

// API routes
api.use('/user', user_route);
api.use('/transcript', transcript_route)
api.use('/partners', partnerUniversity)

module.exports = api;