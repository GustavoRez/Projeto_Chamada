-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: chamada_database
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aluno`
--

DROP TABLE IF EXISTS `aluno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aluno` (
  `id_ra` int(13) NOT NULL AUTO_INCREMENT,
  `nm_aluno` varchar(45) NOT NULL,
  `qt_falta` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_ra`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aluno`
--

LOCK TABLES `aluno` WRITE;
/*!40000 ALTER TABLE `aluno` DISABLE KEYS */;
INSERT INTO `aluno` VALUES (1,'Lucas Ferreira',2),(2,'Maria Silva',0),(3,'Pedro Souza',0),(4,'Ana Costa',4),(5,'João Oliveira',2),(6,'Laura Pereira',10),(7,'Gabriel Lima',0),(8,'Júlia Gomes',4),(9,'Carlos Rocha',8),(10,'Fernanda Santos',0),(11,'Bruno Almeida',2),(12,'Mariana Melo',0),(13,'Rafael Barbosa',0),(14,'Beatriz Moreira',0),(15,'Daniel Araújo',2),(16,'Camila Ribeiro',1),(17,'Felipe Martins',4),(18,'Letícia Nascimento',0),(19,'Thiago Correia',8),(20,'Sofia Carvalho',2),(21,'Heitor Pedro',NULL);
/*!40000 ALTER TABLE `aluno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curso`
--

DROP TABLE IF EXISTS `curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curso` (
  `id_curso` int(11) NOT NULL AUTO_INCREMENT,
  `sg_curso` varchar(5) NOT NULL,
  `nm_curso` varchar(45) NOT NULL,
  `ds_curso` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id_curso`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curso`
--

LOCK TABLES `curso` WRITE;
/*!40000 ALTER TABLE `curso` DISABLE KEYS */;
INSERT INTO `curso` VALUES (1,'ADS','Análise e Desenvolvimento de Sistemas','Curso de Análise e Desenvolvimento de Sistemas. Voltado para análise e BackEnd.'),(2,'PQ','Processos Químicos','Curso de Química. Voltado para quem quer atuar na indústria petroquímica, eletroquímicaindústria petroquímica, eletroquímica, farmacêutica e de produç'),(3,'COMEX','Comércio Exterior','Curso de Comércio Exterior. Voltado para quem gerencia operações de comércio exterior, tais como: transações cambiais, despacho e legislação aduaneira'),(4,'GE','Gestão Empresarial','Curso de Gestão de Empresas. Voltado para quem quer atuar como gestor em empresas de pequeno à grande porte ou seu próprio negócio.'),(5,'DSM','Desenvolvimento de Software Multiplataforma','Curso de Desenvolvimento. Voltado para o desenvolvimento de novas tecnologias, como IOT, Mobile, Inteligência Artificial, Nuvem, entre outros.');
/*!40000 ALTER TABLE `curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `disciplina`
--

