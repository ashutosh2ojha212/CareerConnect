-- Add optional attempts field to OtpVerification
ALTER TABLE "OtpVerification" ADD COLUMN IF NOT EXISTS "attempts" INTEGER DEFAULT 0;
