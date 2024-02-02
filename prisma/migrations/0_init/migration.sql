-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(30) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `role` ENUM('user', 'admin', 'moderator') NOT NULL DEFAULT 'user',
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(250) NOT NULL,
    `description` TEXT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `stock` INTEGER NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `name_is_unique`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(250) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `shipping_id` INTEGER UNSIGNED NOT NULL,
    `total_price` DECIMAL(10, 2) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_shipping_id`(`shipping_id`),
    INDEX `fk_user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `order_id` INTEGER UNSIGNED NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `status` VARCHAR(250) NULL,

    UNIQUE INDEX `unique_user_payment`(`user_id`),
    INDEX `fk_order_id_payment`(`order_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderItem` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER UNSIGNED NOT NULL,
    `name` VARCHAR(250) NOT NULL,
    `quantity` INTEGER UNSIGNED NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,

    UNIQUE INDEX `unique_order_item`(`order_id`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `rating` INTEGER UNSIGNED NOT NULL,
    `comment` TEXT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `product_id` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `product_id_fk_review`(`product_id`),
    INDEX `user_id_fk_review`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShippingAddress` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NULL,
    `recipient_name` VARCHAR(255) NULL,
    `street_address` VARCHAR(255) NOT NULL,
    `country` VARCHAR(50) NULL,
    `city` VARCHAR(100) NULL,
    `state` VARCHAR(50) NULL,
    `postal_code` VARCHAR(20) NOT NULL,
    `is_default_address` TINYINT NULL DEFAULT 1,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `user_id_fk_shipping`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductImage` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `image_path` VARCHAR(250) NOT NULL,
    `product_id` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_product_id`(`product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductCategoryLink` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER UNSIGNED NOT NULL,
    `category_id` INTEGER UNSIGNED NOT NULL,

    INDEX `category_id_fk`(`category_id`),
    INDEX `product_id_fk`(`product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `fk_shipping_id` FOREIGN KEY (`shipping_id`) REFERENCES `ShippingAddress`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `fk_order_id_payment` FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `fk_user_id_payment` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `fk_order_id_item` FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `product_id_fk_review` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `user_id_fk_review` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ShippingAddress` ADD CONSTRAINT `user_id_fk_shipping` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ProductImage` ADD CONSTRAINT `fk_product_id` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ProductCategoryLink` ADD CONSTRAINT `category_id_fk` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ProductCategoryLink` ADD CONSTRAINT `product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

