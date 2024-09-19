DROP TABLE IF EXISTS `disciplina`;
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

LOCK TABLES `disciplina` WRITE;
INSERT INTO `disciplina` VALUES 
(1,'Banco de Dados',4,1,'Simone Maria','Banco-de-Dados'),
(3,'Laboratorio de Banco de Dados',5,1,'Simone Maria','Laboratorio-de-Banco-de-Dados'),
(4,'Algoritmos',1,1,'Fernanda Larguesa','Algoritmos'),
(5,'Linguagem de Programacao',2,1,'Gilmar Aquino','Linguagem-de-Programacao'),
(6,'Comunicacao e Expressao',3,1,'Alessandro Padin','Comunicacao-e-Expressao'),
(7,'Etica',6,1,'Miriam Vidal','Etica'),
(8,'Fisica',1,2,'Aleksei Piterskih','Fisica'),
(9,'Calculo II',2,2,'Sávio Mendes','Calculo-II'),
(10,'Mecanica dos Fluidos',3,2,'Sergiana Ramos','Mecanica-dos-Fluidos'),
(11,'Mecanica dos Solidos',4,2,'Victor de Oliveira','Mecanica-dos-Solidos'),
(12,'Geologia e Mineralogia',5,2,'Maria Rita','Geologia-e-Mineralogia'),
(13,'Tratamento de Efluentes',6,2,'Fernanda de Mendonça','Tratamento-de-Efluentes'),
(14,'Administracao Geral',1,3,'Miriam Vidal','Administracao-Geral'),
(15,'Logistica Aplicada',3,3,'Roseli Tonini','Logistica-Aplicada'),
(16,'Legislacao Aduaneira',4,3,'Tatiana Schmitz','Legislacao-Aduaneira'),
(17,'Gestao Ambiental Portuaria',5,3,'Tatiana Schmitz','Gestao-Ambiental-Portuaria'),
(18,'Negocios Internacionais',6,3,'Sandra de Oliveira','Negocios-Internacionais-COMEX'),
(19,'Economia',2,3,'Frederico Carbonari','Economia-COMEX'),
(20,'Contabilidade',1,4,'Eliana Josefa','Contabilidade'),
(21,'Gestao de Marketing',3,4,'Norberto Luiz','Gestao-de-Marketing'),
(22,'Direito Empresarial',4,4,'Luciana Nogueirol','Direito-Empresarial'),
(23,'Analise de Investimentos',5,4,'Rubens Cury','Analise-de-Investimentos'),
(24,'Negocios Internacionais',6,4,'Sonia Oliveira','Negocios-Internacionais-GE'),
(25,'Economia',2,4,'Adauto Procópio','Economia-GE'),
(26,'Modelagem de Dados',1,5,'Simone Maria','Modelagem-de-Dados'),
(27,'Estrutura de Dados',2,5,'Fernanda Larguesa','Estrutura-de-Dados'),
(28,'Algebra Linear',3,5,'Sávio Mendes','Algebra-Linear'),
(29,'Estatistica Aplicada',4,5,'Sávio Mendes','Estatistica-Aplicada'),
(30,'Seguranca no Desenvolvimento de Aplicacoes',5,5,'Gilmar Aquino','Seguranca-no-Desenvolvimento-de-Aplicacoes'),
(31,'Etica Profissional e Patente',6,5,'Miriam Vidal','Etica-Profissional-e-Patente'),
(62,'TESTE',2,3,'Nycolas Guia','TESTE'),
(63,'tetste',2,4,'Nycolas Guia','tetste');
UNLOCK TABLES;
