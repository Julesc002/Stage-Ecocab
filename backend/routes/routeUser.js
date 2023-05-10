const express = require('express');
const router = express.Router();
const userCtrl = require("../controllers/controllerUser");

router.post('/', userCtrl.createUser);

router.get('/', userCtrl.getOneUser);

router.delete('/:id', userCtrl.deleteOneUser);


module.exports = router;