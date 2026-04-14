-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "description" DROP NOT NULL;
