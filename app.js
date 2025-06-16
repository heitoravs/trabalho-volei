const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const authController = require('./controllers/authController');

const teamRoutes = require('./routes/teamRoutes');
const playerRoutes = require('./routes/playerRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.use(cookieParser());

app.use(session({
    secret: 'seuSegredoSuperSecreto',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 60 * 1000,
        httpOnly: true
    }
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    if (req.session.isAuthenticated) {
        const lastAccess = req.cookies.ultimoAcesso;
        if (lastAccess) {
            req.lastAccess = new Date(lastAccess).toLocaleString('pt-BR', {
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: 'numeric', minute: 'numeric', second: 'numeric'
            });
        } else {
            req.lastAccess = 'Primeiro acesso';
        }
        res.cookie('ultimoAcesso', new Date().toISOString(), { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    }
    next();
});

app.use('/', authRoutes);
app.use('/', teamRoutes);
app.use('/', playerRoutes);

app.get('/', (req, res) => {
    if (req.session.isAuthenticated) {
        return res.redirect('/menu');
    }
    res.render('login', { message: null });
});

app.get('/menu', authController.verificarAutenticacao, (req, res) => {
    res.render('menu', {
        username: req.session.username,
        lastAccess: req.lastAccess
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});
