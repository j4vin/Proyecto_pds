import { defineConfig } from 'cypress'

const baseUrl = (process.env.BASE_URL || 'http://localhost:5173').replace(/\/+$/, '')

export default defineConfig({
  e2e: {
    baseUrl,
    supportFile: false,
    specPattern: 'cypress/e2e/**/*.cy.js',
  },
  video: false,
})
