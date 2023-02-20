-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 20, 2023 at 05:26 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eplaza`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `image`, `description`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Test', '1676563249041-user.png', 'Test', 1, '2023-02-16 16:00:49', '2023-02-16 16:00:49'),
(2, 'Test', '1676563339916-user.png', 'Test', 1, '2023-02-16 16:02:19', '2023-02-16 16:02:19');

-- --------------------------------------------------------

--
-- Table structure for table `global_delivery_times`
--

CREATE TABLE `global_delivery_times` (
  `id` int(11) NOT NULL,
  `min_time` int(11) NOT NULL,
  `max_time` int(11) NOT NULL,
  `time_format` int(11) NOT NULL DEFAULT 0 COMMENT '1-minut,2-hour,3-days',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `global_delivery_times`
--

INSERT INTO `global_delivery_times` (`id`, `min_time`, `max_time`, `time_format`, `createdAt`, `updatedAt`) VALUES
(1, 2, 4, 2, '2023-02-19 19:16:07', '2023-02-19 19:16:07'),
(2, 40, 60, 1, '2023-02-19 19:16:07', '2023-02-19 19:16:07');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `sub_category_id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` double DEFAULT NULL,
  `offer_price` double NOT NULL,
  `stock_quantity` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `shipping_policy` text DEFAULT NULL,
  `refund_policy` text DEFAULT NULL,
  `is_cancel_enabled` int(11) NOT NULL DEFAULT 0 COMMENT '0-NOT_ENABLED,1-ENABLED',
  `is_return_enabled` int(11) NOT NULL DEFAULT 0 COMMENT '0-NOT_ENABLED,1-ENABLED',
  `is_exchange_enabled` int(11) NOT NULL DEFAULT 0 COMMENT '0-NOT_ENABLED,1-ENABLED',
  `image_1` text DEFAULT NULL,
  `image_2` text DEFAULT NULL,
  `image_3` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `sub_category_id`, `vendor_id`, `name`, `price`, `offer_price`, `stock_quantity`, `description`, `shipping_policy`, `refund_policy`, `is_cancel_enabled`, `is_return_enabled`, `is_exchange_enabled`, `image_1`, `image_2`, `image_3`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 1, 'Mobile', 1000, 800, 200, 'Test description', '1', 'Tet refund policy 7 ', 1, 1, 1, NULL, NULL, NULL, '2023-02-19 12:26:20', '2023-02-19 12:26:20'),
(2, 1, 1, 1, 'Test', 1000, 800, 200, 'Test description', '1', 'standud 7 days', 1, 1, 1, NULL, NULL, NULL, '2023-02-19 13:59:48', '2023-02-19 13:59:48'),
(3, 1, 1, 1, 'Test', 1000, 800, 200, 'Test description', '1', 'standud 7 days', 1, 1, 1, NULL, NULL, NULL, '2023-02-19 14:24:00', '2023-02-19 14:24:00'),
(4, 1, 1, 1, 'Test', 1000, 800, 200, 'Test description', '1', 'standud 7 days', 1, 1, 1, NULL, NULL, NULL, '2023-02-19 14:29:51', '2023-02-19 14:29:51');

-- --------------------------------------------------------

--
-- Table structure for table `shop_details`
--

CREATE TABLE `shop_details` (
  `id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `shop_name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `image_1` varchar(255) DEFAULT NULL,
  `image_2` varchar(255) DEFAULT NULL,
  `aadhar_card_number` int(11) DEFAULT NULL,
  `aadhar_image` varchar(255) DEFAULT NULL,
  `business_type` varchar(255) DEFAULT NULL,
  `turn_over` text DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `is_grahudhyog` tinyint(4) NOT NULL DEFAULT 0 COMMENT '0-NOT_GRAHUDHYOG,1-GRAH_UDHYOG',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shop_details`
--

