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
