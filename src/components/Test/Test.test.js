import React from 'react'
import Test from './Test'
import {shallow} from 'enzyme'
it('renders without crashing', () => {
  shallow(<Test />);
});