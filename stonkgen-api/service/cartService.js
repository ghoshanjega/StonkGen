const low = require('lowdb')
var _ = require('lodash');
const FileSync = require('lowdb/adapters/FileSync')
const { ErrorHandler } = require('../helper/error')

// db
const adapter = new FileSync('database/cart.json')
const cartdb = low(adapter)

cartdb.defaults({ orders: [] }).write()

//cart table
const cartTable = cartdb.get('orders')

//other services
var stockListService = require('../service/stockListService');
var authenticationService = require('../service/authenticationService');

var cartService = {
    addToCart: function (execution) {
        const stock = stockListService.getStock(execution.stockId)
        cartTable.push({
            id: Date.now().toString(),
            ...execution,
            status: "prebooking",
            stock
        }).write();
        return "ok"
    },
    getCart: function (params) {
        return cartTable.filter({ sessionId: params.sessionId }).value();
    },
    bookItem: function (itemId, execution) {
        const cartItem = cartTable.find({ id: itemId }).value()
        // console.log(execution,cartItem)
        if (cartItem) {
            if (cartItem.stock.bloombergTickerLocal === "5 HK") {
                // cartTable.find({id : itemId}).assign({
                //     ...cartItem,
                //     status: "rejected"
                // })
                throw new ErrorHandler(500, 'Oops, it seems that there is an internal server error.')
            }
            else if (cartItem.stock.bloombergTickerLocal === "11 HK") {
                throw new ErrorHandler(504, 'Gateway timeout')
            }
            else if (cartItem.stock.bloombergTickerLocal === "388 HK") {
                cartTable.find({ id: itemId }).assign({
                    ...cartItem,
                    executionMode : execution.executionMode,
                    amountBooked : null,
                    priceBooked: execution.executionMode === "market" ? cartItem.stock.price : execution.displayPrice,
                    status: "rejected"
                }).write()
                return cartTable.find({ id: itemId }).value();
            }
            else {
                const priceBooked =  execution.displayPrice || cartItem.stock.price
                console.log(execution.displayPrice,cartItem.stock,"asd")
                cartTable.find({ id: itemId }).assign({
                    ...cartItem,
                    executionModeBooked : execution.executionMode,
                    amountBooked : execution.amount,
                    priceBooked: priceBooked,
                    status: "booked"
                }).write()
                return cartTable.find({ id: itemId }).value();
            }
        }
        else {
            throw new ErrorHandler(404, 'Cart Item not found')
        }
    },
    removeItems: function (execution) {
        const removeIds = execution.itemId;
        console.log(removeIds)
        if (removeIds){
            removeIds.forEach(itemId => {
                cartTable.remove({ id: itemId }).write()
            });
            return "ok"
        }
    },
    getAllPreviousCartSessions: function (params)  {
        const {sessionId} = params;
        const {userId} = authenticationService.getUserIdFromSession({sessionId});
        const allSessionIds = authenticationService.getAllSessionsOfUser({userId}).map((item) => item.id)
        const grouped = [];
        allSessionIds.forEach((session)=>{
            const items = cartTable.filter({ sessionId: session, status : "booked" || "rejected" }).value();
            if (items.length > 0){
                grouped.push({sessionId : session,items })
            }
            
        })
        return _.sortBy(grouped,sessionId).reverse()
    }


}

module.exports = cartService;