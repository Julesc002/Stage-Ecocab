const User = require('../models/modelUser');

// Partie POST

// Pas terminé, attention ne pas stocker les mots de passe en brut
exports.createUser = (req, res) => {
    const { email } = req.body;

    // Vérifier si l'utilisateur existe déjà
    User.findOne({ email: email })
        .then((existingUser) => {
            if (existingUser) {
                // Utilisateur existant trouvé, renvoyer un code d'erreur
                return res.status(409).json({ error: "Cet utilisateur existe déjà." });
            }
            // L'utilisateur n'existe pas encore, procéder à la création
            const newUser = new User(req.body);
            newUser.save()
                .then((user) => {
                    return res.status(201).json({ user });
                })
                .catch((error) => {
                    return res.status(400).json({ error });
                });
        })
        .catch((error) => {
            return res.status(400).json({ error });
        });
}

exports.addTravelToCreated = (req, res) => {
    const userId = req.params.id;
    const travelId = req.body.travelId;

    User.findOneAndUpdate(
        { _id: userId },
        { $push: { travelsCreated: travelId } },
        { new: true }
    )
        .then((user) => {
            return res.status(200).json({ user });
        })
        .catch((error) => {
            return res.status(400).json({ error });
        });
};

exports.addTravelToRegistered = (req, res) => {
    const userId = req.params.id;
    const travelId = req.body.travelId;

    User.findOneAndUpdate(
        { _id: userId },
        { $push: { travelsRegistered: travelId } },
        { new: true }
    )
        .then((user) => {
            return res.status(200).json({ user });
        })
        .catch((error) => {
            return res.status(400).json({ error });
        });
};


// Partie GET

exports.getAllUsers = (req, res) => {
    User.find()
        .then((user) => {
            return res.status(200).json({ user });
        }).catch((error) => {
            return res.status(400).json({ error });
        });
}

exports.getOneUser = (req, res) => {
    const id = req.params.id;
    User.findOne({ _id: id })
        .then((user) => {
            return res.status(200).json({ user });
        }).catch((error) => {
            return res.status(400).json({ error });
        });
};

exports.getOneUserWithEmail = (req, res) => {
    const email = req.query.email;
    User.findOne({ email: email })
        .then((user) => {
            return res.status(200).json({ user });
        }).catch((error) => {
            return res.status(400).json({ error });
        });
}

// Partie DELETE

// exports.deleteAllUsers = (req, res) => {
//     User.deleteMany({})
//         .then(() => {
//             return res.status(200).json({ message: 'All users have been deleted successfully.' });
//         })
//         .catch((error) => {
//             return res.status(400).json({ error });
//         });
// }

exports.deleteOneUser = (req, res) => {
    const id = req.params.id;
    User.findOneAndDelete({ _id: id })
        .then((user) => {
            return res.status(200).json({ user });
        }).catch((error) => {
            return res.status(400).json({ error });
        });
}

exports.deleteOneTravelFromRegistered = (req, res) => {
    const userId = req.params.id;
    const travelId = req.params.travelId;

    User.findOneAndUpdate(
        { _id: userId },
        { $pull: { travelsRegistered: travelId } },
        { new: true }
    )
        .then((user) => {
            return res.status(200).json({ user });
        })
        .catch((error) => {
            return res.status(400).json({ error });
        });
};

// Partie PUT

exports.updateOneUser = (req, res) => {
    const id = req.params.id;
    const body = req.body;
    User.findOneAndUpdate({ _id: id }, body, { new: true })
        .then((user) => {
            return res.status(200).json({ user });
        })
        .catch((error) => {
            return res.status(400).json({ error })
        })
}