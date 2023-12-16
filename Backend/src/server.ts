const express = require('express');
const bodyParser = require('body-parser');
const { createServer } = require('http');
var cors = require('cors');
require('dotenv').config();
import log from "./utils/logger";
import swaggerDocs from "./utils/swagger";


var companyRoutes = require('./routes/companyRoutes');
var employeeRoutes = require('./routes/employeeRoutes');
var projectsRoutes = require('./routes/projectsRoutes');

const app = express();
var port: number = parseInt(process.env.PORT || "8090", 10);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Define your routes here
app.get('/', (req: any, res: { send: (arg0: string) => void }) => {
	res.send('Hello, welcome to your API!');
});

// routes use
app.use('/api/', companyRoutes);
app.use('/api/', employeeRoutes);
app.use('/api/', projectsRoutes);

// Start the server
const server = createServer(app);
server.listen(port, () => {
	log.info(`Server is running on http://localhost:${port}/api/:endpoint`);
	
	swaggerDocs(app, port);
});


