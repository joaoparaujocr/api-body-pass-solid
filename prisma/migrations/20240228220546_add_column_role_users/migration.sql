-- CreateEnum
CREATE TYPE "RoleUsers" AS ENUM ('MEMBER', 'ADMIN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "RoleUsers" NOT NULL DEFAULT 'MEMBER';
