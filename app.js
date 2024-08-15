var express = require("express");
const ejs = require('ejs')
var app = express();
var connection = require('./database');

app.get('/', function (req, res) { //Rota 'index'. Quando abrir o localhost:3000 manda essa função
    res.send("<h1>Fatec Praia Grande</h1><br>");
});

app.set('view engine', 'ejs'); //Configurando o EJS

app.get('/home', function (req, res) { //Rota principal. Talvez mudar para a rota 'index'?
    res.render('index.ejs')
})

app.get('/show', function (req, res) { //Testes para linkar o bd com o resto
    let sql = "SELECT nm_aluno FROM aluno";
    connection.query(sql, function (err, results) {
        if (err) throw err;
        //res.send(results);        
        var teste = JSON.stringify(results)    
        teste = teste.replace(/[^A-Za-z0-9]/g, ''); //remoção de caracteres não alfanumericos
        res.render("show", { teste });

    });

})/**/

app.listen(3000, function () { //Iniciando o serivdor
    console.log("Aplicativo rodando na porta 3000");
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Database connected");
    })
});