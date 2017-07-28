var TelegramBot = require('node-telegram-bot-api'),
    token = '420737343:AAEFUaIA3R6vnycu7Yd9p76n_qGXOTMKf2g';
    // menu = require('./bot/menu.js');

var bot = new TelegramBot(token, {
    polling: true
});

var chatId;

bot.on('message', function (msg) {
    chatId = msg.from.id;
    //bot.sendMessage(id, msg.text);
    switch (msg.text) {
        case '/start':
            start();
            break;
        case 'ІНФО':
            info();
            break;
    }
});

// Эта функция начинает разговор с пользователем
function start() {
    bot.sendMessage(chatId, 'Привіт :) Мене звати BotFestUa');
    bot.sendMessage(chatId, 'Я допоможу тобі забронювати білети на фестиваль, ' +
        'а також трохи розповім про нього.');
    menu();
}

// Эта функция отправляет пользователю две кнопки главного меню
function menu() {
    bot.sendMessage(chatId, 'P.S. Якщо хочеш, щоб у нас з тобою все класно склалося, ' +
        'будь ласка, скористуйся пунктами меню ;)', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['ІНФО'],
                ['Забронювати білет']
            ]
        })
    });
}
// Эта функция вызывает менб информации про фест

function info() {
    bot.sendMessage(chatId, 'Інформація про фест...')
}