DROP TABLE IF EXISTS `disciplina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `disciplina`
--

LOCK TABLES `disciplina` WRITE;
/*!40000 ALTER TABLE `disciplina` DISABLE KEYS */;
INSERT INTO `disciplina`VALUES (4, 'Algorítmos', 1, 1, 'Fernanda Larguesa'),(5, 'Linguagem de Programação', 2, 1, 'Gilmar Aquino'),(6, 'Comunicação e Expressão', 3, 1, 'Alessandro Padin'), (1, 'Banco de Dados', 4, 1, 'Simone Maria'), (3, 'Laboratório de Banco de Dados', 5, 1, 'Simone Maria'), (7, 'Ética', 6, 1, 'Miriam Vidal'), (14, 'Administração Geral', 1, 3, 'Miriam Vidal'), (19, 'Economia', 2, 3, 'Frederico Carbonari'), (15, 'Logística Aplicada', 3, 3, 'Roseli Tonini'), (16, 'Legislação Aduaneira', 4, 3, 'Tatiana Schmitz'), (17, 'Gestão Ambiental Portuária', 5, 3, 'Tatiana Schmitz'), (18, 'Negócios Internacionais', 6, 3, 'Sandra de Oliveira'), (26, 'Modelagem de Dados', 1, 5, 'Simone Maria'), (27, 'Estrutura de Dados', 2, 5, 'Fernanda Larguesa'), (28, 'Álgebra Linear', 3, 5, 'Sávio Mendes'), (29, 'Estatística Aplicada', 4, 5, 'Sávio Mendes'), (30, 'Segurança no Desenvolvimento de Aplicações', 5, 5, 'Gilmar Aquino'), (31, 'Ética Profissional e Patente', 6, 5, 'Miriam Vidal'), (20, 'Contabilidade', 1, 4, 'Eliana Josefa'), (25, 'Economia', 2, 4, 'Adauto Procópio'), (21, 'Gestão de Marketing', 3, 4, 'Norberto Luiz'), (22, 'Direito Empresarial', 4, 4, 'Luciana Nogueirol'), (23, 'Análise de Investimentos', 5, 4, 'Rubens Cury'), (24, 'Negócios Internacionais', 6, 4, 'Sonia Oliveira'), (8, 'Física', 1, 2, 'Aleksei Piterskih'), (9, 'Cálculo II', 2, 2, 'Sávio Mendes'), (10, 'Mecânica dos Fluídos', 3, 2, 'Sergiana Ramos'), (11, 'Mecânica dos Sólidos', 4, 2, 'Victor de Oliveira'), ('12, Geologia e Mineralogia', 5, 2, 'Maria Rita'), (13, 'Tratamento de Efluentes', 6, 2, 'Fernanda de Mendonça');
/*!40000 ALTER TABLE `disciplina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nome_usuario` varchar(45) DEFAULT NULL,
  `senha_usuario` varchar(45) NOT NULL,
  `cargo_usuario` varchar(5) DEFAULT 'ALUNO',
  `isAdmin` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Gustavo Rezende','1234','ADMIN',1),(2,'Nycolas Guia','1234','PROF',0),(3,'Heitor Pedro','1234','ALUNO',0),(4,'Lucas Ferreira','1234','ALUNO',0),(5,'Maria Silva','1234','ALUNO',0),(6,'Pedro Souza','1234','ALUNO',0),(7,'Ana Costa','1234','ALUNO',0),(8,'João Oliveira','1234','ALUNO',0),(9,'Laura Pereira','1234','ALUNO',0),(10,'Gabriel Lima','1234','ALUNO',0),(11,'Júlia Gomes','1234','ALUNO',0),(12,'Carlos Rocha','1234','ALUNO',0),(13,'Fernanda Santos','1234','ALUNO',0),(14,'Bruno Almeida','1234','ALUNO',0),(15,'Mariana Melo','1234','ALUNO',0),(16,'Rafael Barbosa','1234','ALUNO',0),(17,'Beatriz Moreira','1234','ALUNO',0),(18,'Daniel Araújo','1234','ALUNO',0),(19,'Camila Ribeiro','1234','ALUNO',0),(20,'Felipe Martins','1234','ALUNO',0),(21,'Letícia Nascimento','1234','ALUNO',0),(22,'Thiago Correia','1234','ALUNO',0),(23,'Sofia Carvalho','1234','ALUNO',0);
UNLOCK TABLES;


--
-- Table structure for table `grade`
--

DROP TABLE IF EXISTS `grade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grade` (
  `id_matricula` int(11) PRIMARY KEY AUTO_INCREMENT,
  `id_ra` INTEGER(13) NOT NULL,
  `id_disciplina` INTEGER NOT NULL,
  CONSTRAINT `ra_aluno_FK` FOREIGN KEY (`id_ra`) REFERENCES `aluno` (`id_ra`),
  CONSTRAINT `id_disciplina_FK` FOREIGN KEY (`id_disciplina`) REFERENCES `disciplina` (`id_disciplina`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
