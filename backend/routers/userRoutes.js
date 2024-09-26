const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController'); 
const auth = require('../middlewares/auth');

router.get('/admin/all',auth, UserController.getAllAdmin);
router.get('/admin/:id',auth, UserController.getAdminById);
router.post('/admin/create',auth, UserController.create);
router.put('/admin/:id',auth, UserController.update);
router.delete('/admin/:id',auth, UserController.delete);

router.post('/register', UserController.register);
router.post('/login', UserController.login);


module.exports = router;
