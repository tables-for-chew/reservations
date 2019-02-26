let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let moment = require('moment');
let cors = require('cors');

const port = 3003;
const { connection } = require('../database/index.js');
const {
  getBooksOnLoad,
  getOpenTime,
  postTime
} = require('../database/model.js');

let app = express();

app.get('*.js', function(req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use(express.static(__dirname + '/../public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/reserve/load/:id', (req, res) => {
  var { id } = req.params;
  let loadResponse = (err, num) => {
    if (err) {
      console.error(err);
      return;
    } else {
      res.send(num);
    }
  };
  getBooksOnLoad(id, loadResponse);
});

app.get('/api/reserve/query/:id/:date/:time', (req, res) => {
  var { id, date, time } = req.params;

  var max = 5;
  var window = 30;
  var splitTime = time.split(':');
  var dummyTime = moment()
    .hour(splitTime[0])
    .minute(splitTime[1])
    .subtract(max * window, 'minute');
  var testTimes = [dummyTime.format('HH:mm')];
  var times = [];

  // scan from 2.5 hours before queried time to 2.5 hours after
  for (var i = 1; i <= max * 2; i++) {
    var laterTime = dummyTime
      .add(window, 'minute')
      .format('HH:mm')
      .toString();

    testTimes.push(laterTime);
  }

  var numQueries = 0;

  let sendTimes = (err, timeResult) => {
    if (err) {
      console.error(err);
      return;
    } else {
      if (!timeResult[0]) {
        times.push(testTimes[numQueries]);
      }
      var timeDiffs = times.map((timeSlot, index) => {
        var splitTimeSlot = timeSlot.split(':');
        var time1 = moment()
          .hour(splitTimeSlot[0])
          .minute(splitTimeSlot[1]);
        var splitTimeQuery = time.split(':');
        var time2 = moment()
          .hour(splitTimeQuery[0])
          .minute(splitTimeQuery[1]);

        return [Math.abs(time1.diff(time2, 'minute')), index];
      });
      timeDiffs.sort((a, b) => a[0] - b[0]);
      var topFiveTimes = timeDiffs
        .slice(0, 5)
        .sort((a, b) => a[1] - b[1])
        .map(tuple => {
          return times[tuple[1]];
        });
      res.status(200).send(topFiveTimes);
    }
  };

  let nextQuery = (err, time) => {
    if (err) {
      console.error(err);
      return;
    } else {
      if (!time[0]) {
        times.push(testTimes[numQueries]);
      }
      numQueries++;

      if (numQueries < testTimes.length - 1) {
        getOpenTime(id, date, testTimes[numQueries], nextQuery);
      } else {
        getOpenTime(id, date, testTimes[numQueries], sendTimes);
      }
    }
  };

  getOpenTime(id, date, testTimes[numQueries], nextQuery);
});

app.post('/api/reserve/book/:id/:date/:time', (req, res) => {
  var { id, date, time } = req.params;
  let loadResponse = (err, result) => {
    if (err) {
      console.error(err);
      return;
    } else {
      res.status(201).send(result);
    }
  };

  postTime(id, date, time, loadResponse);
});

app.use('/:id', express.static(__dirname + '/../public'));

app.listen(port, err => {
  if (err) {
    console.error('Server error: ', err);
    return;
  } else {
    console.log('Listening at Port', port);
  }
});
