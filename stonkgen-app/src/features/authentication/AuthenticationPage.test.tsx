import React from "react";
import { AuthenticationPage } from "./AuthenticationPage";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { store } from "../../app/store";


describe("Authentication Component", () => {
  let component: renderer.ReactTestRenderer;
  beforeEach(() => {
    store.dispatch = jest.fn();

    component = renderer.create(
      <Provider store={store}>
        <AuthenticationPage />
      </Provider>
    );
  });
  it("should render the login snapshot", () => {
    expect(component).toMatchSnapshot();
  });

  it("renders username field", () => {
    expect(component.root.findByProps({ htmlFor: "userName" }).children).toEqual(["User Name"]);
  });

  it("renders login button", () => {
    expect(component.root.findByProps({ type: "submit" }).children).toEqual(["Login"]);
  });

  it("should dispatch an action on login button click", async () => {
    await renderer.act(async () => {
      component.root.findByType("form").props.onSubmit();
    });
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  it("should dispatch an action on signup button click", async () => {
    renderer.act( () => {
      component.root.findByProps({"data-test":"Sign Up"}).props.onClick();
    })
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
