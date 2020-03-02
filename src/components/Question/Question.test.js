import React from 'react'
import Question from './Question'
import {shallow} from 'enzyme'
it('renders without crashing', () => {
  shallow(<Question />);
});