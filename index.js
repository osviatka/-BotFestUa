const TelegramBot = require('node-telegram-bot-api'),
    token = '420737343:AAEFUaIA3R6vnycu7Yd9p76n_qGXOTMKf2g',
    welcomeMessage = 'Привіт :) Мене звати FestUABot. Я допоможу тобі забронювати білети на фестиваль,а також трохи розповім про нього.\n \nP.S. Якщо хочеш, щоб у нас з тобою все класно склалося,будь ласка, скористуйся пунктами меню ;)',
    bot = new TelegramBot(token, {    polling: true}),
    menu = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'ІНФО', callback_data: '1' }],
            [{ text: 'Забронювати білет', callback_data: 'data 2' }]
        ]
    })
};


bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, welcomeMessage,menu);
});

bot.on('message', function(msg) {
    var id = msg.from.id;
    bot.sendMessage(id, msg.text);
});
