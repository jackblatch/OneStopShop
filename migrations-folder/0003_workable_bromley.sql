ALTER TABLE `products` ADD `store_id` serial AUTO_INCREMENT;
ALTER TABLE `products` DROP FOREIGN KEY `products_id_stores_id_fk`;
