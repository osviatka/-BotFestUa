const TelegramBot = require('node-telegram-bot-api'),
    token = '447593794:AAGzGT6n0i_IDUfxWiME6pWFwLz_srmUh5g',
    bot = new TelegramBot(token, {
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
    bot.sendMessage(chatId, 'Привіт :) Мене звати BotFestUa. ' +
        'Я допоможу тобі забронювати білети на фестиваль, ' +
        'а також трохи розповім про нього.');
    menu();
}

// Эта функция отправляет пользователю две кнопки главного меню
function menu() {
    bot.sendMessage(chatId, 'P.S. Якщо хочеш, щоб у нас з тобою все класно склалося, ' +
        'будь ласка, скористуйся пунктами меню ;)', {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'ІНФО', callback_data: '1' }],
                [{ text: 'Забронювати білет', callback_data: 'data 2' }]
            ]
        })
    });
}
// Эта функция вызывает менб информации про фест

function info() {
    bot.sendMessage(chatId, 'Інформація про фест...')
}