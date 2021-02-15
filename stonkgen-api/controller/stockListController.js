'use strict';

var stockListService = require('../service/stockListService');

var stocksListController = {
    getStocks: function (req, res) {
        const query = req.query;
        res.json(stockListService.getStocks(query));
    }
};

module.exports = stocksListController;