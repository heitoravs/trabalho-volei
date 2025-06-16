const dataStore = require('../models/dataStore');

const authController = {
    autenticarUsuario: (req, res) => {
        const { usuario, senha } = req.body;

        const usuarioEncontrado = dataStore.encontrarUsuario(usuario, senha);

        if (usuarioEncontrado) {
            req.session.isAuthenticated = true;
            req.session.username = usuarioEncontrado.usuario;

            res.cookie('ultimoAcesso', new Date().toISOString(), { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 }); // 

            res.redirect('/menu');
        } else {
            res.render('login', { message: 'Usuário ou senha inválidos.' });
        }
    },

    deslogarUsuario: (req, res) => {
        req.session.destroy(erro => {
            if (erro) {
                console.error('Erro ao destruir a sessão:', erro);
                return res.redirect('/menu');
            }
            res.clearCookie('connect.sid');
            res.clearCookie('ultimoAcesso');
            res.redirect('/');
        });
    },

    verificarAutenticacao: (req, res, next) => {
        if (req.session.isAuthenticated) {
            return next();
        }
        res.redirect('/');
    }
};

module.exports = authController;
