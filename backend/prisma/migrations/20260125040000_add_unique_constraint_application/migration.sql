-- Remove duplicates first (keep the oldest application for each jobPostId+userId pair)
DELETE FROM "ReferralApplication"
WHERE id NOT IN (
  SELECT MIN(id)
  FROM "ReferralApplication"
  WHERE "jobPostId" IS NOT NULL
  GROUP BY "jobPostId", "userId"
);

-- CreateIndex
CREATE UNIQUE INDEX "ReferralApplication_jobPostId_userId_key" ON "ReferralApplication"("jobPostId", "userId");
