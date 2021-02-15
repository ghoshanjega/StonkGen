export interface IStockShort {
    stockId: string;
    bloombergTickerLocal: string;
    name: string;
    price: number;
    currency: string;
}

export interface IStock extends IStockShort {
    ric: string;
    bloombergTicker: string;
    country: string;
}

export interface IStocksList {
    stocks : IStockShort[];
    totalPages: number;
    currentPage : number;
}

