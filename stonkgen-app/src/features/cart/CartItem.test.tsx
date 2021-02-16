import React from "react";
import { CartItem } from "./CartItem";
import { ICartItemExtended } from "./CartSlice";
import { shallow } from 'enzyme';


const mockItem : ICartItemExtended = {
  stock :{
    stockId: "7f5f0946-1144-472a-b14e-61bb39a7d976",
    currency: "HKD",
    ric: "0434.HK",
    bloombergTicker: "434 HK",
    bloombergTickerLocal: "434 HK",
    name: "Boyaa Interactive International Ltd",
    country: "Hong Kong",
    price: 500.24
  },
  displayPrice : null,
  displayStatus: "notReady",
  executionMode: "market",
  executionSide: "buy",
  amount: null,
  error: null,
  status: "prebooking",
  id: "123123",
  selected: false,
  isLoading: false

}
const handleItemChange  = () => {}

describe("Cart Item Component", () => {
  
  it("should render the cart Item", () => {
    let component = shallow(<CartItem item={mockItem} handleItemChange={handleItemChange} />) 
    expect(component).toMatchSnapshot();
  });

  it("should match mock props", () => {
    let component = shallow(<CartItem item={mockItem} handleItemChange={handleItemChange} />) 
    expect(component.find('[data-test="bloombergTickerLocal"]').text()).toEqual(mockItem.stock.bloombergTickerLocal)
    expect(component.find('[data-test="executionSide"]').props().children).toEqual(mockItem.executionSide)
    expect(component.find('[data-test="orderPrice"]').props().value).toEqual("")
    expect(component.find('[data-test="currency"]').text()).toEqual(mockItem.stock.currency)
    expect(component.find('[data-test="amount"]').props().value).toEqual("")
    expect(component.find('[data-test="executionMode"]').props().value).toEqual(mockItem.executionMode)
  });

  it("should handle amount change", () => {
    const mockedFunction = jest.fn();
    let component = shallow(<CartItem item={mockItem} handleItemChange={mockedFunction} />) 
    const amountInput = component.find('[data-test="amount"]')
    expect(amountInput.props().value).toEqual("")
    amountInput.simulate('change',{ target: { valueAsNumber: 1000 } });
    expect(mockedFunction).toHaveBeenCalledWith({ amount: 1000},mockItem.id)
  });

  it("should handle executionMode change", () => {
    const mockedFunction = jest.fn();
    let component = shallow(<CartItem item={mockItem} handleItemChange={mockedFunction} />) 
    const amountInput = component.find('[data-test="executionMode"]')
    expect(amountInput.props().value).toEqual("market")
    amountInput.simulate('change',{ target: { value: "limit" } });
    expect(mockedFunction).toHaveBeenCalledWith({ executionMode: "limit"},mockItem.id)
  });

  it("should disable orderPrice on market execution mode", () => {
    const mockedFunction = jest.fn();
    let component = shallow(<CartItem item={mockItem} handleItemChange={mockedFunction} />) 
    const amountInput = component.find('[data-test="executionMode"]')
    expect(amountInput.props().value).toEqual("market")
    expect(component.find('[data-test="orderPrice"]').props().disabled).toEqual(true)
  });

  it("should enable orderPrice on limit execution mode", () => {
    const mockedFunction = jest.fn();
    let component = shallow(<CartItem item={{...mockItem, executionMode: "limit"}} handleItemChange={mockedFunction} />) 
    const amountInput = component.find('[data-test="executionMode"]')
    expect(amountInput.props().value).toEqual("limit")
    expect(component.find('[data-test="orderPrice"]').props().disabled).toEqual(false)
  });

  
});
