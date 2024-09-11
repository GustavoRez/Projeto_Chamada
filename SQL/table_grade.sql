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
-- Table structure for table `grade`
--

DROP TABLE IF EXISTS `grade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grade` (
  `id_matricula` int(11) NOT NULL AUTO_INCREMENT,
  `id_ra` int(13) NOT NULL,
  `id_disciplina` int(11) NOT NULL,
  `qt_falta` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_matricula`),
  KEY `id_ra` (`id_ra`),
  KEY `id_disciplina` (`id_disciplina`),
  CONSTRAINT `grade_ibfk_1` FOREIGN KEY (`id_ra`) REFERENCES `aluno` (`id_ra`),
  CONSTRAINT `grade_ibfk_2` FOREIGN KEY (`id_disciplina`) REFERENCES `disciplina` (`id_disciplina`)
) ENGINE=InnoDB AUTO_INCREMENT=252 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grade`
--

LOCK TABLES `grade` WRITE;
/*!40000 ALTER TABLE `grade` DISABLE KEYS */;
INSERT INTO `grade` VALUES (1,1,1,0),(2,1,3,0),(3,1,4,0),(4,1,5,0),(5,1,6,0),(6,1,7,0),(7,2,1,0),(8,2,3,0),(9,2,4,0),(10,2,5,0),(11,2,6,0),(12,2,7,0),(13,3,1,0),(14,3,3,0),(15,3,4,0),(16,3,5,0),(17,3,6,0),(18,3,7,0),(19,4,1,0),(20,4,3,0),(21,4,4,0),(22,4,5,0),(23,4,6,0),(24,4,7,0),(25,5,1,0),(26,5,3,0),(27,5,4,0),(28,5,5,0),(29,5,6,0),(30,5,7,0),(125,6,20,0),(126,6,21,0),(127,6,22,0),(128,6,23,0),(129,6,24,0),(130,6,25,0),(131,7,20,0),(132,7,21,0),(133,7,22,0),(134,7,23,0),(135,7,24,0),(136,7,25,0),(137,8,20,0),(138,8,21,0),(139,8,22,0),(140,8,23,0),(141,8,24,0),(142,8,25,0),(143,9,20,0),(144,9,21,0),(145,9,22,0),(146,9,23,0),(147,9,24,0),(148,9,25,0),(156,10,8,0),(157,10,9,0),(158,10,10,0),(159,10,11,0),(160,10,12,0),(161,10,13,0),(162,11,8,0),(163,11,9,0),(164,11,10,0),(165,11,11,0),(166,11,12,0),(167,11,13,0),(168,12,8,0),(169,12,9,0),(170,12,10,0),(171,12,11,0),(172,12,12,0),(173,12,13,0),(174,13,8,0),(175,13,9,0),(176,13,10,0),(177,13,11,0),(178,13,12,0),(179,13,13,0),(187,14,14,0),(188,14,15,0),(189,14,16,0),(190,14,17,0),(191,14,18,0),(192,14,19,0),(193,15,14,0),(194,15,15,0),(195,15,16,0),(196,15,17,0),(197,15,18,0),(198,15,19,0),(199,16,14,0),(200,16,15,0),(201,16,16,0),(202,16,17,0),(203,16,18,0),(204,16,19,0),(205,17,14,0),(206,17,15,0),(207,17,16,0),(208,17,17,0),(209,17,18,0),(210,17,19,0),(218,18,26,0),(219,18,27,0),(220,18,28,0),(221,18,29,0),(222,18,30,0),(223,18,31,0),(224,19,26,0),(225,19,27,0),(226,19,28,0),(227,19,29,0),(228,19,30,0),(229,19,31,0),(230,20,26,0),(231,20,27,0),(232,20,28,0),(233,20,29,0),(234,20,30,0),(235,20,31,0),(236,21,26,0),(237,21,27,0),(238,21,28,0),(239,21,29,0),(240,21,30,0),(241,21,31,0);
/*!40000 ALTER TABLE `grade` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-11  8:43:55
