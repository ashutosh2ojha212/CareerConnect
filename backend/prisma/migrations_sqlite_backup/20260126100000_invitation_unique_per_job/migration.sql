-- DropIndex: one invitation per (inviter, candidate) only
DROP INDEX "ReferralInvitation_inviterId_candidateId_key";

-- CreateIndex: one invitation per (inviter, candidate, job) — allows multiple invites per candidate for different jobs
CREATE UNIQUE INDEX "ReferralInvitation_inviterId_candidateId_jobPostId_key" ON "ReferralInvitation"("inviterId", "candidateId", "jobPostId");
