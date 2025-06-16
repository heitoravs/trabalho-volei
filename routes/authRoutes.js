const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); 

router.post('/login', authController.autenticarUsuario);

router.get('/logout', authController.deslogarUsuario);

module.exports = router;
