import React from 'react';
import $ from 'jquery';
import moment from 'moment';
// import styled from 'styled-components';
const { styled } = window;

class Reserve extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      times: [],
      error: false
    };

    this.findTimes = this.findTimes.bind(this);
  }

  findTimes(event) {
    event.preventDefault();

    $.ajax({
      url: `/api/reserve/query/${this.props.restId}/${this.props.date}/${
        this.props.time
      }`,
      method: 'GET',
      data: {},
      success: times => {
        console.log('We have seats at these times!', times);
        var timeAmPm = times.map(time =>
          moment(time, ['HH:mm']).format('h:mm A')
        );
        this.setState(
          {
            times: timeAmPm
          },
          () => {
            this.props.toggleBtn();
          }
        );
      },
      error: err => {
        console.log('Error getting times: ', err);
      }
    });
  }

  bookTime(time) {
    var timeTwentyFour = moment(time, ['h:mm A']).format('HH:mm');
    $.ajax({
      url: `/api/reserve/book/${this.props.restId}/${
        this.props.date
      }/${timeTwentyFour}`,
      method: 'POST',
      data: { time: time },
      success: res => {
        this.props.toggleBtn();
      },
      error: err => {
        console.error(err);
      }
    });
  }

  render() {
    var times = this.state.times;
    var timeTwentyFour = moment(this.props.time, ['HH:mm']).format('h:mm A');

    if (this.props.btn) {
      return (
        <ReserveDiv>
          <FindWrap>
            <Find onClick={e => this.findTimes(e)}>Find a Table</Find>
          </FindWrap>
        </ReserveDiv>
      );
    } else {
      if (this.state.error) {
        return (
          <ReserveDiv>
            Unfortunately, this restaurant can't accept that reservation. Have
            another time in mind?
          </ReserveDiv>
        );
      } else if (times.length > 0) {
        var count =
          times.length < 5 ? (
            <div id="count">
              You're in luck! We still have {times.length} timeslots left
            </div>
          ) : (
            ''
          );
        return (
          <ReserveDiv>
            {times.map(time => {
              return (
                <TimeSlot key={time} onClick={() => this.bookTime(time)}>
                  {time}
                </TimeSlot>
              );
            })}
            <div id="count">{count}</div>
          </ReserveDiv>
        );
      } else {
        return (
          <ReserveDiv>
            At the moment, there's no online availability within 2.5 hours of{' '}
            {timeTwentyFour}. Have another time in mind?
          </ReserveDiv>
        );
      }
    }
  }
}

export default Reserve;

const ReserveDiv = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const Find = styled.button`
  background-color: #da3743;
  color: white;
  font-size: 105%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  width: 300px;
  height: 47px;
  border: 0px;
  border-radius: 2%;
`;

const FindWrap = styled.div`
  ${Find}: hover {
    cursor: pointer;
    background-color: #e45962;
  }
`;

const TimeSlot = styled.div`
  color: white;
  background-color: #da3743;
  border-radius: 5%;
  width: 80px;
  height: 40px;
  margin: 8px;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  &:hover {
    cursor: pointer;
    background-color: #e45962;
  }
`;
