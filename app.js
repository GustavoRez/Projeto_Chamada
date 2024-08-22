var express = require("express");
const session = require('express-session');
var app = express();
const path = require('path');
var connection = require('./database');
const ejs = require('ejs')

app.set('view engine', 'ejs'); //Configurando o EJS

//app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


app.get('/', function (req, res) { //Rota 'index'. Quando abrir o localhost:3000 manda essa função
    res.sendFile(path.join(__dirname + '/views/login.html'));
});

app.post('/login', function (req, res) {
    let username = req.body.username;
    let senha = req.body.senha;
    connection.query("SELECT * FROM usuario WHERE nome_usuario = ? AND senha_usuario = ?",
        [username, senha], function (err, results, fields) {
            if (err) throw err;
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/home');
            } else {
                res.send('Nome ou senha incorretos!');
            }
            res.end();
        });

});

app.get('/home', function (req, res) { //Rota principal.
    if (req.session.loggedin) {
        res.render('index.ejs')
    } else{
        res.render('not_logged.ejs')
    }
})

app.get('/show', function (req, res) { //Rota que mostra o nome e RA dos alunos cadastrados no BD
    let sql = "SELECT * FROM aluno NATURAL JOIN falta";
    var ra = [];
    var nomes = [];
    var faltas = [];
    connection.query(sql, function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            ra[i] = results[i].id_ra;
            nomes[i] = results[i].nm_aluno;
            faltas[i] = results[i].qt_falta;

        }
        res.render("show", { ra, nomes, faltas });
    });

})

app.listen(3000, function () { //Iniciando o serivdor
    console.log("Aplicativo rodando na porta 3000");
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Database connected");
    })
});