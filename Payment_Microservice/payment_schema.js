const schema_mongoose = require('mongoose');

const PaymentSchema = schema_mongoose.Schema(
    {
       paymentid: {type: Number},
       bookingid: { type: Number},
       amount: { type: Number},
       paymentmethod: {type: String},
       status: { 
        type: String,
        default: "Paid"}
    }, 
    {
       timestamps: true
    }
    );

module.exports = schema_mongoose.model('payment_collection', PaymentSchema);
