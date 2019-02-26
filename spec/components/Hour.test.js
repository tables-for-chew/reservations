import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Hour from '../../client/components/Hour.jsx';

configure({ adapter: new Adapter() });

describe('Hour component', () => {
  test('renders', () => {
    const wrapper = shallow(<Hour />);
    expect(wrapper.exists()).toBe(true);
  });
});
