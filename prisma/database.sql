CREATE TABLE `User` ( 
  `id` INT UNSIGNED AUTO_INCREMENT NOT NULL,
  `username` VARCHAR(30) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `is_active` BOOL NOT NULL DEFAULT 1,
  `role` ENUM('user', 'admin', 'moderator') NOT NULL DEFAULT 'user',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `email_is_unique` UNIQUE (`email`) 
  -- Az E-mail mindenkinél egyedi
);

CREATE TABLE `Product` ( 
  `id` INT UNSIGNED AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(250) NOT NULL,
  `description` TEXT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `stock` INT NOT NULL,
  `is_active` BOOL NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `name_is_unique` UNIQUE (`name`) -- Minden terméknek egyedi lesz a neve
);

CREATE TABLE `ShippingAddress` ( 
  `id` INT UNSIGNED AUTO_INCREMENT NOT NULL,
  `user_id` INT UNSIGNED NULL,
  `recipient_name` VARCHAR(255) NULL,
  `street_address` VARCHAR(255) NOT NULL,
  `country` VARCHAR(50) NULL,
  `city` VARCHAR(100) NULL,
  `state` VARCHAR(50) NULL,
  `postal_code` VARCHAR(20) NOT NULL,
  `is_default_address` TINYINT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `user_id_fk_shipping` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
);

CREATE TABLE `Order` (
  `id` INT UNSIGNED AUTO_INCREMENT NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `shipping_id` INT UNSIGNED NOT NULL,
  `total_price` DECIMAL(10, 2) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`),
  CONSTRAINT `fk_shipping_id` FOREIGN KEY (`shipping_id`) REFERENCES `ShippingAddress` (`id`)
);


CREATE TABLE `ProductImage` ( 
  `id` INT UNSIGNED AUTO_INCREMENT NOT NULL,
  `image_path` VARCHAR(250) NOT NULL,
  `product_id` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_product_id` FOREIGN KEY (`product_id`) REFERENCES `Product` (`id`)
);

CREATE TABLE `Category` ( 
  `id` INT UNSIGNED AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(250) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
);

CREATE TABLE `ProductCategoryLink` ( 
  `id` INT UNSIGNED AUTO_INCREMENT NOT NULL,
  `product_id` INT UNSIGNED NOT NULL,
  `category_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  -- Ha a terméket töröljük akkor törlődik vele az összes kategória asszociációja (A kategória nem)
  CONSTRAINT `product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `Product` (`id`) ON DELETE CASCADE,
  CONSTRAINT `category_id_fk` FOREIGN KEY (`category_id`) REFERENCES `Category` (`id`)
);

CREATE TABLE `Review` ( 
  `id` INT UNSIGNED AUTO_INCREMENT NOT NULL,
  `rating` INT UNSIGNED NOT NULL,
  `comment` TEXT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `product_id` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `user_id_fk_review` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`),
  CONSTRAINT `product_id_fk_review` FOREIGN KEY (`product_id`) REFERENCES `Product` (`id`)
);

CREATE TABLE `OrderItem` ( 
  `id` INT UNSIGNED AUTO_INCREMENT NOT NULL,
  `order_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(250) NOT NULL,
  `quantity` INT UNSIGNED NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_order_item` (`order_id`, `name`),
  CONSTRAINT `fk_order_id_item` FOREIGN KEY (`order_id`) REFERENCES `Order` (`id`) ON DELETE CASCADE
);

CREATE TABLE `Payment` ( 
  `id` INT UNSIGNED AUTO_INCREMENT NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `order_id` INT UNSIGNED NOT NULL,
  `amount` DECIMAL(10, 2) NOT NULL,
  `status` VARCHAR(250) NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_payment` (`user_id`),
  CONSTRAINT `fk_order_id_payment` FOREIGN KEY (`order_id`) REFERENCES `Order` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user_id_payment` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
);

