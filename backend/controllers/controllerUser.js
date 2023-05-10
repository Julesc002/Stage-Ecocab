const User = require('../models/modelUser');

// Partie POST

// Pas terminé, attention ne pas stocker les mots de passe en brut
exports.createUser = (req, res) => {
    const newUser = new User(req.body);
    newUser.save()
        .then((user) => {
            return res.status(201).json({ user });
        }).catch((error) => {
            return res.status(400).json({ error });
        });
}

// Partie GET

// Pas terminé, attention ne pas stocker les mots de passe en brut
exports.getOneUserWithEmailAndPassword = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.find({ email: email, password: password })
        .then((user) => {
            return res.status(200).json({ user });
        }).catch((error) => {
            return res.status(400).json({ error });
        });
}

// Partie DELETE

exports.deleteOneUser = (req, res) => {
    const id = req.params.id;
    User.findOneAndDelete({ _id: id })
        .then((user) => {
            return res.status(200).json({ user });
        }).catch((error) => {
            return res.status(400).json({ error });
        });
}