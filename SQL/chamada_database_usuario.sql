DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nm_usuario` varchar(45) NOT NULL,
  `senha_usuario` varchar(45) NOT NULL,
  `cargo_usuario` varchar(5) DEFAULT 'ALUNO',
  `imgPerfil` longblob DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

LOCK TABLES `usuario` WRITE;
INSERT INTO `usuario` VALUES (1,'Gustavo Rezende','81dc9bdb52d04dc20036dbd8313ed055','ADMIN',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(2,'Nycolas Guia','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(3,'Heitor Pedro','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(4,'Lucas Ferreira','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(5,'Maria Silva','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(6,'Pedro Souza','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(7,'Ana Costa','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(8,'João Oliveira','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(9,'Laura Pereira','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(10,'Gabriel Lima','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(11,'Júlia Gomes','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(12,'Carlos Rocha','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(13,'Fernanda Santos','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(14,'Bruno Almeida','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(15,'Mariana Melo','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(16,'Rafael Barbosa','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(17,'Beatriz Moreira','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(18,'Daniel Araújo','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(19,'Camila Ribeiro','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(20,'Felipe Martins','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(21,'Letícia Nascimento','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(22,'Thiago Correia','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(23,'Sofia Carvalho','81dc9bdb52d04dc20036dbd8313ed055','ALUNO',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(25,'Simone Maria','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(26,'Fernanda Larguesa','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(27,'Gilmar Aquino','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(28,'Alessandro Padin','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(29,'Miriam Vidal','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(30,'Aleksei Piterskih','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(31,'Sávio Mendes','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(32,'Sergiana Ramos','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(33,'Victor de Oliveira','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(34,'Maria Rita','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(35,'Fernanda de Mendonça','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(36,'Roseli Tonini','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(37,'Tatiana Schmitz','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(38,'Sandra de Oliveira','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(39,'Frederico Carbonari','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(40,'Eliana Josefa','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(41,'Norberto Luiz','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(42,'Luciana Nogueirol','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(43,'Rubens Cury','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(44,'Sonia Oliveira','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg'),(45,'Adauto Procópio','81dc9bdb52d04dc20036dbd8313ed055','PROF',_binary 'uploads/1726149312658-127124321-avatar.jpg');
UNLOCK TABLES;