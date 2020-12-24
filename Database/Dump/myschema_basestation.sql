CREATE DATABASE  IF NOT EXISTS `myschema` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `myschema`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: myschema
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `basestation`
--

DROP TABLE IF EXISTS `basestation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `basestation` (
  `idBaseStation` int NOT NULL AUTO_INCREMENT,
  `BaseStationName` varchar(45) NOT NULL,
  `BaseStationLocation` point NOT NULL,
  `MAC` varchar(45) NOT NULL,
  `IpAddress` varchar(45) DEFAULT NULL,
  `HardwareVersion` varchar(45) DEFAULT NULL,
  `SoftwareVersion` varchar(45) DEFAULT NULL,
  `idTopCategory` int NOT NULL,
  PRIMARY KEY (`idBaseStation`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basestation`
--

LOCK TABLES `basestation` WRITE;
/*!40000 ALTER TABLE `basestation` DISABLE KEYS */;
INSERT INTO `basestation` VALUES (1,'Station 1',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0I@\0\0\0\0\0\0Y@','AABBCCDD11',NULL,NULL,NULL,2),(2,'Station 2',_binary '\0\0\0\0\0\0\0\0\0\0\0\0Äv@\0\0\0\0\00Å@','AABBCCDD22',NULL,NULL,NULL,2),(3,'Station 3',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0>@\0\0\0\0\00Å@','AABBCCDD33',NULL,NULL,NULL,2),(4,'Station 4',_binary '\0\0\0\0\0\0\0\0\0\0\0\0¿g@\0\0\0\0\00Å@','AABBCCDD44',NULL,NULL,NULL,2),(5,'Station 5',_binary '\0\0\0\0\0\0\0\0\0\0\0\0¿Ç@\0\0\0\0\00Å@','AABBCCDD55',NULL,NULL,NULL,2),(6,'Station 6',_binary '\0\0\0\0\0\0\0\0\0\0\0\0Äk@\0\0\0\0\0\‡u@','AABBCCDD66',NULL,NULL,NULL,2),(7,'Station 7',_binary '\0\0\0\0\0\0\0\0\0\0\0\0Äv@\0\0\0\0\0\‡u@','AABBCCDD77',NULL,NULL,NULL,2),(8,'Station 8',_binary '\0\0\0\0\0\0\0\0\0\0\0\0Äv@\0\0\0\0\0\0Y@','AABBCCDD88',NULL,NULL,NULL,2),(9,'Station 9',_binary '\0\0\0\0\0\0\0\0\0\0\0\00ã@\0\0\0\0\0Äf@','AABBCCDD99',NULL,NULL,NULL,2),(10,'Station 9',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0Y@\0\0\0\0\0\0Y@','AABBCCDD99',NULL,NULL,NULL,3),(11,'Station 10',_binary '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','AABBCCDD99',NULL,NULL,NULL,3);
/*!40000 ALTER TABLE `basestation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-24 22:31:45
