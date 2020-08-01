const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const auth = require('../../shared/auth/auth');

// ------ add category ------
router.post('/add-category',auth, categoryController.add);
router.get('/category-list', categoryController.list);
router.get('/breadcrumb/:_id', categoryController.breadcrumb);


module.exports = router;
