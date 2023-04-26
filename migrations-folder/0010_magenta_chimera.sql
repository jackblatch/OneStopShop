ALTER TABLE `products` MODIFY COLUMN `price` decimal(10,2) DEFAULT '0';
ALTER TABLE `products` ALTER COLUMN `images` SET DEFAULT ('[]');