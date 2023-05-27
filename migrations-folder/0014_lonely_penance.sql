ALTER TABLE `payments` ADD `stripe_account_created_at` text;
ALTER TABLE `payments` ADD `stripe_account_expires_at` text;
ALTER TABLE `payments` ADD `details_submitted` boolean DEFAULT false;