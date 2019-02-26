import React from 'react';
import moment from 'moment';
// import styled from 'styled-components';
const { styled } = window;

class Date extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthDiff: 0
    };
  }

  changeMonth(event, diff) {
    event.preventDefault();
    if (this.state.monthDiff > 0 || diff > 0) {
      this.setState(
        {
          monthDiff: this.state.monthDiff + diff
        },
        () => {
          let arrow = document.getElementById('left');
          // toggle styling on left arrow if is current month
          if (this.state.monthDiff) {
            arrow.classList.remove('fadeBtn');
            arrow.children[0].style.color = 'black';
          } else {
            arrow.classList.add('fadeBtn');
            arrow.children[0].style.color = '#d8d9db';
          }
        }
      );
    }
  }

  toggleCalendar(event) {
    event.preventDefault();
    if (document.getElementById('dateWrap').style.display !== 'flex') {
      document.getElementById('dateWrap').style.display = 'flex';
    } else {
      document.getElementById('dateWrap').style.display = 'none';
    }
  }

  render() {
    // Determine month/year for calendar header
    var month = moment()
      .add(this.state.monthDiff, 'month')
      .month();
    var year = moment()
      .add(this.state.monthDiff, 'month')
      .year();
    var monthYear =
      moment()
        .month(month)
        .format('MMMM') +
      ' ' +
      year;

    // Determine days and dates on calendar
    var dates = [];
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var firstWeek = moment()
      .add(this.state.monthDiff, 'month')
      .startOf('month')
      .week();
    var lastWeek = firstWeek + 5;

    for (var i = firstWeek; i <= lastWeek; i++) {
      var oneWeek = [];
      for (var j = 0; j <= 6; j++) {
        var day = moment()
          .add(this.state.monthDiff, 'month')
          .week(i)
          .startOf('week')
          .add(j, 'day');
        oneWeek.push(day);
      }
      dates.push(oneWeek);
    }

    // Format default text field for calendar drop down
    var chosenDate = moment(this.props.date, 'YYYY-MM-DD');
    var dateText = chosenDate.format('ddd') + ', ' + chosenDate.format('M/DD');

    const leftArrowStyle = {
      color: '#d8d9db'
    };

    return (
      <DateSection>
        <Title onClick={e => this.toggleCalendar(e)}>Date</Title>
        <CurrentDate onClick={e => this.toggleCalendar(e)}>
          <div>{dateText}</div>
          <i className="fas fa-angle-down" />
        </CurrentDate>
        <DateWrap id="dateWrap">
          <DateDrop>
            <Header>
              <SideArrowWrap>
                <div
                  id="left"
                  className="sideArrow fadeBtn"
                  style={leftArrowStyle}
                  onClick={e => this.changeMonth(e, -1)}
                >
                  <i className="fa fa-angle-left fadeArrow" />
                </div>
              </SideArrowWrap>
              <Month>{monthYear}</Month>
              <SideArrowWrap>
                <SideArrow onClick={e => this.changeMonth(e, 1)}>
                  <i className="fas fa-angle-right" />
                </SideArrow>
              </SideArrowWrap>
            </Header>
            <Days>
              {days.map(day => {
                return <Day key={day}>{day}</Day>;
              })}
            </Days>
            {dates.map(week => {
              return (
                <Row key={week}>
                  {week.map(day => {
                    var classes = 'calendarBox';
                    var onClick = () => {};
                    if (day.month() === month) {
                      classes += ' thisMonth';
                    }
                    if (moment().isSameOrBefore(day, 'day')) {
                      classes += ' future';
                      onClick = e => {
                        this.props.change(e, day.format('YYYY-MM-DD'));
                        this.toggleCalendar(e);
                      };
                    }
                    if (day.format('YYYY-MM-DD') === this.props.date) {
                      classes += ' defaultDate';
                    }
                    return (
                      <div className={classes} key={day} onClick={onClick}>
                        {day.format('D')}
                      </div>
                    );
                  })}
                </Row>
              );
            })}
          </DateDrop>
        </DateWrap>
      </DateSection>
    );
  }
}

export default Date;

const DateSection = styled.div`
  position: relative;
  float: left;
`;

const Title = styled.div`
  width: 140px;
  height: 19px;
  font-size: 85%;
  font-weight: 600;
`;

const CurrentDate = styled.div`
  border: 0px;
  background-color: white;
  width: 140px;
  height: 34px;
  border-bottom: 1px solid #d8d9db;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    cursor: pointer;
    box-shadow: 0 1px 0 #da3743;
  }
`;

const DateWrap = styled.div`
  display: none;
  position: fixed;
  z-index: 99;
`;

const DateDrop = styled.div`
  border-collapse: collapse;
  background-color: #f1f2f4;
  display: inline-block;
  padding: 16px;
  border: 1px solid #d8d9db;
`;

const Header = styled.div`
  height: 34px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SideArrow = styled.div`
  border: 1px solid #d8d9db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SideArrowWrap = styled.div`
  ${SideArrow}: hover {
    border: 2px solid #da3743;
    width: 28px;
    height: 28px;
    cursor: pointer;
  }
`;

const Month = styled.div`
  margin: auto 0;
  padding-top: 7px;
  font-weight: bold;
  font-size: 90%;
`;

const Days = styled.div`
  display: table-row;
`;

const Row = styled.div`
  height: 33px;
  display: table-row;
`;

const Day = styled.div`
  height: 32px;
  display: table-cell;
  table-layout: fixed;
  text-align: center;
  vertical-align: middle;
  width: 34px;
  padding-left: 0.5px;
  font-size: 80%;
`;
