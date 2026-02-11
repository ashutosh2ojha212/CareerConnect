import express from 'express'
import { prisma } from '../lib/prisma'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = express.Router()
// Test endpoint to verify route is working
router.get('/test', (req, res) => {
  res.json({ message: 'Referrer routes are working!' })
})

// Get referral form for the authenticated user
router.get('/form', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user!.id

    const form = await prisma.referralForm.findUnique({
      where: { userId },
    })

    if (!form) {
      return res.json(null)
    }

    res.json({
      id: form.id,
      formTitle: form.formTitle,
      fields: JSON.parse(form.fields),
      createdAt: form.createdAt,
      updatedAt: form.updatedAt,
    })
  } catch (error) {
    next(error)
  }
})

// Create or update referral form
router.post('/form', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user!.id
    const { formTitle, fields } = req.body

    if (!fields || !Array.isArray(fields)) {
      return res.status(400).json({ message: 'fields array is required' })
    }

    // Use default title if not provided
    const finalFormTitle = formTitle || 'Referral Application Form'

    // Check if form already exists
    const existingForm = await prisma.referralForm.findUnique({
      where: { userId },
    })

    if (existingForm) {
      // Update existing form
      const updated = await prisma.referralForm.update({
        where: { userId },
        data: {
          formTitle: finalFormTitle,
          fields: JSON.stringify(fields),
        },
      })

      return res.json({
        id: updated.id,
        formTitle: updated.formTitle,
        fields: JSON.parse(updated.fields),
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt,
      })
    } else {
      // Create new form
      const created = await prisma.referralForm.create({
        data: {
          userId,
          formTitle: finalFormTitle,
          fields: JSON.stringify(fields),
        },
      })

      return res.json({
        id: created.id,
        formTitle: created.formTitle,
        fields: JSON.parse(created.fields),
        createdAt: created.createdAt,
        updatedAt: created.updatedAt,
      })
    }
  } catch (error) {
    next(error)
  }
})

// Get referral form for a specific employee (for job seekers)
router.get('/form/:employeeId', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { employeeId } = req.params

    const form = await prisma.referralForm.findUnique({
      where: { userId: employeeId },
    })

    if (!form) {
      // Return default fields if no custom form exists
      return res.json({
        id: 'default',
        formTitle: 'Referral Application Form',
        fields: [
          { id: 'name', label: 'Full Name', type: 'text', required: true },
          { id: 'email', label: 'Email', type: 'text', required: true },
          { id: 'phone', label: 'Phone Number', type: 'text', required: true },
          { id: 'experience', label: 'Years of Experience', type: 'number', required: true },
          { id: 'resume', label: 'Resume (PDF)', type: 'file', required: true },
        ],
      })
    }

    res.json({
      id: form.id,
      formTitle: form.formTitle,
      fields: JSON.parse(form.fields),
      createdAt: form.createdAt,
      updatedAt: form.updatedAt,
    })
  } catch (error) {
    next(error)
  }
})

// Update referral form (PUT)
router.put('/form', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user!.id
    const { formTitle, fields } = req.body

    if (!fields || !Array.isArray(fields)) {
      return res.status(400).json({ message: 'fields array is required' })
    }

    // Use default title if not provided
    const finalFormTitle = formTitle || 'Referral Application Form'

    const updated = await prisma.referralForm.update({
      where: { userId },
      data: {
        formTitle: finalFormTitle,
        fields: JSON.stringify(fields),
      },
    })

    res.json({
      id: updated.id,
      formTitle: updated.formTitle,
      fields: JSON.parse(updated.fields),
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    })
  } catch (error) {
    if ((error as any).code === 'P2025') {
      return res.status(404).json({ message: 'Referral form not found' })
    }
    next(error)
  }
})

export default router
