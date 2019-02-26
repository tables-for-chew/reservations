import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Date from '../../client/components/Date.jsx';

configure({ adapter: new Adapter() });

describe('Date component', () => {
  test('renders', () => {
    const wrapper = shallow(<Date />);
    expect(wrapper.exists()).toBe(true);
  });

  const changeDate = jest.fn();
  test('changes date', () => {
    const wrapper = shallow(<Date change={changeDate} />);
    wrapper
      .find('.box')
      .at(0)
      .simulate('click');
    expect(changeDate).toHaveBeenCalled();
  });
});
