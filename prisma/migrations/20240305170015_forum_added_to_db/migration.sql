-- CreateTable
CREATE TABLE `PostCategory` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(250) NOT NULL,

    UNIQUE INDEX `PostCategory_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(250) NOT NULL,
    `text` TEXT NOT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `category_id` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `user_id_fk_post`(`user_id`),
    INDEX `category_id_fk_post`(`category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `text` TEXT NOT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `post_id` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `user_id_fk_comment`(`user_id`),
    INDEX `post_id_fk_comment`(`post_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `user_id_fk_post` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `category_id_fk_post` FOREIGN KEY (`category_id`) REFERENCES `PostCategory`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `user_id_fk_comment` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `post_id_fk_comment` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
