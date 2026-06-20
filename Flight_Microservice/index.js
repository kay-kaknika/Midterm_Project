const express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

const dbconnect = require('./dbconnect.js');
const FlightModel = require('./flight_schema.js');

function uniqueid(min, max) {
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}

// ADD FLIGHT
app.post('/add', (req, res) => {
  const flight = new FlightModel({

    flightid: uniqueid(1000, 9999),

    flightno: req.body.flightno,
    airline: req.body.airline,
    source: req.body.source,
    destination: req.body.destination,
    price: req.body.price,
    seats: req.body.seats

  });

  flight.save()
    .then(() => {
      res.status(200).send("FLIGHT ADDED");
    })
    .catch(err => {
      res.status(500).send(err);
    });

});

// VIEW ALL FLIGHTS
app.get('/viewflights', (req, res) => {
  FlightModel.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(err);
    });

});

// SEARCH FLIGHT
app.get('/search/:source/:destination', (req, res) => {

  FlightModel.find({
    source: req.params.source,
    destination: req.params.destination
  })

    .then(data => {
      res.send(data);
    })

    .catch(err => {
      res.status(500).send(err);
    });

});

// UPDATE FLIGHT

app.put('/update/:flightid', (req, res) => {
    FlightModel.updateOne(
        {
            flightid: req.params.flightid
        },
        {
            $set: {

                flightno: req.body.flightno,
                airline: req.body.airline,
                source: req.body.source,
                destination: req.body.destination,
                price: req.body.price,
                seats: req.body.seats
            }
        }
    )
    .then(() => {
        res.status(200).send(
            "FLIGHT UPDATED SUCCESSFULLY"
        );
    })
    .catch(err => {
        res.status(500).send(err);
    });
});

app.listen(5001, () => {
  console.log("FLIGHT SERVICE RUNNING ON PORT 5001");
});