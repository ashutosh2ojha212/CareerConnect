import multer from 'multer'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

let supabase: any = null
if (supabaseUrl && supabaseServiceKey) {
  supabase = createClient(supabaseUrl, supabaseServiceKey)
}

const BUCKET_NAME = 'resumes'

/** Upload a file buffer to Supabase Storage and return the public URL */
export async function uploadToSupabaseStorage(
  buffer: Buffer,
  filename: string,
  mimetype: string
): Promise<string> {
  if (!supabase) {
    throw new Error(
      'Supabase storage not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.'
    )
  }

  const safeFilename = filename.replace(/[^\w\s\-_.]/g, '_').trim() || 'Resume.pdf'
  const filePath = `resumes/${Date.now()}-${safeFilename}`

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, buffer, {
      contentType: mimetype,
      upsert: false,
    })

  if (error) {
    throw new Error(`Supabase upload failed: ${error.message}`)
  }

  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath)

  return urlData.publicUrl
}

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true)
    } else {
      cb(new Error('Only PDF files are allowed'))
    }
  },
})

export { BUCKET_NAME }