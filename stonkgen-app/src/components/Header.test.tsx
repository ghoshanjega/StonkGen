import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { store } from "../app/store";

import { Header } from './Header'

describe("Header Component", () => {
    let component: renderer.ReactTestRenderer;
    beforeEach(() => {
      store.dispatch = jest.fn();
  
      component = renderer.create(
        <Provider store={store}>
          <Header />
        </Provider>
      );
    });

    it("should render the header snapshot", () => {
        expect(component).toMatchSnapshot();
      });

      it("renders home button", () => {
        expect(component.root.findByProps({"data-test":"home"}).children).toEqual(["Home"]);
      });

      it("renders orders button", () => {
        expect(component.root.findByProps({"data-test":"orders"}).children).toEqual(["Orders"]);
      });
})