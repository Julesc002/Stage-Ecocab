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

exports.getAllTravels = (req, res) => {
    Travel.find()
        .then((travel) => {
            return res.status(200).json({ travel });
        }).catch((error) => {
            return res.status(400).json({ error });
        });
}

exports.getNearestTravels = (req, res) => {
    const travelSearched = req.query;

    const heureDepart = new Date(travelSearched.heureDepart);
    heureDepart.setHours(0, 0, 0, 0);

    const heureMaxDepart = new Date(travelSearched.heureDepart);
    heureMaxDepart.setHours(23, 59, 59, 999);

    if (travelSearched.whereIsAirport === 'start') {
        Travel.find({
            heureDepart: { $gte: heureDepart, $lte: heureMaxDepart },
            lieuDepart: travelSearched.lieuDepart
        })
            .then((travels) => {
                const promises = travels.map((travel) => {
                    return Travel.find({
                        _id: travel._id,
                        nombreDePassagers: { $gte: parseInt(travelSearched.nbPersonnes) + travel.idVoyageurs.length + 1 }
                    });
                });

                return Promise.all(promises);
            })
            .then((results) => {
                const filteredTravels = results.flat();
                return res.status(200).json({ travels: filteredTravels });
            })
            .catch((error) => {
                return res.status(400).json({ error });
            });
    } else {
        Travel.find({
            heureDepart: { $gte: heureDepart, $lte: heureMaxDepart },
            lieuArrivee: travelSearched.lieuArrivee
        })
            .then((travels) => {
                const promises = travels.map((travel) => {
                    return Travel.find({
                        _id: travel._id,
                        nombreDePassagers: { $gte: parseInt(travelSearched.nbPersonnes) + travel.idVoyageurs.length + 1 }
                    });
                });

                return Promise.all(promises);
            })
            .then((results) => {
                const filteredTravels = results.flat();
                return res.status(200).json({ travels: filteredTravels });
            })
            .catch((error) => {
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
    Travel.find({ $or: [{ idCompte: id }, { idVoyageurs: id }, { idVoyageursInscrits: id }] })
        .then((travels) => {
            return res.status(200).json({ travels });
        })
        .catch((error) => {
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

exports.addOneUserConfirm = (req, res) => {
    const idTravel = req.params.idTravel;
    const idUser = req.params.idUser;
    Travel.findOneAndUpdate({ _id: idTravel }, { $push: { idVoyageursInscrits: idUser } }, { new: true })
        .then((travel) => {
            return res.status(200).json({ travel });
        }).catch((error) => {
            return res.status(400).json({ error });
        });
};

exports.removeOneUser = (req, res) => {
    const idTravel = req.params.idTravel;
    const idUser = req.params.idUser;
    Travel.findOneAndUpdate(
        { _id: idTravel },
        { 
            $pull: { idVoyageurs: idUser }
        },
        { new: true }
    )
        .then((travel) => {
            return res.status(200).json({ travel });
        })
        .catch((error) => {
            return res.status(400).json({ error });
        });
};


exports.removeOneUserConfirmed = (req, res) => {
    const idTravel = req.params.idTravel;
    const idUser = req.params.idUser;
    Travel.findOneAndUpdate(
        { _id: idTravel },
        { 
            $pull: { idVoyageursInscrits: idUser }
        },
        { new: true }
    )
        .then((travel) => {
            return res.status(200).json({ travel });
        })
        .catch((error) => {
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
