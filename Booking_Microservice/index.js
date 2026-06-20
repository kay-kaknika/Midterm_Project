const express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

const dbconnect = require('./dbconnect.js');
const BookingModel = require('./booking_schema.js');

function uniqueid(min, max) {
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}

// CREATE BOOKING
app.post('/createbooking', (req, res) => {
  const booking = new BookingModel({

    bookingid: uniqueid(1000, 9999),

    userid: req.body.userid,
    flightid: req.body.flightid,
    passengers: req.body.passengers,

    status: "Booked"

  });
  booking.save()
    .then(() => {
      res.status(200).send(
        "BOOKING CREATED"
      );
    })

    .catch(err => {
      res.status(500).send(err);
    });
});

// VIEW BOOKINGS
app.get('/viewbooking', (req, res) => {
  BookingModel.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// CANCEL BOOKING
app.delete('/cancel/:bookingid', (req, res) => {
  BookingModel.deleteOne({
    bookingid:
    req.params.bookingid
  })
  .then(() => {
    res.send(
      "BOOKING CANCELLED"
    );
  })
  .catch(err => {
    res.status(500).send(err);
  });
});

app.listen(5002, () => {
  console.log("BOOKING SERVICE RUNNING ON PORT 5002");
});