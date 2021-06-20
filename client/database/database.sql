DROP DATABASE IF EXISTS `hypertask`;
CREATE SCHEMA `hypertask` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
USE `hypertask`;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `active` int NOT NULL DEFAULT '1',
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `info` text DEFAULT NULL,
  PRIMARY KEY (`id`)
);
CREATE TABLE `board` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `members` text NOT NULL,
  `lists` text NOT NULL,
  `labels` text NOT NULL,
  `info` text NOT NULL,
  PRIMARY KEY (`id`)
);