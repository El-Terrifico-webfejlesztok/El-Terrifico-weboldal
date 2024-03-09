/*
  Warnings:

  - You are about to alter the column `title` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(80)`.

*/
-- AlterTable
ALTER TABLE `Post` MODIFY `title` VARCHAR(80) NOT NULL;
