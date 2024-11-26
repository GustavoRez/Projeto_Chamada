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
  `nm_professor` varchar(45) NOT NULL DEFAULT 'Nilson Silva',
  `url_disciplina` varchar(45) NOT NULL,
  PRIMARY KEY (`id_disciplina`),
  KEY `id_curso` (`id_curso`),
  CONSTRAINT `disciplina_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id_curso`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `disciplina`
--

LOCK TABLES `disciplina` WRITE;
/*!40000 ALTER TABLE `disciplina` DISABLE KEYS */;
INSERT INTO `disciplina` VALUES (1,'Banco de Dados',4,1,'Simone Maria','Banco-de-Dados'),(3,'Laboratorio de Banco de Dados',5,1,'Simone Maria','Laboratorio-de-Banco-de-Dados'),(4,'Algoritmos',1,1,'Fernanda Larguesa','Algoritmos'),(5,'Linguagem de Programacao',2,1,'Gilmar Aquino','Linguagem-de-Programacao'),(6,'Comunicacao e Expressao',3,1,'Alessandro Padin','Comunicacao-e-Expressao'),(7,'Etica',6,1,'Miriam Vidal','Etica'),(8,'Fisica',1,2,'Aleksei Piterskih','Fisica'),(9,'Calculo II',2,2,'Sávio Mendes','Calculo-II'),(10,'Mecanica dos Fluidos',3,2,'Sergiana Ramos','Mecanica-dos-Fluidos'),(11,'Mecanica dos Solidos',4,2,'Victor de Oliveira','Mecanica-dos-Solidos'),(12,'Geologia e Mineralogia',5,2,'Maria Rita','Geologia-e-Mineralogia'),(13,'Tratamento de Efluentes',6,2,'Fernanda de Mendonça','Tratamento-de-Efluentes'),(14,'Administracao Geral',1,3,'Miriam Vidal','Administracao-Geral'),(15,'Logistica Aplicada',3,3,'Roseli Tonini','Logistica-Aplicada'),(16,'Legislacao Aduaneira',4,3,'Tatiana Schmitz','Legislacao-Aduaneira'),(17,'Gestao Ambiental Portuaria',5,3,'Tatiana Schmitz','Gestao-Ambiental-Portuaria'),(18,'Negocios Internacionais',6,3,'Sandra de Oliveira','Negocios-Internacionais-COMEX'),(19,'Economia',2,3,'Frederico Carbonari','Economia-COMEX'),(20,'Contabilidade',1,4,'Eliana Josefa','Contabilidade'),(21,'Gestao de Marketing',3,4,'Norberto Luiz','Gestao-de-Marketing'),(22,'Direito Empresarial',4,4,'Luciana Nogueirol','Direito-Empresarial'),(23,'Analise de Investimentos',5,4,'Rubens Cury','Analise-de-Investimentos'),(24,'Negocios Internacionais',6,4,'Sonia Oliveira','Negocios-Internacionais-GE'),(25,'Economia',2,4,'Adauto Procópio','Economia-GE'),(26,'Modelagem de Dados',1,5,'Simone Maria','Modelagem-de-Dados'),(27,'Estrutura de Dados',2,5,'Fernanda Larguesa','Estrutura-de-Dados'),(28,'Algebra Linear',3,5,'Sávio Mendes','Algebra-Linear'),(29,'Estatistica Aplicada',4,5,'Sávio Mendes','Estatistica-Aplicada'),(30,'Seguranca no Desenvolvimento de Aplicacoes',5,5,'Gilmar Aquino','Seguranca-no-Desenvolvimento-de-Aplicacoes'),(31,'Etica Profissional e Patente',6,5,'Miriam Vidal','Etica-Profissional-e-Patente'),(62,'TESTE',2,3,'Nycolas Guia','TESTE'),(63,'tetste',2,4,'Nycolas Guia','tetste');
/*!40000 ALTER TABLE `disciplina` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-26 10:24:22
