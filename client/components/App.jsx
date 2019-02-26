import React from 'react';
import moment from 'moment';
// import styled from 'styled-components';
import Date from './Date.jsx';
import Hour from './Hour.jsx';
import Booked from './Booked.jsx';
import Reserve from './Reserve.jsx';
import Party from './Party.jsx';
const { styled } = window;

class App extends React.Component {
  constructor(props) {
    super(props);

    let id;
    let paths = window.location.pathname.split('/');
    let path = Number(paths[1]);
    if (path > 0) {
      id = path;
    } else {
      id = 1;
    }

    this.state = {
      restaurantId: id,
      date: moment().format('YYYY-MM-DD'),
      time: '19:00',
      partySize: 2,
      buttonShown: true
    };

    this.changeDate = this.changeDate.bind(this);
    this.changeParty = this.changeParty.bind(this);
  }

  changeDate(event, date) {
    event.preventDefault();
    if (moment().isSameOrBefore(date, 'day')) {
      this.setState(
        {
          date: date
        },
        () => {
          console.log('save the date!', this.state.date);
        }
      );
    }
  }

  changeTime(event, time) {
    event.preventDefault();
    var timeTwentyFour = moment(time, ['h:mm A']).format('HH:mm');
    this.setState({
      time: timeTwentyFour,
      buttonShown: true
    });
  }

  changeParty(event, party) {
    event.preventDefault();
    this.setState({
      partySize: party
    });
  }

  toggleButton() {
    this.setState({
      buttonShown: !this.state.buttonShown
    });
  }

  render() {
    return (
      <Reservation>
        <Title>Make a reservation</Title>

        <Party size={this.state.partySize} change={this.changeParty} />

        <DateTime>
          <Date change={this.changeDate} date={this.state.date} />
          <div id="time">
            <Hour hour={this.state.time} change={this.changeTime.bind(this)} />
          </div>
        </DateTime>

        <Reserve
          btn={this.state.buttonShown}
          restId={this.state.restaurantId}
          date={this.state.date}
          time={this.state.time}
          toggleBtn={this.toggleButton.bind(this)}
        />

        <Booked rest={this.state.restaurantId} />
      </Reservation>
    );
  }
}

export default App;

const Reservation = styled.div`
  width: 300px;
  padding: 0px 15px;
  padding-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-wrap: wrap;
  align-content: center;
  box-shadow: 1px 2px 8px rgba(153, 153, 153, 0.4);
  border-radius: 1%;
  font-family: 'Mukta Mahee', sans-serif;
  background-color: white;
`;

const Title = styled.h3`
  padding: 0px;
  margin: 0px;
  padding: 13px 0px;
  margin-bottom: 16px;
  text-align: center;
  border-bottom: 1px solid #d8d9db;
`;

const DateTime = styled.div`
  height: 65px;
`;
