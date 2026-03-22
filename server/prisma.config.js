const config = require("./src/configuration/config");
const { defineConfig } = require("prisma/config");

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: config.dbUrl,
  },
});