const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const upload = require('../../shared/multer/multerProduct');
const auth = require( '../../shared/auth/auth');

// add product
router.post('/add-product',
                          auth,
                          upload.fields([
                                          { name: 'main', maxCount: 1 },
                                          { name: 'gallery', matCount: 2 }
                                      ]),
                          productController.addProduct);

// get seller products
router.get('/seller/product-list', auth, productController.sellerProductList);
// get product
router.get('/product/:_id', productController.product);
// related products
router.get('/relatedProducts', productController.relatedProducts);
// get products
router.get('/products', productController.products);
// wishlist
module.exports = router;
