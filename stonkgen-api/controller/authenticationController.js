'use strict';

var authenticationService = require('../service/authenticationService');

var authenticationController = {
    login: function (req, res) {
        const auth = req.body;
        res.json(authenticationService.login(auth));
    },
    signup: function (req, res) {
        const auth = req.body;
        res.json(authenticationService.signup(auth));
    },
};

module.exports = authenticationController;