const express = require('express');
const bodyParser = require('body-parser');
const { createServer } = require('http');
var cors = require('cors');
require('dotenv').config();
// const sql = require('mssql');

var companyRoutes = require('./routes/companyRoutes');
var employeeRoutes = require('./routes/employeeRoutes');

const app = express();
var port = process.env.PORT || 8090;

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

// Start the server
const server = createServer(app);
server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
