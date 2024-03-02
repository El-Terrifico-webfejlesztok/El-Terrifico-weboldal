-- AlterTable
ALTER TABLE `Order` ADD COLUMN `status` ENUM('created', 'preparing', 'shipping', 'completed', 'canceled') NOT NULL DEFAULT 'created';
