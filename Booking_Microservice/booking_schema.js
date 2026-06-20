const schema_mongoose = require('mongoose');

const BookingSchema = schema_mongoose.Schema(
    {
       bookingid: { type: Number},
       userid: {type: Number},
       flightid: { type: Number},
       passengers: {type: Number},
       status: { 
        type: String,
        default: "Booked"}
    }, 
    {
       timestamps: true
    }
    );

module.exports = schema_mongoose.model('booking_collection', BookingSchema);
