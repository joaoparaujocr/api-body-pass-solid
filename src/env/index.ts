import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
	ENVIRONMENT: z.enum(['develop', 'staging', 'production', 'testing']).default('develop'),
	SECRET_KEY: z.string(),
	DATABASE_URL: z.string(),
	PORT: z.coerce.number().default(3333)
})

const env = envSchema.safeParse(process.env)

if (!env.success) {
	console.log('Error environment variables', env.error.format)

	throw new Error('Invalid environment')
}

export default env.data