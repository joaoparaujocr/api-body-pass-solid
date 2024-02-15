import { defineConfig } from 'vitest/config'
import tsConfigPathas from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [tsConfigPathas()],
	test: {
		environmentMatchGlobs: [[
			"src/http/controllers/**", 'prisma'
		]]
	}
})