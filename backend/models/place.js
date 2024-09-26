const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    number: { type: Number, required: true },
    status: { type: String, enum: ['avai    lable', 'reserved'], default: 'available' },
    salleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Salle', required: true } 
});

const Place = mongoose.model('Place', placeSchema);
module.exports = Place;
