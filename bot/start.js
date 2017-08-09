function start() {
    bot.sendMessage(chatId, 'Привіт :) Мене звати BotFestUa');
    bot.sendMessage(chatId, 'Я допоможу тобі забронювати білети на фестиваль, ' +
        'а також трохи розповім про нього.');
    menu();
}