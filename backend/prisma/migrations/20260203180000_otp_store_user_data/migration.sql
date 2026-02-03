-- Delete existing OTP records (temporary)
DELETE FROM "OtpVerification";

-- Add fullName and passwordHash to OtpVerification
ALTER TABLE "OtpVerification" ADD COLUMN "fullName" TEXT NOT NULL DEFAULT '';
ALTER TABLE "OtpVerification" ADD COLUMN "passwordHash" TEXT NOT NULL DEFAULT '';
