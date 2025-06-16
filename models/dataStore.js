let equipes = [];
let jogadores = [];
let usuarios = [
    { usuario: 'admin', senha: 'admin' }
];

let proximoIdEquipe = 1;
let proximoIdJogador = 1;

module.exports = {
    obterEquipes: () => equipes,
    adicionarEquipe: (equipe) => {
        equipe.id = proximoIdEquipe++;
        equipes.push(equipe);
        return equipe;
    },
    obterEquipePorId: (id) => equipes.find(equipe => equipe.id == id),
    obterJogadores: () => jogadores,
    adicionarJogador: (jogador) => {
        jogador.id = proximoIdJogador++;
        jogadores.push(jogador);
        return jogador;
    },
    obterJogadoresAgrupadosPorEquipe: () => {
        const jogadoresAgrupados = {};
        jogadores.forEach(jogador => {
            const equipe = equipes.find(e => e.id == jogador.idEquipe);
            const nomeEquipe = equipe ? equipe.nomeEquipe : 'Equipe Desconhecida';
            if (!jogadoresAgrupados[nomeEquipe]) {
                jogadoresAgrupados[nomeEquipe] = [];
            }
            jogadoresAgrupados[nomeEquipe].push(jogador);
        });
        return jogadoresAgrupados;
    },
    encontrarUsuario: (usuarioAValidar, senhaAValidar) => {
        return usuarios.find(u => u.usuario === usuarioAValidar && u.senha === senhaAValidar);
    },
};
