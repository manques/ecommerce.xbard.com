const express = require('express');
const router = express.Router();
const auth = require('../../shared/auth/auth');
const controller = require('../controllers/address.controller');

router.post('/add-address', auth, controller.addAddress);
router.get('/address-list', auth, controller.addressList);
router.put('/address-update', auth, controller.addressUpdate);
router.get('/cartItemsAndSellerPickupLocations', auth, controller.cartItemsAndSellerPickupLocations);

module.exports = router;
