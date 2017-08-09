var menu = function () {
    return bot.sendMessage(chatId, 'P.S. Якщо хочеш, щоб у нас з тобою все класно склалося, ' +
        'будь ласка, скористуйся пунктами меню ;)', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['ІНФО'],
                ['Забронювати білет']
            ]
        })
    });
};

module.exports.menu = menu;