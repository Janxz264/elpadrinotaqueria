-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.17 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table elpadrino.articulo
CREATE TABLE IF NOT EXISTS `articulo` (
  `IDARTICULO` int(11) NOT NULL AUTO_INCREMENT,
  `IDCATEGORIA_ARTICULO` int(11) DEFAULT NULL,
  `NOMBRE` varchar(200) DEFAULT NULL,
  `PRECIO` double DEFAULT NULL,
  PRIMARY KEY (`IDARTICULO`),
  KEY `FK_ARTICULO_REFERENCE_CATEGORI` (`IDCATEGORIA_ARTICULO`),
  CONSTRAINT `FK_ARTICULO_REFERENCE_CATEGORI` FOREIGN KEY (`IDCATEGORIA_ARTICULO`) REFERENCES `categoria_articulo` (`IDCATEGORIA_ARTICULO`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table elpadrino.articulo: ~0 rows (approximately)
DELETE FROM `articulo`;
/*!40000 ALTER TABLE `articulo` DISABLE KEYS */;
/*!40000 ALTER TABLE `articulo` ENABLE KEYS */;

-- Dumping structure for table elpadrino.asistencia
CREATE TABLE IF NOT EXISTS `asistencia` (
  `IDASISTENCIA` int(11) NOT NULL AUTO_INCREMENT,
  `IDPERSONAS` int(11) DEFAULT NULL,
  `ASISTENCIA` bit(1) DEFAULT NULL,
  `FECHA` date DEFAULT NULL,
  PRIMARY KEY (`IDASISTENCIA`),
  KEY `FK_ASISTENC_REFERENCE_PERSONAS` (`IDPERSONAS`),
  CONSTRAINT `FK_ASISTENC_REFERENCE_PERSONAS` FOREIGN KEY (`IDPERSONAS`) REFERENCES `personas` (`IDPERSONAS`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table elpadrino.asistencia: ~0 rows (approximately)
DELETE FROM `asistencia`;
/*!40000 ALTER TABLE `asistencia` DISABLE KEYS */;
/*!40000 ALTER TABLE `asistencia` ENABLE KEYS */;

-- Dumping structure for table elpadrino.categoria_articulo
CREATE TABLE IF NOT EXISTS `categoria_articulo` (
  `IDCATEGORIA_ARTICULO` int(11) NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`IDCATEGORIA_ARTICULO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table elpadrino.categoria_articulo: ~0 rows (approximately)
DELETE FROM `categoria_articulo`;
/*!40000 ALTER TABLE `categoria_articulo` DISABLE KEYS */;
/*!40000 ALTER TABLE `categoria_articulo` ENABLE KEYS */;

-- Dumping structure for table elpadrino.categoria_producto
CREATE TABLE IF NOT EXISTS `categoria_producto` (
  `IDCATEGORIA_PRODUCTO` int(11) NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`IDCATEGORIA_PRODUCTO`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- Dumping data for table elpadrino.categoria_producto: ~13 rows (approximately)
DELETE FROM `categoria_producto`;
/*!40000 ALTER TABLE `categoria_producto` DISABLE KEYS */;
INSERT INTO `categoria_producto` (`IDCATEGORIA_PRODUCTO`, `NOMBRE`) VALUES
	(1, 'Tacos'),
	(2, 'Alambres'),
	(3, 'Gringas'),
	(4, 'Tortas'),
	(5, 'Sincronizadas'),
	(6, 'Papas preparadas'),
	(7, 'Costras de queso'),
	(8, 'PadriQueso'),
	(9, 'Volcanes'),
	(10, 'Quesos fundidos 200 grs.'),
	(11, 'Por kilo'),
	(12, 'Por ½  kilo'),
	(13, 'Refrescos');
/*!40000 ALTER TABLE `categoria_producto` ENABLE KEYS */;

-- Dumping structure for table elpadrino.gastos_servicios
CREATE TABLE IF NOT EXISTS `gastos_servicios` (
  `IDGASTOS_SERVICIOS` int(11) NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(170) DEFAULT NULL,
  `COSTO` double DEFAULT NULL,
  `FECHA` date DEFAULT NULL,
  PRIMARY KEY (`IDGASTOS_SERVICIOS`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table elpadrino.gastos_servicios: ~0 rows (approximately)
DELETE FROM `gastos_servicios`;
/*!40000 ALTER TABLE `gastos_servicios` DISABLE KEYS */;
/*!40000 ALTER TABLE `gastos_servicios` ENABLE KEYS */;

-- Dumping structure for table elpadrino.inventario
CREATE TABLE IF NOT EXISTS `inventario` (
  `IDINVENTARIO` int(11) NOT NULL AUTO_INCREMENT,
  `FECHA` date DEFAULT NULL,
  PRIMARY KEY (`IDINVENTARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table elpadrino.inventario: ~0 rows (approximately)
DELETE FROM `inventario`;
/*!40000 ALTER TABLE `inventario` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventario` ENABLE KEYS */;

-- Dumping structure for table elpadrino.inventario_articulo
CREATE TABLE IF NOT EXISTS `inventario_articulo` (
  `IDINVENTARIO` int(11) DEFAULT NULL,
  `IDARTICULO` int(11) DEFAULT NULL,
  `CANTIDAD` double DEFAULT NULL,
  KEY `FK_INVENTAR_REFERENCE_INVENTAR` (`IDINVENTARIO`),
  KEY `FK_INVENTAR_REFERENCE_ARTICULO` (`IDARTICULO`),
  CONSTRAINT `FK_INVENTAR_REFERENCE_ARTICULO` FOREIGN KEY (`IDARTICULO`) REFERENCES `articulo` (`IDARTICULO`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_INVENTAR_REFERENCE_INVENTAR` FOREIGN KEY (`IDINVENTARIO`) REFERENCES `inventario` (`IDINVENTARIO`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table elpadrino.inventario_articulo: ~0 rows (approximately)
DELETE FROM `inventario_articulo`;
/*!40000 ALTER TABLE `inventario_articulo` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventario_articulo` ENABLE KEYS */;

-- Dumping structure for table elpadrino.mensajes
CREATE TABLE IF NOT EXISTS `mensajes` (
  `IDMENSAJES` int(11) NOT NULL AUTO_INCREMENT,
  `IDUSUARIOS` int(11) DEFAULT NULL,
  `MENSAJE` text,
  `FECHA_HORA` datetime DEFAULT NULL,
  PRIMARY KEY (`IDMENSAJES`),
  KEY `FK_MENSAJES_REFERENCE_USUARIOS` (`IDUSUARIOS`),
  CONSTRAINT `FK_MENSAJES_REFERENCE_USUARIOS` FOREIGN KEY (`IDUSUARIOS`) REFERENCES `usuarios` (`IDUSUARIOS`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table elpadrino.mensajes: ~0 rows (approximately)
DELETE FROM `mensajes`;
/*!40000 ALTER TABLE `mensajes` DISABLE KEYS */;
/*!40000 ALTER TABLE `mensajes` ENABLE KEYS */;

-- Dumping structure for table elpadrino.notas
CREATE TABLE IF NOT EXISTS `notas` (
  `IDNOTAS` int(11) NOT NULL AUTO_INCREMENT,
  `FECHA` date DEFAULT NULL,
  `EFECTIVO` int(11) DEFAULT NULL,
  `TARJETA` int(11) DEFAULT NULL,
  PRIMARY KEY (`IDNOTAS`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table elpadrino.notas: ~0 rows (approximately)
DELETE FROM `notas`;
/*!40000 ALTER TABLE `notas` DISABLE KEYS */;
INSERT INTO `notas` (`IDNOTAS`, `FECHA`, `EFECTIVO`, `TARJETA`) VALUES
	(1, '2019-12-07', 424, 0),
	(2, '2019-12-01', 250, 0);
/*!40000 ALTER TABLE `notas` ENABLE KEYS */;

-- Dumping structure for table elpadrino.notas_productos
CREATE TABLE IF NOT EXISTS `notas_productos` (
  `IDNOTAS` int(11) DEFAULT NULL,
  `IDPRODUCTOS` int(11) DEFAULT NULL,
  `CANTIDAD` int(11) DEFAULT NULL,
  KEY `FK_NOTAS_PR_REFERENCE_NOTAS` (`IDNOTAS`),
  KEY `FK_NOTAS_PR_REFERENCE_PRODUCTO` (`IDPRODUCTOS`),
  CONSTRAINT `FK_NOTAS_PR_REFERENCE_NOTAS` FOREIGN KEY (`IDNOTAS`) REFERENCES `notas` (`IDNOTAS`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_NOTAS_PR_REFERENCE_PRODUCTO` FOREIGN KEY (`IDPRODUCTOS`) REFERENCES `productos` (`IDPRODUCTOS`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table elpadrino.notas_productos: ~0 rows (approximately)
DELETE FROM `notas_productos`;
/*!40000 ALTER TABLE `notas_productos` DISABLE KEYS */;
INSERT INTO `notas_productos` (`IDNOTAS`, `IDPRODUCTOS`, `CANTIDAD`) VALUES
	(1, 3, 4),
	(1, 4, 6),
	(2, 1, 6),
	(2, 6, 5),
	(2, 5, 2),
	(2, 2, 7);
/*!40000 ALTER TABLE `notas_productos` ENABLE KEYS */;

-- Dumping structure for table elpadrino.personas
CREATE TABLE IF NOT EXISTS `personas` (
  `IDPERSONAS` int(11) NOT NULL AUTO_INCREMENT,
  `IDSALARIOS` int(11) DEFAULT NULL,
  `NOMBRE` varchar(160) DEFAULT NULL,
  `FECHA_INGRESO` date DEFAULT NULL,
  `FECHA_EGRESO` date DEFAULT NULL,
  PRIMARY KEY (`IDPERSONAS`),
  KEY `FK_PERSONAS_REFERENCE_SALARIOS` (`IDSALARIOS`),
  CONSTRAINT `FK_PERSONAS_REFERENCE_SALARIOS` FOREIGN KEY (`IDSALARIOS`) REFERENCES `salarios` (`IDSALARIOS`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table elpadrino.personas: ~0 rows (approximately)
DELETE FROM `personas`;
/*!40000 ALTER TABLE `personas` DISABLE KEYS */;
/*!40000 ALTER TABLE `personas` ENABLE KEYS */;

-- Dumping structure for table elpadrino.prestamos
CREATE TABLE IF NOT EXISTS `prestamos` (
  `IDPRESTAMOS` int(11) NOT NULL AUTO_INCREMENT,
  `IDPERSONAS` int(11) DEFAULT NULL,
  `CANTIDAD` double DEFAULT NULL,
  `FECHA_PEDIDO` date DEFAULT NULL,
  `PAGADO` bit(1) DEFAULT NULL,
  `FECHA_PAGADO` date DEFAULT NULL,
  `ADELANTO` bit(1) DEFAULT NULL,
  PRIMARY KEY (`IDPRESTAMOS`),
  KEY `FK_PRESTAMO_REFERENCE_PERSONAS` (`IDPERSONAS`),
  CONSTRAINT `FK_PRESTAMO_REFERENCE_PERSONAS` FOREIGN KEY (`IDPERSONAS`) REFERENCES `personas` (`IDPERSONAS`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table elpadrino.prestamos: ~0 rows (approximately)
DELETE FROM `prestamos`;
/*!40000 ALTER TABLE `prestamos` DISABLE KEYS */;
/*!40000 ALTER TABLE `prestamos` ENABLE KEYS */;

-- Dumping structure for table elpadrino.productos
CREATE TABLE IF NOT EXISTS `productos` (
  `IDPRODUCTOS` int(11) NOT NULL AUTO_INCREMENT,
  `IDCATEGORIA_PRODUCTO` int(11) DEFAULT NULL,
  `NOMBRE` varchar(170) DEFAULT NULL,
  `PRECIO` double DEFAULT NULL,
  PRIMARY KEY (`IDPRODUCTOS`),
  KEY `FK_PRODUCTO_REFERENCE_CATEGORI` (`IDCATEGORIA_PRODUCTO`),
  CONSTRAINT `FK_PRODUCTO_REFERENCE_CATEGORI` FOREIGN KEY (`IDCATEGORIA_PRODUCTO`) REFERENCES `categoria_producto` (`IDCATEGORIA_PRODUCTO`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8;

-- Dumping data for table elpadrino.productos: ~144 rows (approximately)
DELETE FROM `productos`;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` (`IDPRODUCTOS`, `IDCATEGORIA_PRODUCTO`, `NOMBRE`, `PRECIO`) VALUES
	(1, 1, 'Pastor de maíz', 14),
	(2, 1, 'Pastor de harina', 18),
	(3, 1, 'Pastor de maíz c/queso', 19),
	(4, 1, 'Pastor de harina c/queso', 23),
	(5, 1, 'Sirloin de maíz', 18),
	(6, 1, 'Sirloin de harina', 22),
	(7, 1, 'Sirloin de maíz c/queso', 23),
	(8, 1, 'Sirloin de harina c/queso', 27),
	(9, 1, 'Arrachera de maíz', 18),
	(10, 1, 'Arrachera de harina', 22),
	(11, 1, 'Arrachera de maíz c/queso', 23),
	(12, 1, 'Arrachera de harina c/queso', 27),
	(13, 1, 'Bisteck de maíz', 18),
	(14, 1, 'Bisteck de harina', 22),
	(15, 1, 'Bisteck de maíz c/queso', 23),
	(16, 1, 'Bisteck de harina c/queso', 27),
	(17, 1, 'Champiñones de maíz', 14),
	(18, 1, 'Champiñones de harina', 18),
	(19, 1, 'Champiñones de maíz c/queso', 19),
	(20, 1, 'Champiñones de harina c/queso', 23),
	(21, 1, 'Chistorra de maíz', 18),
	(22, 1, 'Chistorra de harina', 22),
	(23, 1, 'Chistorra de maíz c/queso', 23),
	(24, 1, 'Chistorra de harina c/queso', 27),
	(25, 1, 'Chorizo argentino de maíz', 18),
	(26, 1, 'Chorizo argentino de harina', 22),
	(27, 1, 'Chorizo argentino de maíz c/queso', 23),
	(28, 1, 'Chorizo argentino de harina c/queso', 27),
	(29, 1, 'Picanha de maíz', 22),
	(30, 1, 'Picanha de harina', 26),
	(31, 1, 'Picanha de maíz c/queso', 27),
	(32, 1, 'Picanha de harina c/queso', 31),
	(33, 1, 'Fajitas de pollo de maíz', 14),
	(34, 1, 'Fajitas de pollo de harina', 18),
	(35, 1, 'Fajitas de pollo de maíz c/queso', 19),
	(36, 1, 'Fajitas de pollo de harina c/queso', 23),
	(37, 1, 'Combinados de maíz', 20),
	(38, 1, 'Combinados de harina', 25),
	(39, 1, 'Combinados de maíz c/queso', 25),
	(40, 1, 'Combinados de harina c/queso', 30),
	(41, 2, 'Pastor', 85),
	(42, 2, 'Sirloin', 100),
	(43, 2, 'Arrachera', 100),
	(44, 2, 'Bisteck', 85),
	(45, 2, 'Champiñones', 85),
	(46, 2, 'Chistorra', 100),
	(47, 2, 'Chorizo argentino', 100),
	(48, 2, 'Picanha', 120),
	(49, 2, 'Fajitas de pollo', 85),
	(50, 2, 'Combinados', 130),
	(51, 3, 'Pastor', 30),
	(52, 3, 'Sirloin', 35),
	(53, 3, 'Arrachera', 35),
	(54, 3, 'Bisteck', 30),
	(55, 3, 'Champiñones', 25),
	(56, 3, 'Chistorra', 35),
	(57, 3, 'Chorizo argentino', 35),
	(58, 3, 'Picanha', 40),
	(59, 3, 'Fajitas de pollo', 30),
	(60, 3, 'Combinados', 45),
	(61, 4, 'Pastor', 65),
	(62, 4, 'Sirloin', 75),
	(63, 4, 'Arrachera', 75),
	(64, 4, 'Bisteck', 65),
	(65, 4, 'Champiñones', 65),
	(66, 4, 'Chistorra', 75),
	(67, 4, 'Chorizo argentino', 75),
	(68, 4, 'Picanha', 85),
	(69, 4, 'Fajitas de pollo', 65),
	(70, 4, 'Combinados', 95),
	(71, 5, 'Pastor', 50),
	(72, 5, 'Sirloin', 60),
	(73, 5, 'Arrachera', 60),
	(74, 5, 'Bisteck', 60),
	(75, 5, 'Champiñones', 50),
	(76, 5, 'Chistorra', 60),
	(77, 5, 'Chorizo argentino', 60),
	(78, 5, 'Picanha', 75),
	(79, 5, 'Fajitas de pollo', 50),
	(80, 5, 'Combinados', 80),
	(81, 6, 'Pastor', 75),
	(82, 6, 'Sirloin', 85),
	(83, 6, 'Arrachera', 85),
	(84, 6, 'Bisteck', 80),
	(85, 6, 'Champiñones', 75),
	(86, 6, 'Chistorra', 85),
	(87, 6, 'Chorizo argentino', 85),
	(88, 6, 'Picanha', 95),
	(89, 6, 'Fajitas de pollo', 75),
	(90, 6, 'Combinados', 105),
	(91, 7, 'Pastor', 70),
	(92, 7, 'Sirloin', 80),
	(93, 7, 'Arrachera', 80),
	(94, 7, 'Bisteck', 70),
	(95, 7, 'Champiñones', 70),
	(96, 7, 'Chistorra', 80),
	(97, 7, 'Chorizo argentino', 80),
	(98, 7, 'Picanha', 90),
	(99, 7, 'Fajitas de pollo', 80),
	(100, 8, 'Natural', 95),
	(101, 8, 'Con pastor', 105),
	(102, 8, 'Con sirloin', 115),
	(103, 8, 'Con arrachera', 115),
	(104, 8, 'Con champiñones', 105),
	(105, 8, 'Con chistorra', 115),
	(106, 8, 'Con chorizo argentino', 115),
	(107, 8, 'Con picanha', 125),
	(108, 8, 'Con fajitas de pollo', 105),
	(109, 9, 'Pastor', 45),
	(110, 9, 'Sirloin', 50),
	(111, 9, 'Arrachera', 50),
	(112, 9, 'Bisteck', 45),
	(113, 9, 'Champiñones', 45),
	(114, 9, 'Chistorra', 50),
	(115, 9, 'Chorizo argentino', 50),
	(116, 9, 'Picanha', 65),
	(117, 9, 'Fajitas de pollo', 45),
	(118, 10, 'Natural', 40),
	(119, 10, 'Pastor', 70),
	(120, 10, 'Sirloin', 90),
	(121, 10, 'Arrachera', 90),
	(122, 10, 'Bisteck', 80),
	(123, 10, 'Champiñones', 70),
	(124, 10, 'Chistorra', 80),
	(125, 10, 'Chorizo argentino', 80),
	(126, 10, 'Picanha', 110),
	(127, 11, 'Pastor', 240),
	(128, 11, 'Sirloin', 320),
	(129, 11, 'Arrachera', 350),
	(130, 11, 'Bisteck', 300),
	(131, 11, 'Chistorra', 320),
	(132, 11, 'Chorizo argentino', 320),
	(133, 11, 'Picanha', 400),
	(134, 11, 'Fajitas de pollo', 280),
	(135, 12, 'Pastor', 130),
	(136, 12, 'Sirloin', 170),
	(137, 12, 'Arrachera', 190),
	(138, 12, 'Bisteck', 170),
	(139, 12, 'Chistorra', 170),
	(140, 12, 'Chorizo argentino', 170),
	(141, 12, 'Picanha', 200),
	(142, 12, 'Fajitas de pollo', 150),
	(143, 13, 'Refrescos de gas / Fuze tea', 16),
	(144, 13, 'Aguas naturales', 12);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;

-- Dumping structure for table elpadrino.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `IDROLES` int(11) NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`IDROLES`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table elpadrino.roles: ~2 rows (approximately)
DELETE FROM `roles`;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` (`IDROLES`, `NOMBRE`) VALUES
	(1, 'Administrador'),
	(2, 'Mesero');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;

-- Dumping structure for table elpadrino.salarios
CREATE TABLE IF NOT EXISTS `salarios` (
  `IDSALARIOS` int(11) NOT NULL AUTO_INCREMENT,
  `SALARIO` double DEFAULT NULL,
  PRIMARY KEY (`IDSALARIOS`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table elpadrino.salarios: ~0 rows (approximately)
DELETE FROM `salarios`;
/*!40000 ALTER TABLE `salarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `salarios` ENABLE KEYS */;

-- Dumping structure for table elpadrino.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `IDUSUARIOS` int(11) NOT NULL AUTO_INCREMENT,
  `IDROLES` int(11) DEFAULT NULL,
  `USERNAME` varchar(100) DEFAULT NULL,
  `PASSWORD` varchar(300) DEFAULT NULL,
  `EMAIL` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`IDUSUARIOS`),
  KEY `FK_USUARIOS_REFERENCE_ROLES` (`IDROLES`),
  CONSTRAINT `FK_USUARIOS_REFERENCE_ROLES` FOREIGN KEY (`IDROLES`) REFERENCES `roles` (`IDROLES`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Dumping data for table elpadrino.usuarios: ~3 rows (approximately)
DELETE FROM `usuarios`;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`IDUSUARIOS`, `IDROLES`, `USERNAME`, `PASSWORD`, `EMAIL`) VALUES
	(1, 1, 'german', '$2y$12$JzbpB9kIZ2NS8yWGZzn60uqSm6xiLbEveY2XDYtI1U/XiMpt/My8y', 'lgdiazm96@gmail.com'),
	(2, 1, 'fernando', '$2y$12$Tez00BaG12HYiaZ0se/7PeYtoI4.ixzFFQXLylt417wqpjCHm3JRe', NULL),
	(3, 1, 'kath', '$2y$12$Tez00BaG12HYiaZ0se/7PeYtoI4.ixzFFQXLylt417wqpjCHm3JRe', 'kath.pr.1609@gmail.com');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
