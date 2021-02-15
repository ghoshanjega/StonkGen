import React from 'react';
import { shallow } from 'enzyme';
import { Brand } from './Brand';


let wrapped = shallow(<Brand />);

describe('Brand Component', () => {
  it('should render the Brand name Component correctly', () => {   
    expect(wrapped).toMatchSnapshot();
  });
  it('renders the Brand text', () => { 
    expect(wrapped.find('span').text()).toEqual('StonkGen');
  });
});