var express = require("express"); //Framework de recursos mínimos para contrução de servidores WEB
const session = require('express-session'); //Módulo mediador do express. Guarda dados da sessão do user
var app = express(); //Define rotas, middlewares e configurações da sua aplicação web.
const path = require('path'); //Ajuda a manipular e trabalhar com caminhos de arquivos e diretórios
var connection = require('./database'); //Importa a conexão do banco de dados para a variável
const ejs = require('ejs') //Permite gerar páginas HTML dinâmicas a partir de variáveis JS

app.set('view engine', 'ejs'); //Configurando o EJS

app.use(express.static('public')); //Define uma pasta para ser o diretório de arquivos estáticos
app.use(express.urlencoded({ extended: true })); //Permite que o express interprete dados de formulários
app.use(express.static(path.join(__dirname, 'static'))); //garante que o caminho para a pasta static seja corretamente gerado

app.use(session({ // Configurando a sessão
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


app.get('/', function (req, res) { //Rota 'index'. Quando abrir o localhost:3000 manda essa função
    res.sendFile(path.join(__dirname + '/views/login.html'));
});

app.post('/login', function (req, res) { //Rota login
    let username = req.body.username;
    let senha = req.body.senha;
    if (username == 'adm') { //HACK PRA ENTRAR MAIS RÁPIDO 100% DE GRATIS SEM PAGAR NADA
        req.session.loggedin = true;
        req.session.username = username;
        res.redirect('/home');
    } else { //sem hack...
        connection.query("SELECT * FROM usuario WHERE nome_usuario = ? AND senha_usuario = ?",
            [username, senha], function (err, results, fields) {
                if (err) throw err;
                if (results.length > 0) {
                    req.session.loggedin = true;
                    req.session.username = username;
                    res.redirect('/home');
                } else {
                    res.render('loginError.ejs');
                }
                res.end();
            });
    } //TIRAR ESSES "HACKS" DEPOIS

});
app.post('/quit', function (req, res) { //Rota logout
    req.session.loggedin = false;
    res.redirect('/')
})

app.get('/home', function (req, res) { //Rota principal.
    if (req.session.loggedin) {
        res.render('cursos.ejs')
    } else {
        res.render('not_logged.ejs')
    }
})

app.get('/disciplinasPQ', function (req, res) { //Rota que mostra as disciplinas cadastradas em PQ
    if (req.session.loggedin) {
        let sql = "SELECT nm_disciplina, nm_curso, REPLACE(nm_disciplina,' ','-') URL FROM disciplina NATURAL JOIN curso WHERE sg_curso = 'PQ' ORDER BY qt_semestre";
        var disciplina = [];
        var urlDisciplina = [];
        var curso = [];
        connection.query(sql, function (err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                disciplina[i] = results[i].nm_disciplina;
                urlDisciplina[i] = results[i].URL;
                curso[i] = results[i].nm_curso;

            }
            res.render("disciplinas", { disciplina, curso, urlDisciplina });
        });
    } else res.render('not_logged.ejs')

})
app.get('/disciplinasCOMEX', function (req, res) { //Rota que mostra as disciplinas cadastradas em COMEX
    if (req.session.loggedin) {
        let sql = "SELECT nm_disciplina, nm_curso, nm_curso, REPLACE(nm_disciplina,' ','-') URL FROM disciplina NATURAL JOIN curso WHERE sg_curso = 'COMEX' ORDER BY qt_semestre;";
        var disciplina = [];
        var urlDisciplina = [];
        var curso = [];
        connection.query(sql, function (err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                disciplina[i] = results[i].nm_disciplina;
                urlDisciplina[i] = results[i].URL;
                curso[i] = results[i].nm_curso;

            }
            res.render("disciplinas.ejs", { disciplina, curso, urlDisciplina });
        });
    } else res.render('not_logged.ejs')

})
app.get('/disciplinasGE', function (req, res) { //Rota que mostra as disciplinas cadastradas em GE
    if (req.session.loggedin) {
        let sql = "SELECT nm_disciplina, nm_curso, nm_curso, REPLACE(nm_disciplina,' ','-') URL FROM disciplina NATURAL JOIN curso WHERE sg_curso = 'GE' ORDER BY qt_semestre;";
        var disciplina = [];
        var urlDisciplina = [];
        var curso = [];
        connection.query(sql, function (err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                disciplina[i] = results[i].nm_disciplina;
                urlDisciplina[i] = results[i].URL;
                curso[i] = results[i].nm_curso;

            }
            res.render("disciplinas.ejs", { disciplina, curso, urlDisciplina });
        });
    } else res.render('not_logged.ejs')

})
app.get('/disciplinasADS', function (req, res) { //Rota que mostra as disciplinas cadastradas em ADS
    if (req.session.loggedin) {
        let sql = "SELECT nm_disciplina, nm_curso, nm_curso, REPLACE(nm_disciplina,' ','-') URL FROM disciplina NATURAL JOIN curso WHERE sg_curso = 'ADS' ORDER BY qt_semestre;";
        var disciplina = [];
        var urlDisciplina = [];
        var curso = [];
        connection.query(sql, function (err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                disciplina[i] = results[i].nm_disciplina;
                urlDisciplina[i] = results[i].URL;
                curso[i] = results[i].nm_curso;

            }
            res.render("disciplinas.ejs", { disciplina, curso, urlDisciplina });
        });
    } else res.render('not_logged.ejs')

})
app.get('/disciplinasDSM', function (req, res) { //Rota que mostra as disciplinas cadastradas em DSM
    if (req.session.loggedin) {
        let sql = "SELECT nm_disciplina, nm_curso, nm_curso, REPLACE(nm_disciplina,' ','-') URL FROM disciplina NATURAL JOIN curso WHERE sg_curso = 'DSM' ORDER BY qt_semestre;";
        var disciplina = [];
        var urlDisciplina = [];
        var curso = [];
        connection.query(sql, function (err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                disciplina[i] = results[i].nm_disciplina;
                urlDisciplina[i] = results[i].URL;
                curso[i] = results[i].nm_curso;

            }
            res.render("disciplinas.ejs", { disciplina, curso, urlDisciplina });
        });
    } else res.render('not_logged.ejs')

})

