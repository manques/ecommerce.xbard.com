const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../../shared/auth/auth');
const multerUser = require('../../shared/multer/multerUser');

// // create user
router.post('/create', userController.create);
router.post('/login', userController.login);
router.get('/profile', auth, userController.profile);
router.post('/refresh', userController.refresh);
router.put('/isSeller', auth, userController.isSeller);
router.put('/bgImage',auth, multerUser.upload.single('bgImage'), userController.bgImage);
router.put('/picture', auth, multerUser.upload.single('picture'), userController.picture);
router.put('/changePassword', auth, userController.changePassword);
router.put('/updateProfile', auth, userController.updateProfile);
router.get('/confirmation', userController.confirmation);
router.get('/resendEmailVerification', userController.resendEmailVerification);

module.exports = router;
