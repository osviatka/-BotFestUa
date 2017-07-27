var TelegramBot = require('node-telegram-bot-api'),
    token = '420737343:AAEFUaIA3R6vnycu7Yd9p76n_qGXOTMKf2g';

var bot = new TelegramBot(token, {
    polling: true,
});

bot.on('message', function(msg) {
    var id = msg.from.id;
    bot.sendMessage(id, msg.text)
});