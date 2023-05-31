const express = require('express');
const router = express.Router();
const TravelCtrl = require("../controllers/controllerTravel");

router.post('/', TravelCtrl.createTravel);

router.get('/:id', TravelCtrl.getOneTravel);
router.get('/', TravelCtrl.getNearestTravels);
router.get('/user/:id', TravelCtrl.getAllTravelsById);

router.put('/:idTravel/user/:idUser', TravelCtrl.addOneUser);

router.delete('/:id', TravelCtrl.deleteOneTravel);
router.delete('/', TravelCtrl.deleteAllTravels);

module.exports = router;