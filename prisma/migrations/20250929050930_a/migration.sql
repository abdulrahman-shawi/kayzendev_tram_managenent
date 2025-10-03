-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'user',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer` JSON NULL,
    `website` JSON NULL,
    `apps` JSON NULL,
    `marketing` JSON NULL,
    `seo` JSON NULL,
    `ai` JSON NULL,
    `website_ai_complate` BOOLEAN NULL,
    `apps_ai_complate` BOOLEAN NULL,
    `markiting_ai_complate` BOOLEAN NULL,
    `seo_ai_complate` BOOLEAN NULL,
    `ai_complate` BOOLEAN NULL,
    `photo` JSON NULL,
    `photoSection` JSON NULL,
    `notes` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
