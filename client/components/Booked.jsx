import React from 'react';
import $ from 'jquery';
// import styled from 'styled-components';
const { styled } = window;

class Booked extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timesBooked: 0
    };
  }

  componentDidMount() {
    $.ajax({
      url: '/api/reserve/load/' + this.props.rest,
      method: 'GET',
      success: nTimes => {
        if (nTimes[0]) {
          this.setState({ timesBooked: nTimes[0].bookings_today });
        }
      },
      error: err => console.error('Failed to load: ', err)
    });
  }

  render() {
    return (
      <BookedNTimes>
        <ChartIcon width="24px" height="24px">
          <path d="M15.5,5 C15.2239,5 15,5.223846 15,5.5 L15,6.5 C15,6.77615 15.2239,7 15.5,7 L17.5858,7 L14,10.58578 L12.70711,9.29291 L12.35355,8.93933 C12.15829,8.74408 11.84171,8.74408 11.64645,8.93933 L11.29289,9.29291 L5,15.5858 L5,7 L11.5,7 C11.77614,7 12,6.77615 12,6.5 L12,5.5 C12,5.22385 11.77614,5 11.5,5 L5,5 C3.89543,5 3,5.89542 3,7 L3,17 C3,18.1046 3.89543,19 5,19 L19,19 C20.1046,19 21,18.1046 21,17 L21,14.5 C21,14.2238 20.7761,14 20.5,14 L19.5,14 C19.2239,14 19,14.2238 19,14.5 L19,17 L6.4142,17 L12,11.41422 L13.2929,12.70709 L13.6464,13.06067 C13.8417,13.25592 14.1583,13.25592 14.3536,13.06067 L14.7071,12.70709 L19,8.41422 L19,10.5 C19,10.77615 19.2239,11 19.5,11 L20.5,11 C20.7761,11 21,10.77615 21,10.5 L21,6 L21,5.5 C21,5.223846 20.7761,5 20.5,5 L20,5 L15.5,5 Z" />
        </ChartIcon>
        <BookedText>Booked {this.state.timesBooked} times today</BookedText>
      </BookedNTimes>
    );
  }
}

export default Booked;

const BookedNTimes = styled.div`
  margin-top: 16px;
  font-size: 83%;
  font-weight: 500;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChartIcon = styled.svg`
  display: inline-block;
  margin: 0 3px;
`;

const BookedText = styled.div`
  display: inline-block;
  margin: 0 3px;
`;
