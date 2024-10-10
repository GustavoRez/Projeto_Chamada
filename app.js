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
app.use(express.json());

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
        return res.json({ success: true, message: 'Login concluído! Redirecionando...' });
    } else { //sem hack...
        connection.query("SELECT * FROM usuario WHERE nm_usuario = ? AND senha_usuario = md5(?)",
            [username, senha], function (err, results, fields) {
                if (err) throw err;
                if (results.length) {
                    req.session.loggedin = true;
                    req.session.username = results[0].nm_usuario;
                    req.session.avatar = results[0].img_perfil.toString();
                    req.session.cargo = results[0].cargo_usuario;
                    return res.json({ success: true, message: 'Login concluído! Redirecionando...' });
                } else {
                    return res.json({ success: false, message: 'Senha incorreta.' });
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
        const cargo = req.session.cargo;

        if (req.session.cargo == 'ALUNO') {
            var ra;
            var faltas = [];
            var dtFaltas = [];
            var disciplinas = [];
            var semestre = [];

            let sql = "SELECT a.id_ra, a.nm_aluno, g.qt_falta, d.nm_disciplina, d.qt_semestre, DATE_FORMAT(g.ultima_chamada, '%d/%m/%Y') datas ";
            sql += "FROM grade g NATURAL JOIN aluno a NATURAL JOIN disciplina d LEFT JOIN faltas f ON f.id_ra = a.id_ra WHERE nm_aluno = ? ORDER BY qt_semestre";

            connection.query(sql, [username], function (err, results) {
                if (err) throw err;
                else {
                    for (var i = 0; i < results.length; i++) {
                        ra = results[0].id_ra;
                        faltas[i] = results[i].qt_falta;
                        dtFaltas[i] = results[i].datas
                        disciplinas[i] = results[i].nm_disciplina;
                        semestre[i] = results[i].qt_semestre;

                    }
                    res.render('Alunos/home', { username, imgPerfil, ra, faltas, disciplinas, semestre, dtFaltas })
                }
            })

        } else if (req.session.cargo == 'ADMIN') {
            var nm_curso = [];
            var sg_curso = [];
            connection.query("SELECT nm_curso, sg_curso FROM curso", function (err, results) {
                if (err) throw err;
                for (var i = 0; i < results.length; i++) {
                    nm_curso[i] = results[i].nm_curso;
                    sg_curso[i] = results[i].sg_curso;
                }
                res.render('cursos', { username, imgPerfil, nm_curso, sg_curso, cargo });
            });
        }
        else {
            var nm_curso = [];
            var sg_curso = [];
            connection.query("SELECT DISTINCT nm_curso, sg_curso FROM curso NATURAL JOIN disciplina WHERE nm_professor = ?", [username], function (err, results) {
                if (err) throw err;
                for (var i = 0; i < results.length; i++) {
                    nm_curso[i] = results[i].nm_curso;
                    sg_curso[i] = results[i].sg_curso;
                }
                res.render('cursos', { username, imgPerfil, nm_curso, sg_curso, cargo });
            });

        }

    } else {
        res.render('not_logged')
    }
})


app.get('/disciplina-:SG', function (req, res) { //Rota que mostra as disciplinas, tanto para os ADM's como para professores
    if (req.session.loggedin && req.session.cargo != "ALUNO") {
        var username = req.session.username;
        if (req.session.cargo == "ADMIN") { var sql = "SELECT nm_disciplina, nm_curso, url_disciplina FROM disciplina NATURAL JOIN curso WHERE sg_curso = ? ORDER BY qt_semestre"; }
        else { var sql = "SELECT nm_disciplina, nm_curso, url_disciplina FROM disciplina NATURAL JOIN curso WHERE  sg_curso = ? AND nm_professor = ? ORDER BY qt_semestre"; }
        const sgCurso = req.params.SG;
        var disciplina = [];
        var URL = [];
        var curso = [];
        connection.query(sql, [sgCurso, username], function (err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                disciplina[i] = results[i].nm_disciplina;
                URL[i] = results[i].url_disciplina;
                curso[i] = results[0].nm_curso;

            }
            if (req.session.cargo == "ADMIN") res.render("ADM/disciplinas", { disciplina, curso, URL });
            else res.render("disciplinas", { disciplina, curso, URL });
        });
    } else res.render('not_logged')
})

