import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Booked from '../../client/components/Booked.jsx';

configure({ adapter: new Adapter() });

describe('Booked component', () => {
  test('renders', () => {
    const wrapper = shallow(<Booked />);
    expect(wrapper.exists()).toBe(true);
  });

  test('displays number of bookings today', () => {
    const wrapper = shallow(<Booked />);
    wrapper.setState({ timesBooked: 100 });
    expect(wrapper.find('#bookedText').text()).toBe('Booked 100 times today');
  });
});
