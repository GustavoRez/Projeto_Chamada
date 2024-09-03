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
app.post('/quit', function (req, res) {
    req.session.loggedin = false;
    res.redirect('/')
})

app.get('/home', function (req, res) { //Rota principal.
    if (req.session.loggedin) {
        res.render('index.ejs')
    } else {
        res.render('not_logged.ejs')
    }
})

app.get('/disciplinasPQ', function (req, res) { //Rota que mostra as materias cadastradas em PQ
    if (req.session.loggedin) {
        let sql = "SELECT nm_materia, nm_mestrante, nm_curso FROM materia NATURAL JOIN curso WHERE sg_curso = 'PQ';";
        var materia = [];
        var mestrante = [];
        var curso = [];
        connection.query(sql, function (err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                materia[i] = results[i].nm_materia;
                mestrante[i] = results[i].nm_mestrante;
                curso[i] = results[i].nm_curso;

            }
            res.render("disciplinas.ejs", { materia, mestrante, curso });
        });
    } else res.render('not_logged.ejs')

})
app.get('/disciplinasCOMEX', function (req, res) { //Rota que mostra as materias cadastradas em COMEX
    if (req.session.loggedin) {
        let sql = "SELECT nm_materia, nm_mestrante, nm_curso FROM materia NATURAL JOIN curso WHERE sg_curso = 'COMEX';";
        var materia = [];
        var mestrante = [];
        var curso = [];
        connection.query(sql, function (err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                materia[i] = results[i].nm_materia;
                mestrante[i] = results[i].nm_mestrante;
                curso[i] = results[i].nm_curso;

            }
            res.render("disciplinas.ejs", { materia, mestrante, curso });
        });
    } else res.render('not_logged.ejs')

})
app.get('/disciplinasGE', function (req, res) { //Rota que mostra as materias cadastradas em GE
    if (req.session.loggedin) {
        let sql = "SELECT nm_materia, nm_mestrante, nm_curso FROM materia NATURAL JOIN curso WHERE sg_curso = 'GE';";
        var materia = [];
        var mestrante = [];
        var curso = [];
        connection.query(sql, function (err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                materia[i] = results[i].nm_materia;
                mestrante[i] = results[i].nm_mestrante;
                curso[i] = results[i].nm_curso;

            }
            res.render("disciplinas.ejs", { materia, mestrante, curso });
        });
    } else res.render('not_logged.ejs')

})
app.get('/disciplinasADS', function (req, res) { //Rota que mostra as materias cadastradas em ADS
    if (req.session.loggedin) {
        let sql = "SELECT nm_materia, nm_mestrante, nm_curso FROM materia NATURAL JOIN curso WHERE sg_curso = 'ADS';";
        var materia = [];
        var mestrante = [];
        var curso = [];
        connection.query(sql, function (err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                materia[i] = results[i].nm_materia;
                mestrante[i] = results[i].nm_mestrante;
                curso[i] = results[i].nm_curso;

            }
            res.render("disciplinas.ejs", { materia, mestrante, curso });
        });
    } else res.render('not_logged.ejs')

})
app.get('/disciplinasDSM', function (req, res) { //Rota que mostra as materias cadastradas em DSM
    if (req.session.loggedin) {
        let sql = "SELECT nm_materia, nm_mestrante, nm_curso FROM materia NATURAL JOIN curso WHERE sg_curso = 'DSM';";
        var materia = [];
        var mestrante = [];
        var curso = [];
        connection.query(sql, function (err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                materia[i] = results[i].nm_materia;
                mestrante[i] = results[i].nm_mestrante;
                curso[i] = results[i].nm_curso;

            }
            res.render("disciplinas.ejs", { materia, mestrante, curso });
        });
    } else res.render('not_logged.ejs')

})

app.get('/show', function (req, res) { //Rota que mostra o nome e RA dos alunos cadastrados no BD
    if (req.session.loggedin) {
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
    } else res.render('not_logged.ejs')

})

app.listen(3000, function () { //Iniciando o serivdor
    console.log("Aplicativo rodando na porta 3000");
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Database connected");
    })
});