INSERT INTO `shop_details` (`id`, `vendor_id`, `shop_name`, `city`, `address`, `image_1`, `image_2`, `aadhar_card_number`, `aadhar_image`, `business_type`, `turn_over`, `category_id`, `is_grahudhyog`, `createdAt`, `updatedAt`) VALUES
(1, 2, 'Test Shop', 'Dehradun', 'Dehradun paltan bazar', '1676602756263-userprofilepic.png', '1676602756263-user_icon.png', 1231231234, '1676602756263-usericont.png', 'Textile', '12344 per year', 1, 1, '2023-02-17 02:59:16', '2023-02-17 02:59:16');

-- --------------------------------------------------------

--
-- Table structure for table `subscription_billing`
--

CREATE TABLE `subscription_billing` (
  `id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL,
  `purchase_date` date NOT NULL,
  `purchase_time` time NOT NULL,
  `plan_price` double NOT NULL,
  `total_billing_amount` double NOT NULL,
  `duration` int(11) NOT NULL COMMENT 'Duration in days',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `discount_price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subscription_billing`
--

INSERT INTO `subscription_billing` (`id`, `vendor_id`, `plan_id`, `purchase_date`, `purchase_time`, `plan_price`, `total_billing_amount`, `duration`, `createdAt`, `updatedAt`, `discount_price`) VALUES
(55, 1, 1, '2023-02-18', '19:40:24', 1200, 960, 365, '2023-02-18 14:10:24', '2023-02-18 14:10:24', 960);

-- --------------------------------------------------------

--
-- Table structure for table `subscription_plans`
--

CREATE TABLE `subscription_plans` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL COMMENT '0-INACTIVE,1-ACTIVE',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `quarterly_price` double NOT NULL COMMENT 'Price for a quarter',
  `yearly_price` double NOT NULL COMMENT 'Yearly price',
  `yearly_off` double NOT NULL COMMENT 'off on yearly price',
  `facilities` text NOT NULL,
  `is_eplaza_full_delivery` tinyint(4) NOT NULL COMMENT '0-Only eplaza delivery app, 1- eplaza delivery app with delivery partners',
  `yearly_price_discount` double NOT NULL COMMENT 'Off percentage on quaterly price'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subscription_plans`
--

INSERT INTO `subscription_plans` (`id`, `name`, `status`, `createdAt`, `updatedAt`, `quarterly_price`, `yearly_price`, `yearly_off`, `facilities`, `is_eplaza_full_delivery`, `yearly_price_discount`) VALUES
(1, 'Starter', 1, '2023-01-28 09:30:25', '2023-01-28 09:30:25', 300, 1200, 20, 'E-plaza delivery support  24X7 admin support  store analytics  Customer trafficking Marketing and branding', 0, 960),
(2, 'Standard', 1, '2023-01-28 12:47:26', '2023-01-28 12:47:26', 400, 2000, 30, 'E-plaza delivery support  24X7 admin support  store analytics  Customer trafficking Marketing and branding', 1, 1400);

-- --------------------------------------------------------

--
-- Table structure for table `sub_categories`
--

CREATE TABLE `sub_categories` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sub_categories`
--

INSERT INTO `sub_categories` (`id`, `category_id`, `name`, `image`, `description`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Test Subcategory', 'https://fastly.picsum.photos/id/257/200/300.jpg?hmac=j0NVivHS9qSXBGkBOUjchG0Ckt6pje1KSfHsnwtr_8M', 'TEst Description', 1, '2023-02-18 11:33:50', '2023-02-18 11:33:50');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) NOT NULL,
  `user_type` tinyint(4) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `zip_code` varchar(255) DEFAULT NULL,
  `social_id` varchar(255) DEFAULT NULL,
  `register_otp` varchar(255) DEFAULT NULL,
  `is_verified` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `mobile`, `user_type`, `status`, `zip_code`, `social_id`, `register_otp`, `is_verified`, `createdAt`, `updatedAt`) VALUES
(1, 'Jitendra', 'kumar', 'wn11group+40@gmail.com', '$2a$12$Fi8EC.SwbsRRtbLKu6rffuvtBEmmlkMf8yj6aT4mrJamhHXps1e8C', '9760094234', 2, 1, 'sdfsdfwf', '', '198960', NULL, '2023-01-28 03:56:53', '2023-01-28 03:56:53'),
(3, 'Jitendra', 'kumar', 'wn11group+111@gmail.com', '$2b$10$rhsSS3UmnaCFu29vzyCouOjIVumWKosKyR/6AaM9H.UD0y7EgCrne', '9760094234', 2, 0, NULL, '', '649408', NULL, '2023-02-15 15:37:22', '2023-02-15 15:37:22'),
(4, 'Jitendra', 'kumar', 'wn11group+121@gmail.com', '$2b$10$4jyyoWNdohYgSc683rDChex0lRdHlwJqsIlnz3fxn87IeyNZ7ByFm', '9760094234', 2, 0, NULL, '', '251299', NULL, '2023-02-15 18:18:26', '2023-02-15 18:18:26'),
(6, 'Jitendra', 'kumar', 'wn11group+120@gmail.com', '$2b$10$UEhcTqgQjsjUT4iSY5a.JeOyv0Ah4ThqT7VosuKayvrI7tJ1y8SKm', '9760094234', 2, 0, NULL, '', '605889', NULL, '2023-02-15 18:19:19', '2023-02-15 18:19:19'),
(7, 'Jitendra', 'kumar', 'wn11group+122@gmail.com', '$2b$10$LpWCOEVTRDQezU1UUooF9OvX11yQQSsk8mBhnZc/JtiGPCqTwwrmy', '9760094234', 2, 0, NULL, '', '222222', NULL, '2023-02-15 18:20:50', '2023-02-15 18:20:50'),
(8, 'Jitendra', 'kumar', 'wn11group+115@gmail.com', '$2b$10$SBXWNaeSag.MyAOgLFONh.aVxJPGgI8r1kXF/BIwgj21As2ADKlwi', '9760094234', 2, 0, NULL, '', '222222', NULL, '2023-02-18 06:18:28', '2023-02-18 06:18:28');

-- --------------------------------------------------------

--
-- Table structure for table `vendor_subscriptions`
--

CREATE TABLE `vendor_subscriptions` (
  `id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL,
  `billing_id` int(11) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `is_plan_expired` int(11) NOT NULL DEFAULT 0 COMMENT '0-NOT_EXPIRED,1-EXPIRED',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vendor_subscriptions`
--

INSERT INTO `vendor_subscriptions` (`id`, `vendor_id`, `plan_id`, `billing_id`, `start_date`, `end_date`, `is_plan_expired`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 55, '2023-02-18 00:00:00', '2023-05-19 00:00:00', 0, '2023-02-18 14:10:24', '2023-02-18 14:10:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `global_delivery_times`
--
ALTER TABLE `global_delivery_times`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `sub_category_id` (`sub_category_id`),
  ADD KEY `vendor_id` (`vendor_id`);

--
-- Indexes for table `shop_details`
--
ALTER TABLE `shop_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscription_billing`
--
ALTER TABLE `subscription_billing`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscription_plans`
--
ALTER TABLE `subscription_plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `vendor_subscriptions`
--
ALTER TABLE `vendor_subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `plan_id` (`plan_id`),
  ADD KEY `billing_id` (`billing_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `global_delivery_times`
--
ALTER TABLE `global_delivery_times`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `shop_details`
--
ALTER TABLE `shop_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `subscription_billing`
--
ALTER TABLE `subscription_billing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `subscription_plans`
--
ALTER TABLE `subscription_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sub_categories`
--
ALTER TABLE `sub_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `vendor_subscriptions`
--
ALTER TABLE `vendor_subscriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories` (`id`),
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`vendor_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `vendor_subscriptions`
--
ALTER TABLE `vendor_subscriptions`
  ADD CONSTRAINT `vendor_subscriptions_ibfk_4` FOREIGN KEY (`plan_id`) REFERENCES `subscription_plans` (`id`),
  ADD CONSTRAINT `vendor_subscriptions_ibfk_5` FOREIGN KEY (`billing_id`) REFERENCES `subscription_billing` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
