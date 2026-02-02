-- Add jobPostId to ReferralInvitation (optional, for Apply flow)
ALTER TABLE "ReferralInvitation" ADD COLUMN "jobPostId" TEXT;

CREATE INDEX "ReferralInvitation_jobPostId_idx" ON "ReferralInvitation"("jobPostId");