// Para ADM's
app.get('/presencas-:URL', function (req, res) { // Rota que mostra o nome, RA e faltas dos alunos cadastrados no BD
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
app.get('/criar', function (req, res) { // Rota que leva a tela de edição/criação
    if (req.session.loggedin && req.session.cargo == "ADMIN") {
        const username = req.session.username;
        const imgPerfil = req.session.avatar;

        res.render('ADM/criar', { username, imgPerfil });

    } else res.render('not_logged')
})
app.get('/criarUsuario', function (req, res) {
    const username = req.session.username;
    const ftPerfil = req.session.avatar;

    res.render('ADM/criarUsuario', { username, ftPerfil })
})
app.post('/criarUsuario', function (req, res) { // Rota que cria um novo usuário e, se for o caso, aluno também
    const { nome, pass, role } = req.body;

    if (!nome || !pass || !role) {
        return res.json({ success: false, message: 'Por favor, preencha todos os campos!' });
    }

    let sql = "INSERT INTO usuario (nm_usuario, senha_usuario, cargo_usuario) VALUES (?, MD5(?), ?);"

    connection.query(sql, [nome, pass, role], function (err, results) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Erro ao criar o usuário.' });
        } else {
            console.log(results);
            if (role == 'ALUNO') {
                var sql2 = "INSERT INTO aluno (nm_aluno) VALUES (?);"
                connection.query(sql2, [nome], function (err, results) {
                    if (err) {
                        console.log(err);
                        return res.json({ success: false, message: 'Erro ao registrar o aluno.' });
                    } else {
                        console.log(results);
                        return res.json({ success: true, message: 'Aluno criado com sucesso! Redirecionando para tela inicial.' });
                    }
                });
            } else {
                return res.json({ success: true, message: 'Professor criado com sucesso! Redirecionando para tela inicial.' });
            }
        }
    });
})
app.get('/criarCurso', function (req, res) {
    const username = req.session.username;
    const ftPerfil = req.session.avatar;

    res.render('ADM/criarCurso', { username, ftPerfil })
})
app.post('/criarCurso', function (req, res) { // Rota que cria um novo curso
    const { nomeC, sigla, descricao } = req.body;

    if (!nomeC || !sigla) {
        return res.json({ success: false, message: 'Por favor, preencha todos os campos necessários!' });
    }

    let sql = "INSERT INTO curso (nm_curso, sg_curso, ds_curso) VALUES (?, ?, ?);"

    connection.query(sql, [nomeC, sigla, descricao], function (err, results) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Erro ao criar curso.' });
        } else {
            console.log(results);
            return res.json({ success: true, message: 'Curso criado com sucesso!' })
        }
    });
})
app.get('/editarCurso', function (req, res) {
    if (req.session.loggedin && req.session.cargo == 'ADMIN') {
        const username = req.session.username;
        const imgPerfil = req.session.avatar;
        var id_curso = [];
        var nm_curso = [];
        var sg_curso = [];
        var ds_curso = [];
        connection.query("SELECT id_curso, nm_curso, sg_curso, ds_curso FROM curso", function (err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                id_curso[i] = results[i].id_curso;
                nm_curso[i] = results[i].nm_curso;
                sg_curso[i] = results[i].sg_curso;
                ds_curso[i] = results[i].ds_curso;
            }
            res.render('ADM/editarCurso', { username, imgPerfil, nm_curso, sg_curso, ds_curso, id_curso });
        });
    } else {
        res.render('not_logged')
    }

})
app.post('/editarCurso', function (req, res) { // Rota que edita os dados de um curso
    const { id, nomeC, sigla, descricao } = req.body;

    if (!nomeC || !sigla) {
        return res.json({ success: false, message: 'Por favor, preencha todos os campos necessários!' });
    }

    let sql = "UPDATE curso SET sg_curso = ?, nm_curso = ?, ds_curso = ? WHERE id_curso = ?;"

    connection.query(sql, [sigla, nomeC, descricao, id], function (err, results) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Erro ao editar curso.' });
        } else {
            console.log(results);
            return res.json({ success: true, message: 'Curso editado com sucesso!' })
        }
    });
})
app.get('/criarDisciplina', function (req, res) {
    const username = req.session.username;
    const ftPerfil = req.session.avatar;

    res.render('ADM/criarDisciplina', { username, ftPerfil })
})
app.post('/criarDisciplina', function (req, res) { // Rota que cria uma nova disciplina
    const { nomeD, curso, semestre, professor } = req.body;

    if (!nomeD || !curso || !semestre) {
        return res.json({ success: false, message: 'Por favor, preencha todos os campos necessários! (Marcados com *)' });
    }

    let sql = "INSERT INTO disciplina (nm_disciplina, qt_semestre, id_curso, url_disciplina, nm_professor) VALUES (?,?, ?, REPLACE(?, ' ', '-'), ?);"

    connection.query(sql, [nomeD, semestre, curso, nomeD, professor], function (err, results) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Erro ao criar disciplina.' });
        } else {
            console.log(results);
            return res.json({ success: true, message: 'Disciplina criada com sucesso!' })
        }
    });
})
app.get('/editarDisciplina', function (req, res) {
    if (req.session.loggedin && req.session.cargo == 'ADMIN') {
        const username = req.session.username;
        const imgPerfil = req.session.avatar;
        var id_disciplina = [];
        var nm_disciplina = [];
        var qt_semestre = [];
        var nm_professor = [];
        var sg_curso = [];
        connection.query("SELECT id_disciplina, nm_disciplina, qt_semestre, nm_professor, sg_curso FROM disciplina NATURAL JOIN curso", function (err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                id_disciplina[i] = results[i].id_disciplina;
                nm_disciplina[i] = results[i].nm_disciplina;
                qt_semestre[i] = results[i].qt_semestre;
                nm_professor[i] = results[i].nm_professor;
                sg_curso[i] = results[i].sg_curso;
            }
            res.render('ADM/editarDisciplina', { username, imgPerfil, id_disciplina, nm_disciplina, qt_semestre, nm_professor, sg_curso });
        });
    } else {
        res.render('not_logged')
    }

})
app.post('/editarDisciplina', function (req, res) { // Rota que edita os dados de um curso
    const { nomeC, sigla, descricao } = req.body;

    if (!nomeC || !sigla) {
        return res.json({ success: false, message: 'Por favor, preencha todos os campos necessários!' });
    }

    let sql = "INSERT INTO curso (nm_curso, sg_curso, ds_curso) VALUES (?, ?, ?);"

    connection.query(sql, [nomeC, sigla, descricao], function (err, results) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Erro ao editar disciplina.' });
        } else {
            console.log(results);
            return res.json({ success: true, message: 'Disciplina editada com sucesso!' })
        }
    });
})

