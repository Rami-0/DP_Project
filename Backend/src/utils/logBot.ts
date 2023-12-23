// const TelegramBot = require('node-telegram-bot-api');
// const { exec } = require('child_process');

// const token = '6964356471:AAGUCBi4rz2lR_KcePEbd2nS0JIG_KsAogI'; // Replace with your own bot token
// const allowedAdminIds = ['Adilxann', 'u88s8']; // Replace with your own Telegram user ID

// const bot = new TelegramBot(token, { polling: { interval: 300, autoStart: true } });

// bot.onText(/\/start/, (msg) => {
// 	const chatId = msg.chat.id;
// 	if (isAdmin(msg.from.id)) {
// 		bot.sendMessage(chatId, 'Welcome to the bot! Type /help for more information.');
// 	} else {
// 		bot.sendMessage(chatId, 'Unauthorized access. You are not an admin.');
// 	}
// });

// bot.onText(/\/help/, (msg) => {
// 	const chatId = msg.chat.id;
// 	if (isAdmin(msg.from.id)) {
// 		bot.sendMessage(chatId, 'This is a helpful message.');
// 	} else {
// 		bot.sendMessage(chatId, 'Unauthorized access. You are not an admin.');
// 	}
// });

// function isAdmin(userId) {
// 	return allowedAdminIds.includes(userId);
// }

// bot.on('text', (msg) => {
// 	const chatId = msg.chat.id;
// 	if (isAdmin(msg.from.id)) {
// 		// Only allow admin to send messages
// 		if (msg.text.startsWith('/sendreport')) {
// 			const params = msg.text.replace('/sendreport', '').trim();
// 			sendInReport(chatId, params);
// 		}
// 	} else {
// 		bot.sendMessage(chatId, 'Unauthorized access. You are not an admin.');
// 	}
// });

// function sendInReport(chatId, params) {
// 	bot.sendMessage(chatId, `Sending report with parameters: ${params}`);
// 	// Your logic to process the report and send messages to the main chat goes here
// }
