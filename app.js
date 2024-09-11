var express = require("express"); //Framework de recursos mínimos para contrução de servidores WEB
const session = require('express-session'); //Módulo mediador do express. Guarda dados da sessão do user
var app = express(); //Define rotas, middlewares e configurações da sua aplicação web.
const path = require('path'); //Ajuda a manipular e trabalhar com caminhos de arquivos e diretórios
var connection = require('./database'); //Importa a conexão do banco de dados para a variável
const bodyParser = require('body-parser');
const ejs = require('ejs') //Permite gerar páginas HTML dinâmicas a partir de variáveis JS

app.set('view engine', 'ejs'); //Configurando o EJS

app.use(bodyParser.json());// Middleware para processar JSON
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

    connection.query("SELECT * FROM usuario WHERE nome_usuario = ? AND senha_usuario = md5(?)",
        [username, senha], function (err, results, fields) {
            if (err) throw err;
            if (results.length) {
                req.session.loggedin = true;
                req.session.username = username;
                req.session.avatar = `data:image/jpg;base64,${results[0].imgPerfil.toString('base64')}`;
                req.session.cargo = results[0].cargo_usuario;
                res.redirect('/home');
            } else {
                res.render('loginError');
            }
            res.end();
        });


});
app.post('/quit', function (req, res) { //Rota logout
    req.session.loggedin = false;
    req.session.username = null;
    req.session.avatar = null;
    req.session.cargo = null;
    res.redirect('/')
})

app.get('/home', function (req, res) { //Rota principal.
    if (req.session.loggedin) {
        const username = req.session.username;
        const imgPerfil = req.session.avatar;

        if (req.session.cargo == 'ALUNO') {
            res.redirect('/inicio')
        } else if (req.session.cargo == 'ADMIN') {
            res.render('cursos', { username, imgPerfil })
        } else {
            const username = req.session.username;
            const imgPerfil = req.session.avatar;
            res.render('cursos', { username, imgPerfil });
        }

    } else {
        res.render('not_logged')
    }
})
app.get('/inicio', function (req, res) {
    if (req.session.loggedin && req.session.cargo == "ALUNO") {
        var username = req.session.username;
        const imgPerfil = req.session.avatar;
        var ra;
        var faltas = [];
        var disciplinas = [];
        var semestre = [];

        let sql = "SELECT id_ra, nm_aluno, qt_falta, nm_disciplina, qt_semestre ";
        sql += "FROM grade NATURAL JOIN aluno NATURAL JOIN disciplina WHERE nm_aluno = '" + username + "' ORDER BY qt_semestre";

        connection.query(sql, function (err, results) {
            if (err) throw err;
            else {
                for (var i = 0; i < results.length; i++) {
                    ra = results[0].id_ra;
                    faltas[i] = results[i].qt_falta;
                    disciplinas[i] = results[i].nm_disciplina;
                    semestre[i] = results[i].qt_semestre;

                }
                res.render('Alunos/home', { username, imgPerfil, ra, faltas, disciplinas, semestre })
            }
        });
    } else res.render('not_logged')
});
/*app.get('/adm', function (req, res) {
    if (req.session.loggedin && req.session.cargo == "ADMIN") {
        var username = req.session.username;
        const imgPerfil = req.session.avatar;

    } else res.render('not_logged')
});*/

app.get('/disciplinasPQ', function (req, res) { //Rota que mostra as disciplinas cadastradas em PQ
    if (req.session.loggedin && req.session.cargo != "ALUNO") {
        let sql = "SELECT nm_disciplina, nm_curso, url_disciplina FROM disciplina NATURAL JOIN curso WHERE sg_curso = 'PQ' ORDER BY qt_semestre";
        var disciplina = [];
        var URL = [];
        var curso = [];
        connection.query(sql, function (err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                disciplina[i] = results[i].nm_disciplina;
                URL[i] = results[i].url_disciplina;
                curso[i] = results[i].nm_curso;

            }
            res.render("disciplinas", { disciplina, curso, URL });
        });
    } else res.render('not_logged')

})
app.get('/disciplinasCOMEX', function (req, res) { //Rota que mostra as disciplinas cadastradas em COMEX
    if (req.session.loggedin && req.session.cargo != "ALUNO") {
        let sql = "SELECT nm_disciplina, nm_curso, url_disciplina FROM disciplina NATURAL JOIN curso WHERE sg_curso = 'COMEX' ORDER BY qt_semestre;";
        var disciplina = [];
        var URL = [];
        var curso = [];
        connection.query(sql, function (err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                disciplina[i] = results[i].nm_disciplina;
                URL[i] = results[i].url_disciplina;
                curso[i] = results[i].nm_curso;

            }
            res.render("disciplinas", { disciplina, curso, URL });
        });
    } else res.render('not_logged')

})
app.get('/disciplinasGE', function (req, res) { //Rota que mostra as disciplinas cadastradas em GE
    if (req.session.loggedin && req.session.cargo != "ALUNO") {
        let sql = "SELECT nm_disciplina, nm_curso, url_disciplina FROM disciplina NATURAL JOIN curso WHERE sg_curso = 'GE' ORDER BY qt_semestre;";
        var disciplina = [];
        var URL = [];
        var curso = [];
        connection.query(sql, function (err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                disciplina[i] = results[i].nm_disciplina;
                URL[i] = results[i].url_disciplina;
                curso[i] = results[i].nm_curso;

            }
            res.render("disciplinas", { disciplina, curso, URL });
        });
    } else res.render('not_logged')

})
app.get('/disciplinasADS', function (req, res) { //Rota que mostra as disciplinas cadastradas em ADS
    if (req.session.loggedin && req.session.cargo != "ALUNO") {
        let sql = "SELECT nm_disciplina, nm_curso, url_disciplina FROM disciplina NATURAL JOIN curso WHERE sg_curso = 'ADS' ORDER BY qt_semestre;";
        var disciplina = [];
        var URL = [];
        var curso = [];
        connection.query(sql, function (err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                disciplina[i] = results[i].nm_disciplina;
                URL[i] = results[i].url_disciplina;
                curso[i] = results[i].nm_curso;

            }
            res.render("disciplinas", { disciplina, curso, URL });
        });
    } else res.render('not_logged')

})
app.get('/disciplinasDSM', function (req, res) { //Rota que mostra as disciplinas cadastradas em DSM
    if (req.session.loggedin && req.session.cargo != "ALUNO") {
        let sql = "SELECT nm_disciplina, nm_curso, url_disciplina FROM disciplina NATURAL JOIN curso WHERE sg_curso = 'DSM' ORDER BY qt_semestre;";
        var disciplina = [];
        var URL = [];
        var curso = [];
        connection.query(sql, function (err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                disciplina[i] = results[i].nm_disciplina;
                URL[i] = results[i].url_disciplina;
                curso[i] = results[i].nm_curso;

            }
            res.render("disciplinas", { disciplina, curso, URL });
        });
    } else res.render('not_logged')

})

