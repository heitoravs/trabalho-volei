const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController'); 
const authController = require('../controllers/authController'); 

router.get('/cadastro-jogador', authController.verificarAutenticacao, playerController.mostrarFormularioCadastroJogador);

router.post('/cadastro-jogador', authController.verificarAutenticacao, playerController.registrarJogador);

module.exports = router;
