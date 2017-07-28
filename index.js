var TelegramBot = require('node-telegram-bot-api'),
    token = '447593794:AAGzGT6n0i_IDUfxWiME6pWFwLz_srmUh5g',
    bot = new TelegramBot(token, {
        polling: true
    });

var chatId;
var location;

bot.onText(/\/start/, start());

bot.on('message', function (msg) {
    chatId = msg.from.id;
    //bot.sendMessage(id, msg.text);
    switch (msg.text) {
        case '/start':
            start();
            break;
        case 'Назад':
            back();
            break;
        case 'ІНФО':
            info();
            break;
        case 'Про фестиваль':
            aboutFest();
            break;
        case 'Групи':
            aboutGroups();
            break;
        case 'Локації':
            cityLocation();
            break;
        case 'Черкаси':
            cherkassy();
            break;
        case 'Львів':
            lviv();
            break;
        case 'Київ':
            kiev();
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
// ------------------  MENU   ---------------//
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
    location = 'menu';
}
// ------------------ / MENU /  ---------------//

// Эта функция вызывает меню информации про фест
// ------------------ INFO  ---------------//
function info() {
    bot.sendMessage(chatId, 'Друже, вибери, будь ласка, що саме тебе цікавить)', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Про фестиваль'],
                ['Групи'],
                ['Локації'],
                ['Фото'],
                ['Забронювати білет'],
                ['Назад']
            ]
        })
    });
    location = 'info';
}
// ------------------ / INFO / ---------------//

// ------------------ AboutFest ---------------//
function aboutFest() {
    bot.sendMessage(chatId, 'Фестиваль ….Fest традиційно пройде в трьох містах України( Черкаси -25-27 серпня, ' +
        'Львів - 29-31 серпня, Київ 3-5 вересня)  під лозунгом ………………………….., ' +
        'Тут можна знайти все для комфортного та якісного відпочинку, ' +
        'що робить фестиваль самобутньою і самодостатньою подією, ' +
        'яку наші відвідувачі з нетерпінням чекають цілий рік.' +
        'Для детальнішої інформації перейдіть на наш сайт http://fainemisto.com.ua/', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Назад'],
                ['Меню'],
                ['Забронювати білет']
            ]
        })
    })
    location = 'info fest';
}
// ------------------ / AboutFest/ ---------------//

// ------------------ Group ---------------//
function aboutGroups() {
    bot.sendMessage(chatId, 'На ФайнаФесті братимуть участь такі українські гурти:\n' +
        'Океан Ельзи\n' +
        'Друга ріка\n' +
        'Антитіла\n' +
        'ТНМК\n' +
        'Тартак\n' +
        'Один в каноє\n' +
        'Фіолет\n' +
        'Скрябін та ін.',
        {
            reply_markup: JSON.stringify({
                keyboard: [
                    ['Назад'],
                    ['Меню'],
                    ['Забронювати білет']
                ]
            })
        });
    location = 'info group';
}
// ------------------ / Group / ---------------//

// ------------------ Локации ---------------//
function cityLocation() {
    bot.sendMessage(chatId, 'Основні локації нашого Фесту розташовані ' +
        'в Черкасах, Львові та Києві. Щоб дізнатися адресу, ' +
        'будь ласка, обери місто, що тебе цікавить.',
        {
            reply_markup: JSON.stringify({
                keyboard: [
                    ['Черкаси'],
                    ['Львів'],
                    ['Київ'],
                    ['Назад'],
                    ['Меню'],
                    ['Забронювати білет']
                ]
            })
        });
    location = 'info location';
}

function cherkassy() {
    bot.sendMessage(chatId, '…Fest в м. Черкаси буде тривати 3 дні (25 – 27 серпня) ' +
        'за адресою м.Черкаси, парк Долина Троянд (вулиця Гагаріна, ' +
        'берег Дніпра (Замковий узвіз).', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Назад'],
                ['Меню'],
                ['Забронювати білет']
            ]
        })
    });
    location = 'location cherkassy';
}
function lviv() {
    bot.sendMessage(chatId, 'Fest в м. Львів буде тривати 3 дні (29 – 31 серпня) ' +
        'за адресою  с. Родатичі недалеко від Львова, ' +
        'готельно-відпочинковий комплекс «Чарівна долина».', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Назад'],
                ['Меню'],
                ['Забронювати білет']
            ]
        })
    });
    location = 'location lviv';
}

function kiev() {
    bot.sendMessage(chatId, 'Fest в м. Київ буде тривати 3 дні (3 – 5 вересня)' +
        'за адресою  Експоцентр України (просп. Академіка Глушкова, 1)',
        {
            reply_markup: JSON.stringify({
                keyboard: [
                    ['Назад'],
                    ['Меню'],
                    ['Забронювати білет']
                ]
            })
        });
    location = 'location kiev';
}
// ------------------ / Локации / ---------------//

// Эта функция обрабатывает НАЗАД
// ------------------ BACK ---------------//
function back() {
    switch (location) {
        case 'info':
            start();
            break;
        case 'info fest':
            info();
            break;
        case 'info group':
            info();
            break;
        case 'info location':
            info();
            break;
        case 'location cherkassy':
            cityLocation();
            break;
        case 'location lviv':
            cityLocation();
            break;
        case 'location kiev':
            cityLocation();
            break;
    }
}
// ------------------ / BACK / ---------------//