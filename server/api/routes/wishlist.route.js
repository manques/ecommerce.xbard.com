const express = require('express');
const router = express.Router();
const controller = require('../controllers/wishlist.controller');
const auth = require('../../shared/auth/auth');

router.get('/add-wishlist/:_id',auth, controller.addWishlist);
router.get('/remove-wishlist/:_id', auth, controller.removeWishlist);
router.get('/list', auth, controller.list);

module.exports = router;
