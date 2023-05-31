const Travel = require('../models/modelTravel');

// PARTIE POST 

exports.createTravel = (req, res) => {
    const newTravel = new Travel(req.body);
    newTravel.save()
        .then((travel) => {
            return res.status(201).json({ travel });
        }).catch((error) => {
            return res.status(400).json({ error });
        });
}

// PARTIE GET

exports.getNearestTravels = (req, res) => {
    const travelSearched = req.query;

    const heureDepart = new Date(travelSearched.heureDepart); // Convertir la date de recherche en objet Date
    heureDepart.setHours(0, 0, 0, 0); // Réinitialiser les heures, minutes, secondes et millisecondes à zéro

    const heureMaxDepart = new Date(travelSearched.heureDepart); // Convertir la date de recherche en objet Date
    heureMaxDepart.setHours(23, 59, 59, 999); // Définir l'heure maximale à 23h59:59.999

    if (travelSearched.whereIsAirport === 'start') {
        Travel.find({ heureDepart: { $gte: heureDepart, $lte: heureMaxDepart }, lieuDepart: travelSearched.lieuDepart })
            .then((travels) => {
                return res.status(200).json({ travels });
            }).catch((error) => {
                return res.status(400).json({ error });
            });
    } else {
        Travel.find({ heureDepart: { $gte: heureDepart, $lte: heureMaxDepart }, lieuArrivee: travelSearched.lieuArrivee })
            .then((travels) => {
                return res.status(200).json({ travels });
            }).catch((error) => {
                return res.status(400).json({ error });
            });
    }
};

exports.getOneTravel = (req, res) => {
    const id = req.params.id;
    Travel.findOne({ _id: id })
        .then((travel) => {
            return res.status(200).json({ travel });
        }).catch((error) => {
            return res.status(400).json({ error });
        });
};

exports.getAllTravelsById = (req, res) => {
    const id = req.params.id;
    Travel.find({ $or: [{ idCompte: id }, { idVoyageurs: id }] })
        .then((travels) => {
            return res.status(200).json({ travels });
        }).catch((error) => {
            return res.status(400).json({ error });
        });
};


// PARTIE PUT

exports.addOneUser = (req, res) => {
    const idTravel = req.params.idTravel;
    const idUser = req.params.idUser;
    Travel.findOneAndUpdate({ _id: idTravel }, { $push: { idVoyageurs: idUser } }, { new: true })
        .then((travel) => {
            return res.status(200).json({ travel });
        }).catch((error) => {
            return res.status(400).json({ error });
        });
};

// PARTIE DELETE

exports.deleteOneTravel = (req, res) => {
    const id = req.params.id;
    Travel.findOneAndDelete({ _id: id })
        .then((travel) => {
            return res.status(200).json({ travel });
        }).catch((error) => {
            return res.status(400).json({ error });
        });
};

exports.deleteAllTravels = (req, res) => {
    Travel.deleteMany({})
        .then(() => {
            return res.status(200).json({ message: 'All travels have been deleted successfully.' });
        })
        .catch((error) => {
            return res.status(400).json({ error });
        });
};
