import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { store } from "../../app/store";

import { CartHistoryPage } from './CartHistoryPage'

describe("Cart History Page Component", () => {
    let component: renderer.ReactTestRenderer;
    beforeEach(() => {
      store.dispatch = jest.fn();
  
      component = renderer.create(
        <Provider store={store}>
          <CartHistoryPage />
        </Provider>
      );
    });

    it("should render the snapshot", () => {
        expect(component).toMatchSnapshot();
      });

    
})