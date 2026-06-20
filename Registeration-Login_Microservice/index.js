const express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

const dbconnect = require('./dbconnect.js');
const PersonModel = require('./person_schema.js');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;


/*
In the postman use the following URL
localhost:5000/reg

{
  "firstname":"Jonh",
  "email":"jonh@gmail.com",
  "password":"abc",
  "mobile": 12345678,
  "role": "customer"
}

*/

function uniqueid(min, max) {
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}

//REG API
app.post('/reg', (req, res) => {
  console.log("REG API EXECUTED")
  const pobj = new PersonModel({
    id: uniqueid(1000, 9999),
    name: req.body.firstname,
    emailid: req.body.email,
    pass: req.body.password,
    mobile: req.body.mobile,
    role: req.body.role
  });//CLOSE PersonModel
  
  //INSERT/SAVE THE RECORD/DOCUMENT
  pobj.save()
    .then(inserteddocument => {
      res.status(200).send('DOCUMENT INSERED IN MONGODB DATABASE');
    })//CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Employee Save ' })
    });//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY
);//CLOSE POST METHOD

/*
LOGIN API

POST localhost:5000/login

{
  "email":"john@gmail.com",
  "password":"abc",
  "role":"customer"
}
*/

// LOGIN API
app.post('/login', (req, res) => {
  console.log("LOGIN API EXECUTED");
  PersonModel.find({
    emailid: req.body.email,
    pass: req.body.password,
    role: req.body.role

  })

  .then(getsearchdocument => {
    if (getsearchdocument.length > 0) {
      const token = jwt.sign(
        {
          email: req.body.email,
          role: req.body.role
        },
        JWT_SECRET,
        {
          expiresIn: '24h'
        }
      );
      res.json({
        token
      });
    }
    else {
      res.status(400).send(
        "INVALID USER"
      );

    }

  })

  .catch(err => {

    res.status(500).send({
      message: err.message
    });

  });

});

//VIEW USER API

app.get('/viewuser', (req, res) => {
  PersonModel.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(err);
    });

});
// START THE EXPRESS SERVER. 5000 is the PORT NUMBER
app.listen(5000, () => console.log('EXPRESS Server Started at Port No: 5000'));
