import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    retries: {
      runMode: 1,
      openMode: 0,
    },
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
    },
    watchForFileChanges: false,
  },
})
