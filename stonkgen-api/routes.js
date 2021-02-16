'use strict';

// Controllers
const authentication = require('./controller/authenticationController');
const stockList = require('./controller/stockListController');
const cart = require('./controller/cartController')

module.exports = function (app) {
    app.route('/login')
        .post(authentication.login);
    app.route('/signup')
        .post(authentication.signup);
    app.route('/stocks')
        .get(stockList.getStocks);
    app.route('/cart')
        .post(cart.addToCart);
    app.route('/cart')
        .get(cart.getCart);
    app.route('/cart/:itemId/book')
        .patch(cart.bookItem);
    app.route('/cart/remove')
        .patch(cart.removeItems);
    app.route('/cart/history')
        .get(cart.getAllPreviousCartSessions);
};