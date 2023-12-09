const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'Description of your API',
    },
  },
  apis: ['./routes/Students.js'], // Specify the path to your route files
};

const specs = swaggerJsdoc(options);

module.exports = specs;
