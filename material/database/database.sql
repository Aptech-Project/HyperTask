DROP DATABASE IF EXISTS `hypertask`;
CREATE SCHEMA `hypertask` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
USE `hypertask`;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `contact` text DEFAULT NULL,
  `info` text DEFAULT NULL,
  PRIMARY KEY (`id`)
);
CREATE TABLE `board` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `members` text NOT NULL,
  `lists` text NOT NULL,
  `activities` text NOT NULL,
  `labels` text NOT NULL,
  `info` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
);