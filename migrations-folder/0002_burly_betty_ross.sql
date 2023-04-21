ALTER TABLE `products` ADD CONSTRAINT `products_id_stores_id_fk` FOREIGN KEY (`id`) REFERENCES `stores`(`id`);
ALTER TABLE `products` DROP FOREIGN KEY `products_store_id_stores_id_fk`;

ALTER TABLE `products` DROP COLUMN `store_id`;