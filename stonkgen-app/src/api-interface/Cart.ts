import { IStock } from "./Stocks";

export interface IAddNewItem {
    sessionId : string;
    stockId: string;
    executionSide : string;
}

export interface ICartItem {
    id : string;
    stock : IStock;
    executionSide: string;
    status: string;
    amountBooked?:number;
    priceBooked?:number;
    executionModeBooked ?: string;
}

export interface IBookCartItem {
    executionSide: string;
      executionMode: string;
      displayPrice: number | null;
      amount: number|null;
}