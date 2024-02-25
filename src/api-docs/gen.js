const swaggerJsdoc = require('swagger-jsdoc');
import fs from "fs";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Authentical API Swagger",
      version: "0.1.0",
      description: "Authentical API",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Authentical",
        url: "https://authentical.co",
        email: "thi@authentical.co",
      },
    },
    servers: [
      {
        url: "https://api.dev.authentical.co",
        description: "dev",
      },
      {
        url: "http://localhost:4000",
        description: "local",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          in: "header",
          name: "Authorization",
          description: "Bearer token to access these api endpoints",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/controllers/*.ts", "./src/dto/*.ts"],
};

const specs = swaggerJsdoc(options);
fs.writeFileSync("api-docs/swagger.json", JSON.stringify(specs, null, 2));
