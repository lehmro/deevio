import React from 'react'
import Result from './Result'
import {shallow} from 'enzyme'
it('renders without crashing', () => {
  shallow(<Result />);
});