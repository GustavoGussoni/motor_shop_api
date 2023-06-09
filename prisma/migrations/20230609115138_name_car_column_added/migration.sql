/*
  Warnings:

  - Added the required column `name_car` to the `announcements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "announcements" ADD COLUMN     "name_car" VARCHAR(20) NOT NULL;
