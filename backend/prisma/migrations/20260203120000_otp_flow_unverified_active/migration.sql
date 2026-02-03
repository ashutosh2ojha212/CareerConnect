-- Delete existing OTP records (temporary verification codes)
DELETE FROM "OtpVerification";

-- Drop FK and userId from OtpVerification
ALTER TABLE "OtpVerification" DROP CONSTRAINT IF EXISTS "OtpVerification_userId_fkey";
ALTER TABLE "OtpVerification" DROP COLUMN "userId";

-- Add email column
ALTER TABLE "OtpVerification" ADD COLUMN "email" TEXT NOT NULL;

-- Drop old index, create new
DROP INDEX IF EXISTS "OtpVerification_userId_idx";
CREATE INDEX "OtpVerification_email_idx" ON "OtpVerification"("email");

-- Update User status default (existing users keep their current value)
ALTER TABLE "User" ALTER COLUMN "status" SET DEFAULT 'UNVERIFIED';
