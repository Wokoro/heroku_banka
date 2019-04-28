import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  info: {
    title: 'API for powering BANKA front-end', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: 'This is the REST API for my product', // short description of the app
  },
  host: process.env.HOST, // the host or url of the app
  basePath: '/api/v1', // the basepath of your endpoint
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./server/docs/**/*.yaml'],
};
// initialize swagger-jsdoc

export default swaggerJSDoc(options);
