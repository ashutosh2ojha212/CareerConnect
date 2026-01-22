import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../utils/bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create sample companies
  const techCorp = await prisma.company.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      name: 'Tech Corp',
      description: 'Leading technology company specializing in software solutions',
    },
  })

  const innovateLabs = await prisma.company.upsert({
    where: { id: '2' },
    update: {},
    create: {
      id: '2',
      name: 'Innovate Labs',
      description: 'Innovation-driven startup building the future',
    },
  })

  const dataSystems = await prisma.company.upsert({
    where: { id: '3' },
    update: {},
    create: {
      id: '3',
      name: 'Data Systems',
      description: 'Enterprise data solutions and analytics',
    },
  })

  console.log('✅ Created companies')

  // Create sample users (employees)
  const hashedPassword = await hashPassword('password123')

  const employee1 = await prisma.user.upsert({
    where: { email: 'john@techcorp.com' },
    update: {},
    create: {
      email: 'john@techcorp.com',
      name: 'John Doe',
      password: hashedPassword,
      role: 'referrer',
      employeeProfile: {
        create: {
          companyId: techCorp.id,
          position: 'Senior Software Engineer',
        },
      },
    },
  })

  const employee2 = await prisma.user.upsert({
    where: { email: 'jane@techcorp.com' },
    update: {},
    create: {
      email: 'jane@techcorp.com',
      name: 'Jane Smith',
      password: hashedPassword,
      role: 'referrer',
      employeeProfile: {
        create: {
          companyId: techCorp.id,
          position: 'Engineering Manager',
        },
      },
    },
  })

  console.log('✅ Created sample employees')

  // Create sample job posts
  const jobPost1 = await prisma.jobPost.create({
    data: {
      title: 'Senior Software Engineer',
      description: 'We are looking for an experienced software engineer to join our team...',
      companyId: techCorp.id,
      userId: employee1.id,
      customFormFields: {
        create: [
          { label: 'Full Name', type: 'text', required: true, order: 0 },
          { label: 'Email', type: 'email', required: true, order: 1 },
          { label: 'Years of Experience', type: 'number', required: false, order: 2 },
          { label: 'Resume (PDF)', type: 'file', required: true, order: 3 },
        ],
      },
    },
  })

  console.log('✅ Created sample job posts')
  
  // Create a sample job seeker
  const jobSeeker = await prisma.user.upsert({
    where: { email: 'jobseeker@example.com' },
    update: {},
    create: {
      email: 'jobseeker@example.com',
      name: 'Job Seeker',
      password: hashedPassword,
      role: 'job_seeker',
    },
  })
  
  console.log('✅ Created sample job seeker')
  console.log('🎉 Seeding completed!')
  console.log('\n📝 Test Accounts:')
  console.log('   Employee: john@techcorp.com / password123')
  console.log('   Job Seeker: jobseeker@example.com / password123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

