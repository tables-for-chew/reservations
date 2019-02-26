import React from 'react';
import moment from 'moment';
// import styled from 'styled-components';
const { styled } = window;

class Hour extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleHoursList(event) {
    event.preventDefault();
    if (document.getElementById('hour').style.display !== 'flex') {
      document.getElementById('hour').style.display = 'flex';
    } else {
      document.getElementById('hour').style.display = 'none';
    }
  }

  render() {
    var min = [0, 30];
    var times = [];
    for (var i = 0; i <= 23; i++) {
      for (var j = 0; j <= 1; j++) {
        var time = moment()
          .hour(i)
          .minute(min[j]);
        time = time.format('hh:mm A');
        if (time[0] === '0') {
          time = time.slice(1);
        }
        times.push(time);
      }
    }
    let currentHour = moment(this.props.hour, ['HH:mm']).format('h:mm A');
    return (
      <HourSection>
        <Title>Time</Title>
        <CurrentTime onClick={e => this.toggleHoursList(e)}>
          <div>{currentHour}</div>
          <i className="fas fa-angle-down" />
        </CurrentTime>
        <DropDown id="hour">
          {times.map(time => {
            return (
              <TimeSlot
                key={time}
                onClick={e => {
                  this.props.change(e, time);
                  this.toggleHoursList(e);
                }}
              >
                {time}
              </TimeSlot>
            );
          })}
        </DropDown>
      </HourSection>
    );
  }
}

export default Hour;

const HourSection = styled.div`
  position: relative;
  float: right;
`;

const Title = styled.div`
  width: 140px;
  height: 19px;
  font-size: 85%;
  font-weight: 600;
`;

const CurrentTime = styled.div`
  border: 0px;
  background-color: white;
  width: 140px;
  height: 34px;
  border-bottom: 1px solid #d8d9db;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 85%;
  &:hover {
    cursor: pointer;
    box-shadow: 0 1px 0 #da3743;
  }
`;

const DropDown = styled.div`
  display: none;
  position: absolute;
  z-index: 99;
  width: 140px;
  height: 420px;
  overflow: scroll;
  background-color: white;
  font-size: 88%;
  border: 1px solid #d8d9db;
  flex-direction: column;
  justify-content: space-around;
`;

const TimeSlot = styled.div`
  &:hover {
    background-color: blue;
    color: white;
  }
`;
