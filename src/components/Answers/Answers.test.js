import React from 'react'
import Answers from './Answers'
import {shallow} from 'enzyme'

it('renders without crashing', () => {
  shallow(<Answers />);
});