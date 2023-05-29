CREATE TABLE `payments` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`store_id` int,
	`stripe_account_id` text
);
