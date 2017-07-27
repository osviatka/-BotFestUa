const TelegramBot = require('node-telegram-bot-api');
const token = '420737343:AAEFUaIA3R6vnycu7Yd9p76n_qGXOTMKf2g';
const welcomeMessage = 'Приветствую! Я FestUaBot. Чем вам помочь?';

const bot = new TelegramBot(token, {
    polling: true,
});


bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, welcomeMessage);
});

bot.on('message', function(msg) {
    var id = msg.from.id;
    bot.sendMessage(id, msg.text);
});