const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const authController = require('../controllers/authController'); 

router.get('/cadastro-equipe', authController.verificarAutenticacao, teamController.mostrarFormularioCadastroEquipe);

router.post('/cadastro-equipe', authController.verificarAutenticacao, teamController.registrarEquipe);

module.exports = router;