// Para Professores
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

    sql += ' END, ultima_chamada = CURDATE() WHERE id_ra IN (' + Object.keys(faltas).map(reg => `'${reg}'`).join(', ') + ') AND id_disciplina = ' + id;

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
app.get('/editar', function (req, res) { // Rota que exibe a página de edição de perfil do aluno
    if (req.session.loggedin && req.session.cargo == "ALUNO") {
        const username = req.session.username;
        const imgPerfil = req.session.avatar;

        connection.query("SELECT * FROM usuario WHERE nm_usuario = ?;", [username],
            function (err, results, fields) {
                if (err) throw err;
                if (results.length) {
                    var senha = results[0].senha_usuario;
                    res.render('Alunos/editar', { username, imgPerfil, senha });
                }
            })

    } else res.render('not_logged')
})
app.post('/editarNome', function (req, res) { // Rota que permite a um aluno alterar seu nome de usuário
    const oldUsername = req.session.username;
    const nvUsername = req.body.nvNome;

    if (!nvUsername) {
        return res.json({ success: false, message: 'Nomes nulos não são aceitos!' });
    }

    let sqlU = "UPDATE usuario SET nm_usuario = ? WHERE nm_usuario = ?";
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
app.post('/editarSenha', function (req, res) { // Rota que permite a um aluno alterar sua senha de acesso
    const username = req.session.username;
    const nvPass = req.body.nvPass;

    if (!nvPass) {
        return res.json({ success: false, message: 'Senhas nulas não são aceitas!' });
    }

    let sql = "UPDATE usuario SET senha_usuario = md5(?) WHERE nm_usuario = ?";

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
app.post('/editarImagem', upload.single('newImage'), async (req, res) => { // Rota que permite a um aluno atualizar sua imagem de perfil
    const username = req.session.username;
    const path = req.file.path.replace(String.fromCharCode(92), String.fromCharCode(47));

    if (!req.file) {
        return res.status(400).send('Nenhuma imagem foi detectada!');
    }

    connection.query("UPDATE usuario SET imgPerfil = ? WHERE nm_usuario = ?",
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
