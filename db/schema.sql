DROP DATABASE IF EXISTS `employee_db`;
CREATE DATABASE IF NOT EXISTS `employee_db`;
USE `employee_db`;

CREATE TABLE `departments`(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(30) UNIQUE NOT NULL 
);

CREATE TABLE `roles`(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(30),
    `salary` DECIMAL,
    `departments_id` INT, 
    FOREIGN KEY (`departments_id`) REFERENCES `departments`(`id`)
);


CREATE TABLE `employees` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `first_name` VARCHAR(30),
    `last_name` VARCHAR(30),
    `role_id` INT,
    `manager_id` INT,
    FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`)
);