app.get('/alunosAlgoritmos', function (req, res) { //Rota que mostra o nome e RA dos alunos cadastrados no BD
    let curso = req.body.curso;
    if (req.session.loggedin) {
        let sql = "SELECT id_ra, nm_aluno, qt_falta FROM aluno NATURAL JOIN aluno_disciplina NATURAL JOIN disciplina NATURAL JOIN curso WHERE nm_disciplina = 'Algoritmos' AND nm_curso = 'Análise e Desenvolvimento de Sistemas'";
        var ra = [];
        var nomes = [];
        var faltas = [];
        connection.query(sql, [curso], function (err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                ra[i] = results[i].id_ra;
                nomes[i] = results[i].nm_aluno;
                faltas[i] = results[i].qt_falta;

            }
            res.render("chamada", { ra, nomes, faltas });
        });
    } else res.render('not_logged.ejs')

})

app.get('/alunosEconomia', function (req, res) { //Rota que mostra o nome e RA dos alunos cadastrados no BD
    let curso = req.body.curso;
    if (req.session.loggedin) {
        let sql = "SELECT id_ra, nm_aluno, qt_falta FROM aluno NATURAL JOIN aluno_disciplina NATURAL JOIN disciplina NATURAL JOIN curso WHERE nm_disciplina = 'Economia' AND nm_curso = 'Comércio Exterior'";
        var ra = [];
        var nomes = [];
        var faltas = [];
        connection.query(sql, [curso], function (err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                ra[i] = results[i].id_ra;
                nomes[i] = results[i].nm_aluno;
                faltas[i] = results[i].qt_falta;

            }
            res.render("chamada", { ra, nomes, faltas });
        });
    } else res.render('not_logged.ejs')

})

app.post('/falta', function(req, res){
    let ra = req.body.ra
})

app.listen(3000, function () { //Iniciando o serivdor
    console.log("Aplicativo rodando na porta 3000");
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Database connected");
    })
});