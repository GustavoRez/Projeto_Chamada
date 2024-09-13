var express = require("express"); //Framework de recursos mínimos para contrução de servidores WEB
const session = require('express-session'); //Módulo mediador do express. Guarda dados da sessão do user
var app = express(); //Define rotas, middlewares e configurações da sua aplicação web.
const path = require('path'); //Ajuda a manipular e trabalhar com caminhos de arquivos e diretórios
var connection = require('./database'); //Importa a conexão do banco de dados para a variável
const bodyParser = require('body-parser');
const ejs = require('ejs'); //Permite gerar páginas HTML dinâmicas a partir de variáveis JS
const multer = require("multer");

const storage = multer.diskStorage({  //Constante que guarda um caminho para as imagens de perfil
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Pasta onde as imagens serão salvas
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname); // Nome único para cada arquivo
    }
});
const upload = multer({ storage: storage });
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); //garante que o caminho para a pasta uploads seja corretamente gerado



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
    if (username == 'adm') { //HACK PRA ENTRAR MAIS RÁPIDO 100% DE GRATIS SEM PAGAR NADA
        req.session.loggedin = true;
        req.session.username = "adm";
        req.session.cargo = 'ADMIN'
        req.session.avatar = 'uploads/1726149312658-127124321-avatar.jpg';
        res.redirect('/home');
    } else { //sem hack...
        connection.query("SELECT * FROM usuario WHERE nome_usuario = ? AND senha_usuario = md5(?)",
            [username, senha], function (err, results, fields) {
                if (err) throw err;
                if (results.length) {
                    req.session.loggedin = true;
                    req.session.username = username;
                    req.session.avatar = results[0].imgPerfil.toString();
                    req.session.cargo = results[0].cargo_usuario;
                    res.redirect('/home');
                } else {
                    res.render('loginError');
                }
                res.end();
            });
    } //TIRAR ESSES "HACKS" DEPOIS

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
            var ra;
            var faltas = [];
            var disciplinas = [];
            var semestre = [];

            let sql = "SELECT id_ra, nm_aluno, qt_falta, nm_disciplina, qt_semestre ";
            sql += "FROM grade NATURAL JOIN aluno NATURAL JOIN disciplina WHERE nm_aluno = ? ORDER BY qt_semestre";

            connection.query(sql, [username], function (err, results) {
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
            })

        } else {
            var nm_curso = [];
            var sg_curso = [];
            connection.query("SELECT nm_curso, sg_curso FROM curso", function (err, results) {
                if (err) throw err;
                for (var i = 0; i < results.length; i++) {
                    nm_curso[i] = results[i].nm_curso;
                    sg_curso[i] = results[i].sg_curso;
                }

                res.render('cursos', { username, imgPerfil, nm_curso, sg_curso });
            });

        }

    } else {
        res.render('not_logged')
    }
})

// ADM's
app.get('/disciplina-:SG', function (req, res) {
    if (req.session.loggedin && req.session.cargo != "ALUNO") {
        const sgCurso = req.params.SG;
        let sql = "SELECT nm_disciplina, nm_curso, url_disciplina FROM disciplina NATURAL JOIN curso WHERE sg_curso = ? ORDER BY qt_semestre";
        var disciplina = [];
        var URL = [];
        var curso = [];
        connection.query(sql, [sgCurso], function (err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                disciplina[i] = results[i].nm_disciplina;
                URL[i] = results[i].url_disciplina;
                curso[i] = results[0].nm_curso;

            }                
            if( req.session.cargo == "ADMIN") res.render("ADM/disciplinas", { disciplina, curso, URL });
            else res.render("disciplinas", { disciplina, curso, URL });
        });
    } else res.render('not_logged')
})
app.get('/presencas-:URL', function (req, res) { //Rota que mostra o nome e RA dos alunos cadastrados no BD    
    const URL = req.params.URL;
    if (req.session.loggedin && req.session.cargo == "ADMIN") {
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
            res.render("ADM/presencas", { ra, nomes, faltas, idDisciplina });
        });
    } else res.render('not_logged')
})

// Professores
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
app.post('/adicionarFaltas', function (req, res) { //Rota que adiciona falta aos alunos
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

// Alunos
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
    let sqlU = "UPDATE usuario SET nome_usuario = ? WHERE nome_usuario = ?";
    let sqlA = "UPDATE aluno SET nm_aluno = ? WHERE nm_aluno = ?";

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
    let sql = "UPDATE usuario SET senha_usuario = md5(?) WHERE nome_usuario = ?";

    connection.query(sql, [nvPass, username], function (err, results) {
        if (err) {
            console.log(err);
            res.json({ success: false });
        } else {
            console.log(results);
            res.json({ success: true });
        }
    });
})
app.post('/editarImagem', upload.single('newImage'), async (req, res) => {
    const username = req.session.username;
    const path = req.file.path.replace(String.fromCharCode(92), String.fromCharCode(47));
    if (!req.file) {
        return res.status(400).send('No image file uploaded');
    }
    connection.query("UPDATE usuario SET imgPerfil = ? WHERE nome_usuario = ?",
        [path, username], function (err, results) {
            if (err) {
                console.log(err);
                res.redirect('/editar');
            } else {
                console.log(results);
                res.redirect('/home');
            }
        });

});

app.listen(3000, function () { //Iniciando o serivdor
    console.log("Aplicativo rodando na porta 3000");
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Database connected");
    })
});
