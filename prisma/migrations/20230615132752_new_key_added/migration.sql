/*
  Warnings:

  - Added the required column `is_activate` to the `announcements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "announcements" ADD COLUMN     "is_activate" BOOLEAN NOT NULL;
