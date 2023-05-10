const Travel = require('../models/modelTravel');

// PARTIE POST 

exports.createTravel = (req, res) => {
    const Travel = new Travel(req.body);
    Travel.save()
        .then((Travel) => {
            return res.status(201).json({ Travel });
        }).catch((error) => {
            return res.status(400).json({ error });
        });
}

// PARTIE GET

exports.getAllTravels = (req, res) => {
    Travel.find()
        .then((Travel) => {
            return res.status(200).json({ Travel });
        }).catch((error) => {
            return res.status(400).json({ error });
        });
};

exports.getOneTravel = (req, res) => {
    const id = req.params.id;
    Travel.findOne({ _id: id })
        .then((Travel) => {
            return res.status(200).json({ Travel });
        }).catch((error) => {
            return res.status(400).json({ error });
        });
};