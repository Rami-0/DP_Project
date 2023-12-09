var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig'); // Import your Swagger configuration


var studentRoutes = require('./routes/Students');

// Apply global middleware (body-parser and CORS) before defining routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Mount the student routes on the /api/ path
app.use('/api/', studentRoutes);

var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);
