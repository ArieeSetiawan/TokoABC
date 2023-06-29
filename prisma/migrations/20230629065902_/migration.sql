-- CreateTable
CREATE TABLE `supplier` (
    `supplier_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(50) NULL,
    `url` VARCHAR(255) NULL,

    PRIMARY KEY (`supplier_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order` (
    `order_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nama_pemesan` VARCHAR(50) NULL,
    `alamat_pemesan` VARCHAR(255) NULL,
    `item_id` INTEGER UNSIGNED NULL,
    `quantity` INTEGER UNSIGNED NOT NULL,
    `total_price` FLOAT NULL,
    `brand` VARCHAR(50) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` VARCHAR(36) NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `updated_by` VARCHAR(36) NULL,
    `deleted_at` DATETIME NULL,
    `deleted_by` VARCHAR(36) NULL,

    PRIMARY KEY (`order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
