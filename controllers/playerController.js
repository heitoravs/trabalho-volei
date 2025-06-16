const dataStore = require('../models/dataStore');

const playerController = {
    mostrarFormularioCadastroJogador: (req, res) => {
        const equipesDisponiveis = dataStore.obterEquipes();
        const jogadoresAgrupadosPorEquipe = dataStore.obterJogadoresAgrupadosPorEquipe();

        res.render('cadastroJogador', {
            message: null,
            equipes: equipesDisponiveis,
            jogadoresAgrupadosPorEquipe: jogadoresAgrupadosPorEquipe
        });
    },

    registrarJogador: (req, res) => {
        const { nomeJogador, numeroCamisa, dataNascimento, alturaCm, genero, posicao, idEquipe } = req.body;

        if (!nomeJogador || !numeroCamisa || !dataNascimento || !alturaCm || !genero || !posicao || !idEquipe) {
            const equipesDisponiveis = dataStore.obterEquipes();
            const jogadoresAgrupadosPorEquipe = dataStore.obterJogadoresAgrupadosPorEquipe();
            return res.render('cadastroJogador', {
                message: 'Todos os campos são obrigatórios. Por favor, preencha-os.',
                equipes: equipesDisponiveis,
                jogadoresAgrupadosPorEquipe: jogadoresAgrupadosPorEquipe
            });
        }

        const numeroCamisaFormatado = parseInt(numeroCamisa, 10);
        if (isNaN(numeroCamisaFormatado) || numeroCamisaFormatado <= 0) {
            const equipesDisponiveis = dataStore.obterEquipes();
            const jogadoresAgrupadosPorEquipe = dataStore.obterJogadoresAgrupadosPorEquipe();
            return res.render('cadastroJogador', {
                message: 'Número da camisa inválido. Deve ser um número inteiro positivo.',
                equipes: equipesDisponiveis,
                jogadoresAgrupadosPorEquipe: jogadoresAgrupadosPorEquipe
            });
        }

        const alturaFormatada = parseFloat(alturaCm);
        if (isNaN(alturaFormatada) || alturaFormatada <= 0) {
            const equipesDisponiveis = dataStore.obterEquipes();
            const jogadoresAgrupadosPorEquipe = dataStore.obterJogadoresAgrupadosPorEquipe();
            return res.render('cadastroJogador', {
                message: 'Altura inválida. Deve ser um número positivo em centímetros.',
                equipes: equipesDisponiveis,
                jogadoresAgrupadosPorEquipe: jogadoresAgrupadosPorEquipe
            });
        }

        if (isNaN(new Date(dataNascimento).getTime())) {
            const equipesDisponiveis = dataStore.obterEquipes();
            const jogadoresAgrupadosPorEquipe = dataStore.obterJogadoresAgrupadosPorEquipe();
            return res.render('cadastroJogador', {
                message: 'Data de nascimento inválida.',
                equipes: equipesDisponiveis,
                jogadoresAgrupadosPorEquipe: jogadoresAgrupadosPorEquipe
            });
        }

        const equipeSelecionada = dataStore.obterEquipePorId(idEquipe);
        if (!equipeSelecionada) {
            const equipesDisponiveis = dataStore.obterEquipes();
            const jogadoresAgrupadosPorEquipe = dataStore.obterJogadoresAgrupadosPorEquipe();
            return res.render('cadastroJogador', {
                message: 'Equipe selecionada inválida.',
                equipes: equipesDisponiveis,
                jogadoresAgrupadosPorEquipe: jogadoresAgrupadosPorEquipe
            });
        }

        const novoJogador = {
            nomeJogador,
            numeroCamisa: numeroCamisaFormatado,
            dataNascimento,
            alturaCm: alturaFormatada,
            genero,
            posicao,
            idEquipe: parseInt(idEquipe, 10)
        };

        dataStore.adicionarJogador(novoJogador);

        const equipesDisponiveis = dataStore.obterEquipes();
        const jogadoresAgrupadosPorEquipe = dataStore.obterJogadoresAgrupadosPorEquipe();
        res.render('cadastroJogador', {
            message: 'Jogador cadastrado com sucesso!',
            equipes: equipesDisponiveis,
            jogadoresAgrupadosPorEquipe: jogadoresAgrupadosPorEquipe
        });
    }
};

module.exports = playerController;
