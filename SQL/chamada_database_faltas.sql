DROP TABLE IF EXISTS `faltas`;
CREATE TABLE `faltas` (
  `id_falta` int(11) NOT NULL DEFAULT 0,
  `id_ra` int(13) NOT NULL,
  `dt_falta` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;