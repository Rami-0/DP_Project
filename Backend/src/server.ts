const express = require('express');
const bodyParser = require('body-parser');
const { createServer } = require('http');
var cors = require('cors');
require('dotenv').config();
import log from './utils/logger';
import swaggerDocs from './utils/swagger';
const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');

var companyRoutes = require('./routes/companyRoutes');
var employeeRoutes = require('./routes/employeeRoutes');
var projectsRoutes = require('./routes/projectsRoutes');
var projectWorkersRoutes = require('./routes/projectWorkersRoutes');

const app = express();
var port: number = parseInt(process.env.PORT || '8090', 10);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Define your routes here
app.get('/api', (req: any, res: { send: (arg0: string) => void }) => {
	res.send('Hello, welcome to your API!');
});

// routes use
app.use('/api/', companyRoutes);
app.use('/api/', employeeRoutes);
app.use('/api/', projectsRoutes);
app.use('/api/', projectWorkersRoutes);

// Start the server
const server = createServer(app);
server.listen(port, () => {
	log.info(`Server is running on http://localhost:${port}/api/`);

	swaggerDocs(app, port);
});

const token = '6964356471:AAGUCBi4rz2lR_KcePEbd2nS0JIG_KsAogI'; // Replace with your own bot token
const allowedAdminIds = ['Adilxann', 'u88s8']; // Replace with your own Telegram user ID
const chatIds = ['1840890444','1222751218']
const bot = new TelegramBot(token, { polling: { interval: 300, autoStart: true } });

bot.onText(/\/start/, (msg) => {
	const chatId = msg.chat.id;
	const userId = msg.from.id;
	const username = msg.from.username;

	if (isAdmin(msg.from.username)) {
		bot.sendMessage(chatId, `Welcome, ${username}! Your user ID is ${userId}.`);
	} else {
		bot.sendMessage(chatId, 'Unauthorized access. You are not an admin.');
	}
});

bot.onText(/\/help/, (msg) => {
	const chatId = msg.chat.id;
	if (isAdmin(msg.from.username)) {
		bot.sendMessage(chatId, 'This is a helpful message.');
	} else {
		bot.sendMessage(chatId, 'Unauthorized access. You are not an admin.');
	}
});

function isAdmin(username: string) {
	return allowedAdminIds.includes(username);
}

bot.on('message', (msg) => {
	if (msg.text.startsWith('/')) {
		return;
}	
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, "You're not allowed to send messages to this bot.");
});
 
export function sendInReports(params) {
	chatIds.forEach(id => {
		bot.sendMessage(id, `${params}`);
	});
}
