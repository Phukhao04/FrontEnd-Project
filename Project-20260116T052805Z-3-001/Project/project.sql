-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 19, 2025 at 02:21 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project`
--

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `note` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `user_id`, `title`, `start_date`, `end_date`, `note`) VALUES
(2, 2, 'Fn', '2025-03-03', '2025-03-07', 'gg'),
(3, 4, 'Multi', '2025-03-03', '2025-03-15', 'ff'),
(33, 10, 'OS', '2025-03-03', '2025-03-10', 'dd'),
(34, 10, 'OS', '2025-03-03', '2025-03-04', 'dd'),
(35, 1, 'Homework', '2025-03-14', '2025-03-15', 'รีบ'),
(36, 1, 'FN', '2025-03-03', '2025-03-04', 'ss'),
(37, 1, 'op', '2025-03-04', '2025-03-04', 'y'),
(39, 1, 'Multi', '2025-03-04', '2025-03-25', 'ตัดคลิป'),
(46, 2, 'OS', '2025-03-04', '2025-03-05', 'dd'),
(47, 2, 'dd', '2025-03-07', '2025-03-06', 'dd'),
(48, 2, 'ff', '2025-03-14', '2025-03-05', 'ff'),
(49, 2, 'ff', '2025-03-07', '2025-03-06', 'ff'),
(50, 2, 'ff', '2025-03-06', '2025-03-07', 'ff'),
(62, 7, 'fwdw', '2025-03-06', '2025-03-06', ''),
(63, 7, 'dwdad', '2025-03-07', '2025-03-21', ''),
(64, 7, 'efrwf', '2025-03-07', '2025-03-18', ''),
(67, 1, 'การบ้าน', '2025-03-05', '2025-03-06', 'กี้ด'),
(69, 15, 'hfjfk', '2025-03-05', '2025-03-05', 'll'),
(73, 1, 'Network', '2025-02-28', '2025-03-07', 'ด่วน'),
(74, 16, 'Project', '2025-02-25', '2025-03-04', 'สู้ๆจ้ส'),
(75, 16, 'Final', '2025-03-08', '2025-03-17', 'ตุยแน่'),
(76, 16, 'Lab Network', '2025-02-28', '2025-03-06', 'จะส่งแล้ว');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(1, 'Milim', 'Milimnava48@gmail.com', '$2b$10$DdIHfZZdFxvXG82w6Jn0FOgPI1qonI9RtW2BWvRU.tkND427E2mLi'),
(2, 'charif', 'charif@gmail.com', '$2b$10$nVJXxjokMuyLfVX3gpi23.o217taFXB6K1YJoqO.zW1VQe85hMd2q'),
(3, 'ryu', 'ryu@gamil.com', '$2b$10$lQSqsXkc21jHsDnrZOUxOOvXy8FbmlJbUL1iZCTLrpKWy2aBTpm5G'),
(4, 'murnee', 'murnee@gmail.com', '$2b$10$NUHamOOFgBxKaEGbbS/bOug5bA8unABmwQ728CSwOqv6UqWDNzPFS'),
(5, 'Poommie', 'Poommie@gmail.com', '$2b$10$XmhrgLk7xq51urfTIwqYj.hO4gFsiPrnxCCQ0etvPHgvZDZLLdRlK'),
(6, 'nassy', 'nassy@gmail.com', '$2b$10$dXACK.Fnz0rHHS.tQLvqG.S7ADDweGMYhaReH04CmQEkGzQZ/y2nm'),
(7, 'nas', 'nas@gmail.com', '$2b$10$idO3BRBifH70MzmwAKhPbeU18sAmL1GjU1RalV8vCkTogI.9F5C4a'),
(10, 'Ball', 'charif.c@gmail.com', '$2b$10$I/xTjbO5x3Gee0UZOKP85u7dssXNOYz56rEzXXjexVWVIGnmsbD1q'),
(14, 'Poommy', 'poom@gmail.com', '$2b$10$BsZpz4f3MrOEoDBmYUPnD.RO/8JIj0tcfHt.A9HfLiyCDSX3f0r6e'),
(15, 'Weerachai', 'weerachai@gmail.com', '$2b$10$ks/mH8TIKhzQp2Iw3qCtM.wPzwNSBQQj0QLhAc/8NvuTDp6FJ3GqG'),
(16, 'Phukhao', 'Phukhao@gmail.com', '$2b$10$9sy.zr8xot3ULBk0ATjgiOgCfFeSHxPn0IPljURK1BD4gtHb7sRlu');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
