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
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nm_usuario` varchar(45) NOT NULL,
  `senha_usuario` varchar(45) NOT NULL,
  `cargo_usuario` varchar(5) DEFAULT 'ALUNO',
  `imgPerfil` longblob DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Gustavo Rezende','81dc9bdb52d04dc20036dbd8313ed055','ADMIN',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(2,'Nycolas Guia','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(3,'Heitor Pedro','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(4,'Lucas Ferreira','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(5,'Maria Silva','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(6,'Pedro Souza','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(7,'Ana Costa','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(8,'João Oliveira','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(9,'Laura Pereira','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(10,'Gabriel Lima','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(11,'Júlia Gomes','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(12,'Carlos Rocha','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(13,'Fernanda Santos','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(14,'Bruno Almeida','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(15,'Mariana Melo','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(16,'Rafael Barbosa','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(17,'Beatriz Moreira','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(18,'Daniel Araújo','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(19,'Camila Ribeiro','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(20,'Felipe Martins','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(21,'Letícia Nascimento','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(22,'Thiago Correia','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(23,'Sofia Carvalho','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(25,'Simone Maria','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(26,'Fernanda Larguesa','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(27,'Gilmar Aquino','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(28,'Alessandro Padin','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(29,'Miriam Vidal','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(30,'Aleksei Piterskih','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(31,'Sávio Mendes','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(32,'Sergiana Ramos','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(33,'Victor de Oliveira','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(34,'Maria Rita','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(35,'Fernanda de Mendonça','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(36,'Roseli Tonini','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(37,'Tatiana Schmitz','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(38,'Sandra de Oliveira','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(39,'Frederico Carbonari','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(40,'Eliana Josefa','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(41,'Norberto Luiz','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(42,'Luciana Nogueirol','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(43,'Rubens Cury','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(44,'Sonia Oliveira','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(45,'Adauto Procópio','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-19 13:45:05
