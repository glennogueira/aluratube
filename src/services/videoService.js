import { createClient } from '@supabase/supabase-js'

const PROJECT_URL = 'https://fjytvublrsjhoxwifmyy.supabase.co'
const PUBLIC_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqeXR2dWJscnNqaG94d2lmbXl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxNjY0NjYsImV4cCI6MTk4Mzc0MjQ2Nn0.8qhUePBBRG07NRL-lj04u-79EcJhmgGAgmboH09F50U'
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export function videoService() {
  return {
    getAllVideos() {
      return supabase.from('video').select('*')
    }
  }
}
