-- CreateTable
CREATE TABLE "ReferralInvitation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "inviterId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ReferralInvitation_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ReferralInvitation_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ReferralInvitation_inviterId_candidateId_key" ON "ReferralInvitation"("inviterId", "candidateId");

-- CreateIndex
CREATE INDEX "ReferralInvitation_candidateId_idx" ON "ReferralInvitation"("candidateId");

-- CreateIndex
CREATE INDEX "ReferralInvitation_inviterId_idx" ON "ReferralInvitation"("inviterId");
