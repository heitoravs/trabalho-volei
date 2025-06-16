const dataStore = require('../models/dataStore');

const teamController = {
    mostrarFormularioCadastroEquipe: (req, res) => {
        res.render('cadastroEquipe', { message: null, equipes: dataStore.obterEquipes() });
    },

    registrarEquipe: (req, res) => {
        const { nomeEquipe, nomeTecnico, telefoneTecnico } = req.body;

        if (!nomeEquipe || !nomeTecnico || !telefoneTecnico) {
            return res.render('cadastroEquipe', {
                message: 'Todos os campos são obrigatórios. Por favor, preencha-os.',
                equipes: dataStore.obterEquipes()
            });
        }

        if (!/^\d{10,11}$/.test(telefoneTecnico)) {
            return res.render('cadastroEquipe', {
                message: 'Telefone inválido. Utilize apenas números (10 ou 11 dígitos).',
                equipes: dataStore.obterEquipes()
            });
        }

        const novaEquipe = {
            nomeEquipe,
            nomeTecnico,
            telefoneTecnico
        };

        dataStore.adicionarEquipe(novaEquipe);

        res.render('cadastroEquipe', {
            message: 'Equipe cadastrada com sucesso!',
            equipes: dataStore.obterEquipes()
        });
    }
};

module.exports = teamController; 