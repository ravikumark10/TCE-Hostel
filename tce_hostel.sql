-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 20, 2021 at 04:49 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tce_hostel`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`email`, `password`) VALUES
('admin@gmail.com', 'Admin@123');

-- --------------------------------------------------------

--
-- Table structure for table `mess`
--

CREATE TABLE `mess` (
  `sno` int(11) NOT NULL,
  `day` varchar(30) NOT NULL,
  `breakfast` varchar(100) NOT NULL,
  `lunch` varchar(100) NOT NULL,
  `dinner` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mess`
--

INSERT INTO `mess` (`sno`, `day`, `breakfast`, `lunch`, `dinner`) VALUES
(1, 'monday', 'Onion Dosa', 'Sambar', 'Idli'),
(2, 'Tuesday', 'Poori', 'Curd Rice', 'Chappathi'),
(3, 'Wednesday', 'Idli', 'Mushroom Briyani', 'Dosa'),
(4, 'Thursday', 'Pongal', 'Vegetable Rice', 'Parotta'),
(5, 'Friday', 'Chappathi', 'Fried Rice', 'Masal Dosa'),
(6, 'Saturday', 'Dosa', 'Sambar Rice', 'Poori'),
(7, 'Sunday', 'Idli', 'Veg Briyani', 'Dosa');

-- --------------------------------------------------------

--
-- Table structure for table `room_reg`
--

CREATE TABLE `room_reg` (
  `id` int(25) NOT NULL,
  `name` varchar(25) NOT NULL,
  `dept` varchar(25) NOT NULL,
  `block` varchar(25) NOT NULL,
  `floor` varchar(25) NOT NULL,
  `room_num` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `room_reg`
--

INSERT INTO `room_reg` (`id`, `name`, `dept`, `block`, `floor`, `room_num`) VALUES
(1, 'undefined', 'undefined', 'undefined', 'undefined', 'undefined'),
(2, 'undefined', 'undefined', 'undefined', 'undefined', 'undefined');

-- --------------------------------------------------------

--
-- Table structure for table `signup`
--

CREATE TABLE `signup` (
  `id` int(25) NOT NULL,
  `name` varchar(25) NOT NULL,
  `email` varchar(25) NOT NULL,
  `dept` varchar(25) NOT NULL,
  `password` varchar(25) NOT NULL,
  `c_password` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `signup`
--

INSERT INTO `signup` (`id`, `name`, `email`, `dept`, `password`, `c_password`) VALUES
(1, 'Ravikumar', 'ravi@student.tce.edu', 'IT', 'ravi123', 'ravi123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `room_reg`
--
ALTER TABLE `room_reg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `signup`
--
ALTER TABLE `signup`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `room_reg`
--
ALTER TABLE `room_reg`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `signup`
--
ALTER TABLE `signup`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