app.get('/alunos-:URL', function (req, res) { //Rota que mostra o nome e RA dos alunos cadastrados no BD    
    const URL = req.params.URL;
    if (req.session.loggedin && req.session.cargo != "ALUNO") {
        let sql = "SELECT id_ra, nm_aluno, qt_falta, id_disciplina FROM aluno NATURAL JOIN grade NATURAL JOIN disciplina WHERE url_disciplina = ?";
        var ra = [];
        var nomes = [];
        var faltas = [];
        var idDisciplina;
        connection.query(sql, [URL], function (err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                ra[i] = results[i].id_ra;
                nomes[i] = results[i].nm_aluno;
                faltas[i] = results[i].qt_falta;
                idDisciplina = results[0].id_disciplina
            }
            res.render("chamada", { ra, nomes, faltas, idDisciplina });
        });
    } else res.render('not_logged')
})
app.post('/adicionarFaltas', function (req, res) {
    const faltas = req.body.faltasAlunos;
    const id = req.body.idDisciplina;

    let sql = "UPDATE grade SET qt_falta = qt_falta + CASE";

    for (let RA in faltas) {
        sql += ' WHEN id_ra = ' + RA + ' THEN ' + faltas[RA];
    }

    sql += ' END WHERE id_ra IN (' + Object.keys(faltas).map(reg => `'${reg}'`).join(', ') + ') AND id_disciplina = ' + id;

    connection.query(sql, function (err, results) {
        if (err) {
            console.log(err);
            res.json({ success: false });
        } else {
            console.log(results);
            res.json({ success: true });
        }
    })
})


app.get('/editar', function (req, res) {
    if (req.session.loggedin && req.session.cargo == "ALUNO") {
        const username = req.session.username;
        const imgPerfil = req.session.avatar;

        connection.query("SELECT * FROM usuario WHERE nome_usuario = '" + username + "';",
            function (err, results, fields) {
                if (err) throw err;
                if (results.length) {
                    var senha = results[0].senha_usuario;
                    res.render('Alunos/editar', { username, imgPerfil, senha });
                }
            })

    } else res.render('not_logged')
})
app.post('/editarNome', function (req, res) {
    const oldUsername = req.session.username;
    const nvUsername = req.body.nvNome;
    let sqlU = "UPDATE usuario SET nome_usuario = '" + nvUsername + "' WHERE nome_usuario = '" + oldUsername + "'";
    let sqlA = "UPDATE aluno SET nm_aluno = '" + nvUsername + "' WHERE nm_aluno = '" + oldUsername + "'";

    connection.query(sqlU, [nvUsername, oldUsername], function (err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
            req.session.username = nvUsername;
        }
    });
    connection.query(sqlA, [nvUsername, oldUsername], function (err, results) {
        if (err) {
            console.log(err);
            res.json({ success: false });
        } else {
            console.log(results);
            res.json({ success: true });
        }
    });
})
app.post('/editarSenha', function (req, res) {
    const username = req.session.username;
    const nvPass = req.body.nvPass;
    let sql = "UPDATE usuario SET senha_usuario = '" + nvPass + "' WHERE nome_usuario = '" + username + "'";

    connection.query(sql, function (err, results) {
        if (err) {
            console.log(err);
            res.json({ success: false });
        } else {
            console.log(results);
            res.json({ success: true });
        }
    });
})
app.post('/editarImagem', function (req, res) { //parei aqui
    const username = req.session.username;
    const rawImg = req.body.fileData;
    const nvImg = rawImg.replace(/^data:.*,/, '');

    console.log(new Blob([nvImg.value], { type: 'plain/text' }));

    let sql = "UPDATE usuario SET imgPerfil = '" + new Blob([nvImg], { type: 'plain/text' }) + "' WHERE nome_usuario = '" + username + "'";

    connection.query(sql, function (err, results) {
        if (err) {
            console.log(err);
            res.json({ success: false });
        } else {
            console.log(results);
            res.json({ success: true });
        }
    });
})


app.listen(3000, function () { //Iniciando o serivdor
    console.log("Aplicativo rodando na porta 3000");
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Database connected");
    })
});
