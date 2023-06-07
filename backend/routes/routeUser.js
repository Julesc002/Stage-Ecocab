const express = require('express');
const router = express.Router();
const userCtrl = require("../controllers/controllerUser");

router.post('/', userCtrl.createUser);
router.post('/:id/travels/created', userCtrl.addTravelToCreated);
router.post('/:id/travels/registered', userCtrl.addTravelToRegistered);

router.get('/', userCtrl.getAllUsers);
router.get('/id/:id', userCtrl.getOneUser);
router.get('/email', userCtrl.getOneUserWithEmail);

// router.delete('/', userCtrl.deleteAllUsers);
router.delete('/:id', userCtrl.deleteOneUser);
router.delete('/:id/travels/registered/:travelId', userCtrl.deleteOneTravelFromRegistered);

router.put('/:id', userCtrl.updateOneUser);

module.exports = router;