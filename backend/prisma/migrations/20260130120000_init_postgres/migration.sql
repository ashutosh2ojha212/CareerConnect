-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "deactivated" BOOLEAN NOT NULL DEFAULT false,
    "resetPasswordToken" TEXT,
    "resetPasswordExpires" TIMESTAMP(3),
    "welcomeEmailSent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "logo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "position" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmployeeProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "description" TEXT,
    "experience" INTEGER,
    "location" TEXT,
    "skills" TEXT,
    "companyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobCustomFormField" (
    "id" TEXT NOT NULL,
    "jobPostId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "JobCustomFormField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferralApplication" (
    "id" TEXT NOT NULL,
    "jobPostId" TEXT,
    "userId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "formData" TEXT NOT NULL DEFAULT '{}',
    "resumeUrl" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReferralApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferralForm" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "formTitle" TEXT NOT NULL DEFAULT 'Referral Application Form',
    "fields" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReferralForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobSeekerProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "experience" INTEGER,
    "primaryRole" TEXT,
    "skills" TEXT,
    "jobPreferences" TEXT,
    "preferredLocations" TEXT,
    "profileSummary" TEXT,
    "resumeUrl" TEXT,
    "profileImageURL" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobSeekerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferralInvitation" (
    "id" TEXT NOT NULL,
    "inviterId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "jobPostId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReferralInvitation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeProfile_userId_key" ON "EmployeeProfile"("userId");

-- CreateIndex
CREATE INDEX "EmployeeProfile_companyId_idx" ON "EmployeeProfile"("companyId");

-- CreateIndex
CREATE INDEX "JobPost_companyId_idx" ON "JobPost"("companyId");

-- CreateIndex
CREATE INDEX "JobPost_userId_idx" ON "JobPost"("userId");

-- CreateIndex
CREATE INDEX "JobCustomFormField_jobPostId_idx" ON "JobCustomFormField"("jobPostId");

-- CreateIndex
CREATE INDEX "ReferralApplication_userId_idx" ON "ReferralApplication"("userId");

-- CreateIndex
CREATE INDEX "ReferralApplication_jobPostId_idx" ON "ReferralApplication"("jobPostId");

-- CreateIndex
CREATE INDEX "ReferralApplication_employeeId_idx" ON "ReferralApplication"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "ReferralApplication_jobPostId_userId_key" ON "ReferralApplication"("jobPostId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "ReferralForm_userId_key" ON "ReferralForm"("userId");

-- CreateIndex
CREATE INDEX "ReferralForm_userId_idx" ON "ReferralForm"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "JobSeekerProfile_userId_key" ON "JobSeekerProfile"("userId");

-- CreateIndex
CREATE INDEX "JobSeekerProfile_userId_idx" ON "JobSeekerProfile"("userId");

-- CreateIndex
CREATE INDEX "JobSeekerProfile_primaryRole_idx" ON "JobSeekerProfile"("primaryRole");

-- CreateIndex
CREATE INDEX "ReferralInvitation_candidateId_idx" ON "ReferralInvitation"("candidateId");

-- CreateIndex
CREATE INDEX "ReferralInvitation_inviterId_idx" ON "ReferralInvitation"("inviterId");

-- CreateIndex
CREATE INDEX "ReferralInvitation_jobPostId_idx" ON "ReferralInvitation"("jobPostId");

-- CreateIndex
CREATE UNIQUE INDEX "ReferralInvitation_inviterId_candidateId_jobPostId_key" ON "ReferralInvitation"("inviterId", "candidateId", "jobPostId");

-- AddForeignKey
ALTER TABLE "EmployeeProfile" ADD CONSTRAINT "EmployeeProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeProfile" ADD CONSTRAINT "EmployeeProfile_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPost" ADD CONSTRAINT "JobPost_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPost" ADD CONSTRAINT "JobPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobCustomFormField" ADD CONSTRAINT "JobCustomFormField_jobPostId_fkey" FOREIGN KEY ("jobPostId") REFERENCES "JobPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralApplication" ADD CONSTRAINT "ReferralApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralApplication" ADD CONSTRAINT "ReferralApplication_jobPostId_fkey" FOREIGN KEY ("jobPostId") REFERENCES "JobPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralForm" ADD CONSTRAINT "ReferralForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobSeekerProfile" ADD CONSTRAINT "JobSeekerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralInvitation" ADD CONSTRAINT "ReferralInvitation_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralInvitation" ADD CONSTRAINT "ReferralInvitation_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralInvitation" ADD CONSTRAINT "ReferralInvitation_jobPostId_fkey" FOREIGN KEY ("jobPostId") REFERENCES "JobPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;
