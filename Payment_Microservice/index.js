const express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

const dbconnect = require('./dbconnect.js');
const PaymentModel = require('./payment_schema.js');

function uniqueid(min, max) {
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}

// MAKE PAYMENT
app.post('/pay', (req, res) => {
  const payment = new PaymentModel({
    paymentid: uniqueid(1000, 9999),
    bookingid: req.body.bookingid,
    amount: req.body.amount,
    paymentmethod: req.body.paymentmethod,

    status: "Paid"
  });
  payment.save()
    .then(() => {
      res.status(200).send(
        "PAYMENT SUCCESSFUL"
      );
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// VIEW PAYMENTS
app.get('/viewpayment', (req, res) => {
  PaymentModel.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.listen(5003, () => {
  console.log("PAYMENT SERVICE RUNNING ON PORT 5003");
});