const schema_mongoose = require('mongoose');

const FlightSchema = schema_mongoose.Schema(
    {
       flightid: {type: Number}, 
       flightno: {type: String},
       airline: { type: String},
       source: { type: String},
       destination: {type: String},
       price: { type: Number},
       seats: {type: Number}
    }, 
    {
       timestamps: true
    }
    );

module.exports = schema_mongoose.model('flight_collection', FlightSchema);
