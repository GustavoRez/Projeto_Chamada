var express = require("express");
const ejs = require('ejs')
var app = express();
var connection = require('./database');

app.set('view engine', 'ejs'); //Configurando o EJS

app.use(express.static('public'));

app.get('/', function (req, res) { //Rota 'index'. Quando abrir o localhost:3000 manda essa função
    res.render('index.ejs')
});

app.get('/home', function (req, res) { //Rota principal. Talvez mudar para a rota 'index'?
    res.render('index.ejs')
})

app.get('/show', function (req, res) { //Rota que mostra o nome e RA dos alunos cadastrados no BD
    let sql = "SELECT * FROM aluno NATURAL JOIN falta";
    var ra = [];
    var nomes = [];
    var faltas = [];
    connection.query(sql, function (err, results) {
        if (err) throw err;
        for(var i = 0; i < results.length; i++){
            ra[i] = results[i].id_ra;
            nomes [i] = results[i].nm_aluno;
            faltas [i] = results[i].qt_falta;
            
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