const express = require('express');
const router = express.Router();
const TravelCtrl = require("../controllers/controllerTravel");

router.post('/', TravelCtrl.createTravel);

router.get('/:id', TravelCtrl.getOneTravel);
router.get('/', TravelCtrl.getAllTravels);

router.delete('/:id', TravelCtrl.deleteOneTravel);
router.delete('/', TravelCtrl.deleteAllTravels);

module.exports = router;