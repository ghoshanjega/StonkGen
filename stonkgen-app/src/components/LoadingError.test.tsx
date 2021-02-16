import React from "react";
import { LoadingError } from './LoadingError'
import { shallow } from 'enzyme';


const loadingStat  = {
  loading : true,
  error : null
}

const errorStat = {
    loading : false,
    error: new Error("This is a valid error")
}


describe("Loading error Component", () => {
  
  it("should render the loading spinner", () => {
    let component = shallow(<LoadingError  loading={loadingStat.loading} error={loadingStat.error} ></LoadingError>) 
    expect(component.find(".spinner-border").length).toBe(1)
  });
  it("should render the error", () => {
    let component = shallow(<LoadingError  loading={errorStat.loading} error={errorStat.error} ></LoadingError>) 
    expect(component.find(".text-danger").text()).toEqual("This is a valid error")
  });
  it("should render the child", () => {
    let component = shallow(<LoadingError  loading={false} error={null} ><span data-test="child">Children</span></LoadingError>) 
    expect(component.find('[data-test="child"]').text()).toEqual("Children")
  });
  
});
