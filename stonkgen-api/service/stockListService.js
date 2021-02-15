const low = require('lowdb')
var _ = require('lodash');
const FileSync = require('lowdb/adapters/FileSync')
const { ErrorHandler } = require('../helper/error')

const adapter = new FileSync('database/stocks.json')
const stockdb = low(adapter)

// Set some defaults (required if your JSON file is empty)
stockdb.defaults({stocks:[]}).write()

const stockTable = stockdb.get('stocks')

const orderParams = ["stockId",'bloombergTickerLocal','name' ]

var stockListService = {
    getStocks: function (query) {
        const { page = 1, limit = 10, orderBy = 'stockId', trend= 'asc' } = query;
        const totalPages = Math.ceil(stockTable.value().length / limit)
        if (page > totalPages || limit > 200 || !orderParams.includes(orderBy)){
            throw new ErrorHandler(403, 'Query param not supported')
        }
        let stocks = stockTable.orderBy(orderBy,trend).slice((page - 1) * limit, page * limit)
        if (orderBy === 'bloombergTickerLocal'){
            stocks = stockTable.orderBy((obj)=>{return parseInt(obj.bloombergTickerLocal.split(' ')[0])},trend).slice((page - 1) * limit, page * limit)
        }
        return {
            totalPages: totalPages,
            currentPage: page,
            stocks
        }
    },
    getStock : function (stockId) {
        const stock = stockTable.find({stockId : stockId}).value()
        return stock;
    }
};

module.exports = stockListService;