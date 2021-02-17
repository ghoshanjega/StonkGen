import React from "react";
import { shallow } from "enzyme";

import { CartHistoryCards } from "./CartHistoryCards";
import { IGroupedCartItems } from "./CartHistorySlice";

const mockItem: IGroupedCartItems[] = [{
  sessionId: "testSession",
  items: [
    {
      id: "1613486729355",
      executionSide: "sell",
      status: "booked",
      isLoading: false,
      amount: 1,
      displayPrice: 1,
      error: null,
      displayStatus: "prebooking",
      executionMode: "buy",
      selected: false,
      stock: {
        stockId: "7b93b1ab-5bc0-49d7-bd4f-3b1806e5750c",
        currency: "HKD",
        ric: "0900.HK",
        bloombergTicker: "900 HK",
        bloombergTickerLocal: "900 HK",
        name: "AEON CREDIT SERVICE (ASIA) CO",
        country: "Hong Kong",
        price: 338.74,
      },
      executionModeBooked: "limit",
      amountBooked: 6,
      priceBooked: 54,
    },
  ],
}];

const handleItemChange = () => {};

describe("Cart History Cards Component", () => {
  it("should render the cart Item", () => {
    let component = shallow(<CartHistoryCards cartItems={mockItem}  />);
    expect(component).toMatchSnapshot();
  });

  it("should match mock props", () => {
    let component = shallow(<CartHistoryCards cartItems={mockItem}  />);
    expect(component.find('[data-test="bloombergTickerLocal"]').props().children).toEqual(mockItem[0].items[0].stock.bloombergTickerLocal);
    expect(component.find('[data-test="executionSide"]').props().children).toEqual(mockItem[0].items[0].executionSide);
    expect(component.find('[data-test="priceBooked"]').props().children).toEqual(mockItem[0].items[0].priceBooked+" "+mockItem[0].items[0].stock.currency);
    expect(component.find('[data-test="amountBooked"]').props().children).toEqual(mockItem[0].items[0].amountBooked);
    expect(component.find('[data-test="executionMode"]').props().children).toEqual(mockItem[0].items[0].executionModeBooked);
  });

  it("should render null props", () => {
    let component = shallow(<CartHistoryCards cartItems={null}  />);
    expect(component.find('[data-test="nothing"]').props().children).toEqual("Nothing to show yet");
  });
});
