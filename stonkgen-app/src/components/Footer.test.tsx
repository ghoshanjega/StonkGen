import React from 'react';
import { shallow } from 'enzyme';
import { Footer } from './Footer';


let wrapped = shallow(<Footer />);

describe('FooterComponent', () => {
  it('should render the Footer Component correctly', () => {   
    expect(wrapped).toMatchSnapshot();
  });
});