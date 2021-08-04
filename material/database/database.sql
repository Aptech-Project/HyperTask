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
  `conversations` text DEFAULT NULL,
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
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);
CREATE TABLE `chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dialog` text NOT NULL,
  PRIMARY KEY (`id`)
);

-- insert into board(name, members, lists, activities, labels, info) values ('board1', 'test', 'board1', 'test','board1', 'test');
-- UPDATE board set name = "test update" where id = 1;