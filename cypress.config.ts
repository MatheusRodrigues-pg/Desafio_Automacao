import { defineConfig } from "cypress"
import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(__dirname, ".env") })

export default defineConfig({
  e2e: {
    retries: {
      runMode: 1,
      openMode: 0,
    },
    baseUrl: process.env.SAUCEDEMO_BASE_URL || "https://www.saucedemo.com",
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true,
      reportPageTitle: "Resultado dos Testes",
      embeddedScreenshots: true,
      inlineAssets: true,
      charts: true,
      reportTitle: "Resultado dos Testes",
      reportFilename: "mochawesome-report",
      timestamp: "mmddyyyy_HHMMss",
      code: true,
      autoOpen: false,
    },
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on)

      config.env = {
        ...config.env,
        saucedemoUsername: process.env.SAUCEDEMO_USERNAME,
        saucedemoUserLocked: process.env.SAUCEDEMO_USERLOCKED,
        saucedemoUserVisual: process.env.SAUCEDEMO_USERVISUAL,
        saucedemoPassword: process.env.SAUCEDEMO_PASSWORD,
        apiUser: process.env.API_USER,
        apiPass: process.env.API_PASS,
        apiUrl: process.env.API_URL,
      }

      return config
    },
    watchForFileChanges: false,
  },
})