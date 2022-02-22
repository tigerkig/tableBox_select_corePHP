/*
SQLyog Community v13.1.7 (64 bit)
MySQL - 10.4.22-MariaDB : Database - viktoriia
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`viktoriia` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `viktoriia`;

/*Table structure for table `flag` */

DROP TABLE IF EXISTS `flag`;

CREATE TABLE `flag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `flag` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=211212 DEFAULT CHARSET=utf8;

/*Data for the table `flag` */

/*Table structure for table `logos` */

DROP TABLE IF EXISTS `logos`;

CREATE TABLE `logos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `url` varchar(100) NOT NULL,
  `top` int(11) NOT NULL,
  `left` int(11) NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `stPosX` int(11) NOT NULL,
  `stPosY` int(11) NOT NULL,
  `xlen` int(11) NOT NULL,
  `ylen` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;

/*Data for the table `logos` */

/* Procedure structure for procedure `load_foo_test_data` */

/*!50003 DROP PROCEDURE IF EXISTS  `load_foo_test_data` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `load_foo_test_data`()
begin
declare v_max int unsigned default 200000;
declare v_counter int unsigned default 0;
  truncate table flag;
  start transaction;
  while v_counter < v_max do
    insert into flag (flag) values ( 0 );
    set v_counter=v_counter+1;
  end while;
  commit;
end */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
