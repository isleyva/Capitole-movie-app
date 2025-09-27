import { config } from 'dotenv'
import { z } from 'zod'

config()

// Environment schema validation
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('8000'),
  TMDB_API_KEY: z.string().min(1, 'TMDB API key is required'),
  TMDB_BASE_URL: z.string().url().default('https://api.themoviedb.org/3'),
  VITE_APP_TITLE: z.string().default('Capitole Movie App')
})

const env = envSchema.parse(process.env)

export default env