-- CreateTable
CREATE TABLE "ReferralForm" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "formTitle" TEXT NOT NULL DEFAULT 'Referral Application Form',
    "fields" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ReferralForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ReferralForm_userId_key" ON "ReferralForm"("userId");

-- CreateIndex
CREATE INDEX "ReferralForm_userId_idx" ON "ReferralForm"("userId");
