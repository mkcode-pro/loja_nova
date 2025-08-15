import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jdzagrifztxklirtvifl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkemFncmlmenR4a2xpcnR2aWZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyMzEwMTIsImV4cCI6MjA3MDgwNzAxMn0.kWmEpdeA1Rh1hsA4Y8bxM8tnGLYetbM3M7BWYKgk1ZY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)