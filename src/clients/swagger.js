const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Triveous eCommerce',
    description: 'API Documentation',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes/api.routes.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);