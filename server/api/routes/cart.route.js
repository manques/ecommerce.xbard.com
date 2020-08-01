const express = require('express');
const router = express.Router();
const auth = require('../../shared/auth/auth');
const controller = require('../controllers/cart.controller');

router.post('/add-item', auth, controller.addItem);
router.get('/remove-item/:_id' ,auth , controller.removeItem);
router.post('/change-quantity', auth, controller.changeQuantity);

module.exports = router;
