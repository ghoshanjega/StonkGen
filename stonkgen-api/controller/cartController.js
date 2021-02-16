'use strict';

var cartService = require('../service/cartService');

var cartController = {
    addToCart: function (req, res) {
        const execution = req.body;
        res.json(cartService.addToCart(execution));
    },
    getCart: function (req, res) {
        const params = req.query;
        res.json(cartService.getCart(params));
    },
    bookItem: function  (req,res) {
        const itemId = req.params.itemId;
        const execution = req.body;
        res.json(cartService.bookItem(itemId,execution));
    },
    removeItems: function (req,res) {
        const execution = req.body;
        res.json(cartService.removeItems(execution,execution));
    },
    getAllPreviousCartSessions : function (req, res) {
        const params = req.query;
        res.json(cartService.getAllPreviousCartSessions(params));
    },
};

module.exports = cartController;