const express = require('express');
const router = express.Router();
const userCtrl = require("../controllers/controllerUser");

router.post('/', userCtrl.createUser);

router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getOneUser);
router.get('/email', userCtrl.getOneUserWithEmail);

router.delete('/', userCtrl.deleteAllUsers);
router.delete('/:id', userCtrl.deleteOneUser);


module.exports = router;