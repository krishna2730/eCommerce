const swaggerJsdoc = require('swagger-jsdoc');
const fs = require('fs');

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Triveous API Swagger",
      version: "0.1.0",
      description: "Triveous API",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Krishna",
        email: "krishnaviramgama2002@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1/triveous",
        description: "local",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          in: "header",
          name: "Authorization",
          description: "Bearer token to access these api endpoints",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/controllers/*.js","./src/dto/*.js"],
  // apis: ["./src/controllers/*.ts", "./src/dto/*.ts"],
};

const specs = swaggerJsdoc(options);

fs.writeFileSync("src/api-docs/swagger.json", JSON.stringify(specs, null, 2));
