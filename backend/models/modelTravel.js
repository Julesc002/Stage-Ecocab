const mongoose = require('mongoose');

const travel = mongoose.Schema({
    heureDepart: Date,
    heureArrivee: Date,
    lieuDepart: String,
    lieuArrivee: String,
    nombreDePassagers: Number,
    numeroDeVol: String,
    tailleBagage: String,
    idCompte: String,
    idVoyageurs: [String],
    idVoyageursInscrits: [String],
    coordinates : [Number]
})

module.exports = mongoose.model('Travel', travel);