const express = require('express');
const router = express.Router();
const TravelCtrl = require("../controllers/controllerTravel");

router.post('/', TravelCtrl.createTravel);

router.get('/:id', TravelCtrl.getOneTravel);
router.get('/', TravelCtrl.getAllTravels);

module.exports = router;