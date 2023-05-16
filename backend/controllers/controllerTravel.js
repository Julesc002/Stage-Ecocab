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
        .then((travels) => {
            return res.status(200).json({ travels });
        }).catch((error) => {
            return res.status(400).json({ error });
        });
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