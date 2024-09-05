DROP TABLE IF EXISTS `aluno`;
CREATE TABLE `aluno` (
  `id_ra` int(13) NOT NULL AUTO_INCREMENT,
  `nm_aluno` varchar(45) NOT NULL,
  `qt_falta` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_ra`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

LOCK TABLES `aluno` WRITE;
INSERT INTO `aluno` VALUES (1,'Lucas Ferreira',2),(2,'Maria Silva',0),(3,'Pedro Souza',0),(4,'Ana Costa',4),(5,'João Oliveira',2),(6,'Laura Pereira',10),(7,'Gabriel Lima',0),(8,'Júlia Gomes',4),(9,'Carlos Rocha',8),(10,'Fernanda Santos',0),(11,'Bruno Almeida',2),(12,'Mariana Melo',0),(13,'Rafael Barbosa',0),(14,'Beatriz Moreira',0),(15,'Daniel Araújo',2),(16,'Camila Ribeiro',1),(17,'Felipe Martins',4),(18,'Letícia Nascimento',0),(19,'Thiago Correia',8),(20,'Sofia Carvalho',2),(21,'Heitor Pedro',NULL);
UNLOCK TABLES;

DROP TABLE IF EXISTS `curso`;
CREATE TABLE `curso` (
  `id_curso` int(11) NOT NULL AUTO_INCREMENT,
  `sg_curso` varchar(5) NOT NULL,
  `nm_curso` varchar(45) NOT NULL,
  `ds_curso` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id_curso`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

LOCK TABLES `curso` WRITE;
INSERT INTO `curso` VALUES (1,'ADS','Análise e Desenvolvimento de Sistemas','Curso de Análise e Desenvolvimento de Sistemas. Voltado para análise e BackEnd.'),(2,'PQ','Processos Químicos','Curso de Química. Voltado para quem quer atuar na indústria petroquímica, eletroquímicaindústria petroquímica, eletroquímica, farmacêutica e de produç'),(3,'COMEX','Comércio Exterior','Curso de Comércio Exterior. Voltado para quem gerencia operações de comércio exterior, tais como: transações cambiais, despacho e legislação aduaneira'),(4,'GE','Gestão Empresarial','Curso de Gestão de Empresas. Voltado para quem quer atuar como gestor em empresas de pequeno à grande porte ou seu próprio negócio.'),(5,'DSM','Desenvolvimento de Software Multiplataforma','Curso de Desenvolvimento. Voltado para o desenvolvimento de novas tecnologias, como IOT, Mobile, Inteligência Artificial, Nuvem, entre outros.');
UNLOCK TABLES;

DROP TABLE IF EXISTS `disciplina`;
CREATE TABLE `disciplina` (
  `id_disciplina` int(11) NOT NULL AUTO_INCREMENT,
  `nm_disciplina` varchar(45) DEFAULT NULL,
  `qt_semestre` int(11) NOT NULL,
  `id_curso` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_disciplina`),
  KEY `qt_semestre` (`qt_semestre`),
  KEY `id_curso` (`id_curso`),
  CONSTRAINT `disciplina_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id_curso`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

LOCK TABLES `disciplina` WRITE;
INSERT INTO `disciplina` VALUES (1,'Banco de Dados',3,1),(2,'Banco de Dados',3,5),(3,'Laboratório de Banco de Dados',5,1);
UNLOCK TABLES;

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nome_usuario` varchar(45) DEFAULT NULL,
  `senha_usuario` varchar(45) NOT NULL,
  `cargo_usuario` varchar(5) DEFAULT 'ALUNO',
  `isAdmin` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

LOCK TABLES `usuario` WRITE;
INSERT INTO `usuario` VALUES (1,'Gustavo Rezende','1234','ADMIN',1),(2,'Nycolas Guia','1234','PROF',0),(3,'Heitor Pedro','1234','ALUNO',0),(4,'Lucas Ferreira','1234','ALUNO',0),(5,'Maria Silva','1234','ALUNO',0),(6,'Pedro Souza','1234','ALUNO',0),(7,'Ana Costa','1234','ALUNO',0),(8,'João Oliveira','1234','ALUNO',0),(9,'Laura Pereira','1234','ALUNO',0),(10,'Gabriel Lima','1234','ALUNO',0),(11,'Júlia Gomes','1234','ALUNO',0),(12,'Carlos Rocha','1234','ALUNO',0),(13,'Fernanda Santos','1234','ALUNO',0),(14,'Bruno Almeida','1234','ALUNO',0),(15,'Mariana Melo','1234','ALUNO',0),(16,'Rafael Barbosa','1234','ALUNO',0),(17,'Beatriz Moreira','1234','ALUNO',0),(18,'Daniel Araújo','1234','ALUNO',0),(19,'Camila Ribeiro','1234','ALUNO',0),(20,'Felipe Martins','1234','ALUNO',0),(21,'Letícia Nascimento','1234','ALUNO',0),(22,'Thiago Correia','1234','ALUNO',0),(23,'Sofia Carvalho','1234','ALUNO',0);
UNLOCK TABLES;
