const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller');

router.post('/', userController.createUser);
router.post('/find', userController.update);
router.put('/updatemark/:id', userController.updatemark);
router.post('/findmark', userController.findmark);




module.exports = router;
