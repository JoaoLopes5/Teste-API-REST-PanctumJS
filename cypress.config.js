const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/mochawesome",
    overwrite: false,
    reportFilename:"index.html",
    html: true,
    json: false
  },
  e2e: {
    setupNodeEvents(on, config) {
      return config;
    },
  },
});