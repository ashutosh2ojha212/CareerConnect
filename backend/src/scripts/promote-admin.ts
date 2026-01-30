/**
 * One-off script to promote a user to admin by email.
 * Usage: ADMIN_EMAIL=mycareerconnects@gmail.com npx ts-node --compiler-options '{"module":"CommonJS"}' src/scripts/promote-admin.ts
 * Or: set ADMIN_EMAIL=mycareerconnects@gmail.com && npx ts-node src/scripts/promote-admin.ts
 */
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '../../.env') })

import { prisma } from '../lib/prisma'

async function main() {
  const email = process.env.ADMIN_EMAIL
  if (!email) {
    console.error('Set ADMIN_EMAIL in .env or environment (e.g. ADMIN_EMAIL=mycareerconnects@gmail.com)')
    process.exit(1)
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    console.error(`User not found: ${email}`)
    process.exit(1)
  }

  await prisma.user.update({
    where: { email },
    data: { isAdmin: true },
  })

  console.log(`✅ ${email} is now an admin. Sign in and go to /admin`)
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
