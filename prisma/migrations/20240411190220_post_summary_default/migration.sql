/*
  Warnings:

  - Made the column `summary` on table `posts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "summary" SET NOT NULL;