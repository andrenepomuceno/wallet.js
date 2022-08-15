const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
        default: "BRL",
    },
    taxes: {
        type: Number,
        required: true,
        default: 0,
    },
    info: {
        type: String,
        required: false,
    },
});

module.exports = Event = mongoose.model('event', EventSchema);