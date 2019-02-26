import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Party from '../../client/components/Party.jsx';
import $ from 'jquery';

configure({ adapter: new Adapter() });

describe('Party component', () => {
  test('renders', () => {
    const wrapper = shallow(<Party />);
    expect(wrapper.exists()).toBe(true);
  });

  const changeParty = jest.fn();
  const event = { target: { name: 'select', value: 10 } };
  test('changes party size on click', () => {
    const wrapper = shallow(<Party change={changeParty} />);
    wrapper.find('select').simulate('change', event);
    expect(changeParty).toHaveBeenCalled();
  });
});
