DROP TABLE IF EXISTS `aluno`;
CREATE TABLE `aluno` (
  `id_ra` int(13) NOT NULL AUTO_INCREMENT,
  `nm_aluno` varchar(45) NOT NULL,
  PRIMARY KEY (`id_ra`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

LOCK TABLES `aluno` WRITE;
INSERT INTO `aluno` VALUES (1,'Lucas Ferreira'),(2,'Maria Silva'),(3,'Pedro Souza'),(4,'Ana Costa'),(5,'João Oliveira'),(6,'Laura Pereira'),(7,'Gabriel Lima'),(8,'Júlia Gomes'),(9,'Carlos Rocha'),(10,'Fernanda Santos'),(11,'Bruno Almeida'),(12,'Mariana Melo'),(13,'Rafael Barbosa'),(14,'Beatriz Moreira'),(15,'Daniel Araújo'),(16,'Camila Ribeiro'),(17,'Felipe Martins'),(18,'Letícia Nascimento'),(19,'Thiago Correia'),(20,'Sofia Carvalho'),(21,'Heitor Pedro');
UNLOCK TABLES;