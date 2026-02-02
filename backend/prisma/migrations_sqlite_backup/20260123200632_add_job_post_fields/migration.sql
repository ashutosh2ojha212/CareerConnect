-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_JobPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "experience" INTEGER,
    "location" TEXT,
    "skills" TEXT,
    "companyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "JobPost_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "JobPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_JobPost" ("companyId", "createdAt", "description", "id", "title", "updatedAt", "userId") SELECT "companyId", "createdAt", "description", "id", "title", "updatedAt", "userId" FROM "JobPost";
DROP TABLE "JobPost";
ALTER TABLE "new_JobPost" RENAME TO "JobPost";
CREATE INDEX "JobPost_companyId_idx" ON "JobPost"("companyId");
CREATE INDEX "JobPost_userId_idx" ON "JobPost"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
