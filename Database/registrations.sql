-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 30, 2025 at 10:20 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `course_registration`
--

-- --------------------------------------------------------

--
-- Table structure for table `registrations`
--

CREATE TABLE `registrations` (
  `id` int(11) NOT NULL,
  `course` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `age` int(11) NOT NULL,
  `education` varchar(255) NOT NULL,
  `mobile` varchar(10) NOT NULL,
  `whatsapp` varchar(10) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `followup_date` datetime DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `registrations`
--

INSERT INTO `registrations` (`id`, `course`, `name`, `age`, `education`, `mobile`, `whatsapp`, `email`, `city`, `state`, `status`, `followup_date`, `notes`, `created_at`) VALUES
(1, 'Python Programming', 'John Doe', 25, 'Bachelor\'s Degree', '9876543210', '9876543210', 'john.doe@example.com', 'New York', 'NY', NULL, NULL, NULL, '2023-01-15 10:20:30'),
(2, 'Machine Learning', 'Jane Smith', 29, 'Bachelor\'s Degree', '9920827507', NULL, 'jane.smith@example.com', 'Houston', 'TX', NULL, NULL, NULL, '2023-06-08 09:32:57'),
(3, 'Mobile App Development', 'Alice Johnson', 50, 'Diploma', '7328723802', NULL, 'alice.johnson@example.com', 'Houston', 'IL', NULL, NULL, NULL, '2023-11-04 13:56:56'),
(4, 'Machine Learning', 'Bob Brown', 23, 'Professional Certificate', '9729696562', '9729696562', 'bob.brown@example.com', 'San Antonio', 'AZ', NULL, NULL, NULL, '2023-11-22 22:00:33'),
(5, 'Data Science', 'Charlie Davis', 34, 'Master\'s Degree', '9812765432', '9812765432', 'charlie.davis@example.com', 'Dallas', 'TX', NULL, NULL, NULL, '2024-02-10 14:15:25'),
(6, 'Web Development', 'Diana Prince', 27, 'Bachelor\'s Degree', '9444556677', '9444556677', 'diana.prince@example.com', 'San Diego', 'CA', NULL, NULL, NULL, '2023-12-05 18:45:11'),
(7, 'Cybersecurity', 'Evan Turner', 31, 'Bachelor\'s Degree', '9567823412', NULL, 'evan.turner@example.com', 'Austin', 'TX', NULL, NULL, NULL, '2023-10-20 12:30:00'),
(8, 'Blockchain', 'Fiona Green', 28, 'Diploma', '9988776655', '9988776655', 'fiona.green@example.com', 'Miami', 'FL', NULL, NULL, NULL, '2024-01-18 16:00:00'),
(9, 'AI & Robotics', 'George Hall', 26, 'Bachelor\'s Degree', '9345678123', NULL, 'george.hall@example.com', 'Seattle', 'WA', NULL, NULL, NULL, '2023-07-30 11:22:10'),
(10, 'Cloud Computing', 'Hannah Lee', 29, 'Master\'s Degree', '9223344556', '9223344556', 'hannah.lee@example.com', 'Boston', 'MA', NULL, NULL, NULL, '2023-05-12 09:18:45'),
(11, 'Python Programming', 'Isaac Newton', 40, 'PhD', '9001234567', '9001234567', 'isaac.newton@example.com', 'San Francisco', 'CA', NULL, NULL, NULL, '2024-03-11 10:00:00'),
(12, 'Data Science', 'Jessica Alba', 33, 'Bachelor\'s Degree', '9678452310', NULL, 'jessica.alba@example.com', 'Denver', 'CO', NULL, NULL, NULL, '2023-09-17 14:40:30'),
(13, 'Web Development', 'Kevin Hart', 30, 'Diploma', '9456123789', '9456123789', 'kevin.hart@example.com', 'Chicago', 'IL', NULL, NULL, NULL, '2023-04-25 08:55:50'),
(14, 'Cybersecurity', 'Laura Wilson', 35, 'Master\'s Degree', '9778899001', NULL, 'laura.wilson@example.com', 'Atlanta', 'GA', NULL, NULL, NULL, '2023-06-15 15:45:25'),
(15, 'Blockchain', 'Michael Scott', 45, 'Bachelor\'s Degree', '9887766554', '9887766554', 'michael.scott@example.com', 'Philadelphia', 'PA', NULL, NULL, NULL, '2023-08-10 13:20:00'),
(16, 'AI & Robotics', 'Natalie Portman', 29, 'Master\'s Degree', '9765432109', NULL, 'natalie.portman@example.com', 'Orlando', 'FL', NULL, NULL, NULL, '2024-02-28 17:00:10'),
(17, 'Cloud Computing', 'Oscar Wilde', 38, 'Bachelor\'s Degree', '9123456789', '9123456789', 'oscar.wilde@example.com', 'Portland', 'OR', NULL, NULL, NULL, '2023-11-01 09:05:05'),
(18, 'Python Programming', 'Patricia Clarkson', 27, 'Professional Certificate', '9345987123', NULL, 'patricia.clarkson@example.com', 'Sacramento', 'CA', NULL, NULL, NULL, '2023-03-22 11:10:10'),
(19, 'Data Science', 'Quentin Tarantino', 42, 'Master\'s Degree', '9567123489', '9567123489', 'quentin.tarantino@example.com', 'Las Vegas', 'NV', NULL, NULL, NULL, '2023-07-19 16:30:00'),
(20, 'Web Development', 'Rachel Green', 26, 'Bachelor\'s Degree', '9223344567', NULL, 'rachel.green@example.com', 'Phoenix', 'AZ', NULL, NULL, NULL, '2023-12-20 18:40:45'),
(21, 'Cybersecurity', 'Sam Wilson', 31, 'Diploma', '9876541230', '9876541230', 'sam.wilson@example.com', 'Minneapolis', 'MN', NULL, NULL, NULL, '2023-01-14 08:55:30'),
(22, 'Blockchain', 'Tina Fey', 35, 'Bachelor\'s Degree', '9678123456', NULL, 'tina.fey@example.com', 'Columbus', 'OH', NULL, NULL, NULL, '2023-09-30 14:15:15'),
(23, 'AI & Robotics', 'Uma Thurman', 29, 'Master\'s Degree', '9786543210', '9786543210', 'uma.thurman@example.com', 'Detroit', 'MI', NULL, NULL, NULL, '2023-04-16 10:05:25'),
(24, 'Cloud Computing', 'Victor Hugo', 37, 'PhD', '9123789456', NULL, 'victor.hugo@example.com', 'Charlotte', 'NC', NULL, NULL, NULL, '2023-08-22 13:30:00'),
(25, 'Python Programming', 'Wendy Adams', 28, 'Bachelor\'s Degree', '9345126789', '9345126789', 'wendy.adams@example.com', 'Memphis', 'TN', NULL, NULL, NULL, '2024-01-05 09:45:50'),
(26, 'Data Science', 'Xavier Woods', 32, 'Master\'s Degree', '9556677889', NULL, 'xavier.woods@example.com', 'Baltimore', 'MD', NULL, NULL, NULL, '2023-10-18 17:10:05'),
(27, 'Web Development', 'Yvonne Strahovski', 30, 'Bachelor\'s Degree', '9876543211', '9876543211', 'yvonne.strahovski@example.com', 'Milwaukee', 'WI', NULL, NULL, NULL, '2023-06-07 12:15:15'),
(28, 'Cybersecurity', 'Zachary Levi', 33, 'Diploma', '9781234567', NULL, 'zachary.levi@example.com', 'Albuquerque', 'NM', NULL, NULL, NULL, '2023-07-13 08:25:30'),
(29, 'Blockchain', 'Aaron Paul', 36, 'Bachelor\'s Degree', '9123459876', '9123459876', 'aaron.paul@example.com', 'Tucson', 'AZ', NULL, NULL, NULL, '2023-03-29 15:40:10'),
(30, 'AI & Robotics', 'Bethany Joy', 29, 'Professional Certificate', '9876123450', NULL, 'bethany.joy@example.com', 'Fresno', 'CA', NULL, NULL, NULL, '2023-11-06 11:05:00'),
(31, 'Cloud Computing', 'Carl Edwards', 41, 'Master\'s Degree', '9761234890', '9761234890', 'carl.edwards@example.com', 'Sacramento', 'CA', 'Future follow up', '2025-05-30 00:00:00', '', '2023-05-23 14:20:25'),
(32, 'Python Programming', 'Dana Scully', 34, 'Bachelor\'s Degree', '9345678912', NULL, 'dana.scully@example.com', 'Oakland', 'CA', NULL, NULL, NULL, '2023-09-02 10:45:55'),
(33, 'Data Science', 'Ethan Hunt', 38, 'Master\'s Degree', '9123987456', '9123987456', 'ethan.hunt@example.com', 'Tulsa', 'OK', NULL, NULL, NULL, '2023-12-11 16:35:40'),
(34, 'Web Development', 'Felicity Jones', 27, 'Diploma', '9876541235', NULL, 'felicity.jones@example.com', 'Wichita', 'KS', NULL, NULL, NULL, '2023-08-27 09:25:15'),
(35, 'Cybersecurity', 'Gordon Freeman', 30, 'Bachelor\'s Degree', '9765432198', '9765432198', 'gordon.freeman@example.com', 'New Orleans', 'LA', NULL, NULL, NULL, '2023-04-12 11:50:05'),
(36, 'Blockchain', 'Holly Marie', 33, 'Master\'s Degree', '9345123678', NULL, 'holly.marie@example.com', 'Arlington', 'TX', NULL, NULL, NULL, '2023-06-18 15:55:25'),
(37, 'AI & Robotics', 'Ian Somerhalder', 31, 'Bachelor\'s Degree', '9871234560', '9871234560', 'ian.somerhalder@example.com', 'Bakersfield', 'CA', NULL, NULL, NULL, '2024-02-04 13:40:00'),
(38, 'Cloud Computing', 'Jenna Fischer', 29, 'Diploma', '9761982345', NULL, 'jenna.fischer@example.com', 'Aurora', 'CO', NULL, NULL, NULL, '2023-07-07 10:05:30'),
(39, 'Python Programming', 'Kyle Chandler', 35, 'Bachelor\'s Degree', '9123456781', '9123456781', 'kyle.chandler@example.com', 'Anaheim', 'CA', NULL, NULL, NULL, '2023-11-14 17:15:45'),
(40, 'Data Science', 'Laura Prepon', 28, 'Master\'s Degree', '9876543290', NULL, 'laura.prepon@example.com', 'Santa Ana', 'CA', NULL, NULL, NULL, '2023-05-05 12:20:30'),
(41, 'Web Development', 'Mark Ruffalo', 37, 'Bachelor\'s Degree', '9345123098', '9345123098', 'mark.ruffalo@example.com', 'Riverside', 'CA', NULL, NULL, NULL, '2023-09-28 08:30:10'),
(42, 'Cybersecurity', 'Natalie Dormer', 32, 'Diploma', '9123987564', NULL, 'natalie.dormer@example.com', 'Corpus Christi', 'TX', NULL, NULL, NULL, '2023-06-21 14:50:00'),
(43, 'Blockchain', 'Oliver Queen', 39, 'Master\'s Degree', '9876543212', '9876543212', 'oliver.queen@example.com', 'Lexington', 'KY', NULL, NULL, NULL, '2023-10-30 16:40:25'),
(44, 'AI & Robotics', 'Penelope Cruz', 28, 'Bachelor\'s Degree', '9765432190', NULL, 'penelope.cruz@example.com', 'Stockton', 'CA', NULL, NULL, NULL, '2024-01-17 10:15:50'),
(45, 'Cloud Computing', 'Quincy Jones', 41, 'Master\'s Degree', '9345678901', '9345678901', 'quincy.jones@example.com', 'St. Paul', 'MN', NULL, NULL, NULL, '2023-04-03 11:05:35'),
(46, 'Python Programming', 'Rachel McAdams', 27, 'Diploma', '9123459870', NULL, 'rachel.mcadams@example.com', 'Cincinnati', 'OH', NULL, NULL, NULL, '2023-08-29 15:20:00'),
(47, 'Data Science', 'Samuel L. Jackson', 50, 'Bachelor\'s Degree', '9876543213', '9876543213', 'samuel.jackson@example.com', 'Greensboro', 'NC', NULL, NULL, NULL, '2023-02-14 12:40:15'),
(48, 'Web Development', 'Tina Turner', 36, 'Master\'s Degree', '9345123789', NULL, 'tina.turner@example.com', 'Plano', 'TX', NULL, NULL, NULL, '2023-11-19 09:10:20'),
(49, 'Cybersecurity', 'Ulysses Grant', 44, 'Bachelor\'s Degree', '9123456782', '9123456782', 'ulysses.grant@example.com', 'Lincoln', 'NE', NULL, NULL, NULL, '2023-07-01 14:25:40'),
(50, 'Blockchain', 'Victoria Beckham', 31, 'Diploma', '9876543291', NULL, 'victoria.beckham@example.com', 'Orlando', 'FL', NULL, NULL, NULL, '2023-10-07 17:55:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `registrations`
--
ALTER TABLE `registrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `registrations`
--
ALTER TABLE `registrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
