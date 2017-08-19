const TelegramBot = require('node-telegram-bot-api');
const validator = require("email-validator");
const moment = require('moment');
const {Event, Order} = require('./models');
const token = process.env.TELEGRAM_TOKEN || '420737343:AAEFUaIA3R6vnycu7Yd9p76n_qGXOTMKf2g';
const ticketsCount = 10;
const bot = new TelegramBot(token, {
    polling: true
});
const port = process.env.PORT || 5000;
const state = {};
const express = require('express');
const cors = require('cors');
const asyncMiddleware = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

const app = express();
const url = 'https://safe-ocean-70918.herokuapp.com';
bot.setWebHook(`${url}/bot${token}`);
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.post(`/bot${token}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});


moment.locale('uk');
function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}

bot.on('message', (msg) => {
    const chatId = msg.from.id;
    if (!state[chatId]) state[chatId] = {};
    switch (msg.text) {
        case '/start':
            start(msg);
            break;
        case 'Назад':
            back(msg);
            break;
        case 'Меню':
            menu(msg);
            break;
        case 'ІНФО':
            info(msg);
            break;
        case 'Мої замовлення':
            myOrders(chatId);
            break;
        case 'Про фестиваль':
            aboutFest(msg);
            break;
        case 'Групи':
            aboutGroups(msg);
            break;
        case 'Фото':
            pictures(msg);
            break;
        case 'Океан Ельзи':
            firstGroup(msg);
            break;
        case 'Друга ріка':
            secondGroup(msg);
            break;
        case 'Антитіла':
            thirdGroup(msg);
            break;
        case 'Тартак':
            fourthGroup(msg);
            break;
        case 'ТНМК':
            fifthGroup(msg);
            break;
        case 'Один в каное':
            sixthGroup(msg);
            break;
        case 'Фіолет':
            seventhGroup(msg);
            break;
        case 'Воплі Відоплясова':
            eighthGroup(msg);
            break;
        case 'BRUTTO':
            ninthGroup(msg);
            break;
        case 'Локації':
            cityLocation(msg);
            break;
        case 'Черкаси':
            cherkassy(msg);
            break;
        case 'Львів':
            lviv(msg);
            break;
        case 'Київ':
            kiev(msg);
            break;
        case 'Забронювати білет':
            reservation(msg);
            break;
        case 'ЧЕРКАСИ':
            CherkassyTickets(msg);
            break;
        case 'ЛЬВІВ':
            LvivTickets(msg);
            break;
        case 'КИЇВ':
            KievTickets(msg);
            break;
        case '1-й день':
            firstDay(msg);
            break;
        case '2-й день':
            secondDay(msg);
            break;
        case '3-й день':
            thirdDay(msg);
            break;
        case 'На всі 3 дні':
            threeDays(msg);
            break;
        case 'Відмінити бронь':
            cancelReservation(msg);
            break;
        default:
            inputData(msg);
    }
    console.log(state)
});

function start(msg) {
    const chatId = msg.from.id;
    bot.sendMessage(chatId, 'Привіт ' + msg.from.first_name + ' :) Мене звати BotFestUa. ' +
        'Я допоможу тобі забронювати білети на фестиваль, ' +
        'а також трохи розповім про нього.');
    startSecPart(chatId);
}

async function startSecPart(chatId) {
    const ordersCount = await Order.count({where: {telegramId: chatId}});
    const keyboard = [['ІНФО'], ['Забронювати білет']];
    if (ordersCount) keyboard.push(['Мої замовлення']);
    bot.sendMessage(chatId, 'P.S. Якщо хочеш, щоб у нас з тобою все класно склалося, будь ласка, ' +
        'скористайся пунктами меню :) ', {
        reply_markup: JSON.stringify({keyboard})
    });
    state[chatId].location = 'menu'
}

async function menu(msg) {
    const chatId = msg.from.id;
    const ordersCount = await Order.count({where: {telegramId: chatId}});
    const keyboard = [['ІНФО'], ['Забронювати білет']];
    if (ordersCount) keyboard.push(['Мої замовлення']);
    bot.sendMessage(chatId, 'Обери, що тебе цікавить з пунктів меню :)',   {
        reply_markup: JSON.stringify({keyboard})
    });
    state[chatId].location = 'menu';
}

function info(msg) {
    const chatId = msg.from.id;
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
    state[chatId].location = 'info';
}

async function myOrders(chatId) {
    const events = await Event.all();
    let orders = await Order.findAll({where: {telegramId: chatId}});
    orders = orders.map((order) => {
        const event = events.find(e => e.id === order.eventId);
        return `Номер замовлення: ${order.id},\nМісто: ${event.city}\nДата: ${moment(event.date).format('LL')}`;
    }).join('\n\n');
    bot.sendMessage(chatId, `Твої замовлення: \n${orders}`);
}

function aboutFest(msg) {
    const chatId = msg.from.id;
    bot.sendMessage(chatId, 'Фестиваль FestUa традиційно пройде в трьох містах України (Черкаси - 25-27 серпня, ' +
        'Львів - 29-31 серпня, Київ - 3-5 вересня)  під лозунгом "Музика єднає".' +
        'Тут можна знайти все для комфортного та якісного відпочинку, ' +
        'що робить фестиваль самобутньою і самодостатньою подією, ' +
        'яку наші відвідувачі з нетерпінням чекають цілий рік.' +
        'Для детальнішої інформації перейдіть на наш сайт https://yarmolenkod.github.io/fest.ua/', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Назад'],
                ['Меню'],
                ['Забронювати білет']
            ]
        })
    });
    state[chatId].location = 'info about something';
}

function aboutGroups(msg) {
    const chatId = msg.from.id;
    bot.sendMessage(chatId, 'На FestUa братимуть участь круті українські гурти.\n' +
        '\nОбери групу із меню, щоб краще ознайомитися з нею.',
        {
            reply_markup: JSON.stringify({
                keyboard: [
                    ['Океан Ельзи'],
                    ['Друга ріка'],
                    ['Антитіла'],
                    ['Тартак'],
                    ['ТНМК'],
                    ['Один в каное'],
                    ['Фіолет'],
                    ['Воплі Відоплясова'],
                    ['BRUTTO'],
                    ['Назад'],
                    ['Меню'],
                    ['Забронювати білет']
                ]
            })
        });
    state[chatId].location = 'info about something';
}

function firstGroup(msg) {
    const chatId = msg.from.id;
    bot.sendMessage(chatId, '«Океан Ельзи» —  український рок-гурт, створений' +
        ' 1994 року у Львові. Лідером та вокалістом гурту є Святослав Вакарчук. ' +
        '\n\nhttps://www.youtube.com/watch?v=1ekDwY0WaP8', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Друга ріка'],
                ['Антитіла'],
                ['Тартак'],
                ['ТНМК'],
                ['Один в каное'],
                ['Фіолет'],
                ['Воплі Відоплясова'],
                ['BRUTTO'],
                ['Назад'],
                ['Меню'],
                ['Забронювати білет']
            ]
        })
    });
    state[chatId].location = 'about group';
}
function secondGroup(msg) {
    const chatId = msg.from.id;
    bot.sendMessage(chatId, 'Друга Ріка — український рок-гурт, створений на початку' +
        ' 1996 року в Житомирі. Лідером гурту є Валерій Харчишин.' +
        '\n\nhttps://www.youtube.com/watch?v=UaY8tJkk5Us', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Океан Ельзи'],
                ['Антитіла'],
                ['Тартак'],
                ['ТНМК'],
                ['Один в каное'],
                ['Фіолет'],
                ['Воплі Відоплясова'],
                ['BRUTTO'],
                ['Назад'],
                ['Меню'],
                ['Забронювати білет']
            ]
        })
    });
    state[chatId].location = 'about group';
}
function thirdGroup(msg) {
    const chatId = msg.from.id;
    bot.sendMessage(chatId, '«Антитіла» — український поп-рок-гурт із Києва, що виник у 2008 році. ' +
        'Фронтменом групи є Тарас Тополя. Репертуар «Антитіл» ' +
        'складається з пісень українською, а також англійською та російською мовами. ' +
        '\n\nhttps://www.youtube.com/watch?v=_o-15O7x5qk', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Океан Ельзи'],
                ['Друга ріка'],
                ['Тартак'],
                ['ТНМК'],
                ['Один в каное'],
                ['Фіолет'],
                ['Воплі Відоплясова'],
                ['BRUTTO'],
                ['Назад'],
                ['Меню'],
                ['Забронювати білет']
            ]
        })
    });
    state[chatId].location = 'about group';
}
function fourthGroup(msg) {
    const chatId = msg.from.id;
    bot.sendMessage(chatId, 'Тартак —  український репкор-гурт, заснований у Луцьку 1996 року.' +
        '\n\nhttps://www.youtube.com/watch?v=VW5oddikCpQ', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Океан Ельзи'],
                ['Друга ріка'],
                ['Антитіла'],
                ['ТНМК'],
                ['Один в каное'],
                ['Фіолет'],
                ['Воплі Відоплясова'],
                ['BRUTTO'],
                ['Назад'],
                ['Меню'],
                ['Забронювати білет']
            ]
        })
    });
    state[chatId].location = 'about group';
}

function fifthGroup(msg) {
    const chatId = msg.from.id;
    bot.sendMessage(chatId, 'ТНМК — український гурт, що виконує музику в стилях репкор, хіп-хоп, рок та фанк.' +
        '\n\nhttps://www.youtube.com/watch?v=E5ZZN243r60', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Океан Ельзи'],
                ['Друга ріка'],
                ['Антитіла'],
                ['Тартак'],
                ['Один в каное'],
                ['Фіолет'],
                ['Воплі Відоплясова'],
                ['BRUTTO'],
                ['Назад'],
                ['Меню'],
                ['Забронювати білет']
            ]
        })
    });
    state[chatId].location = 'about group';
}

function sixthGroup(msg) {
    const chatId = msg.from.id;
    bot.sendMessage(chatId, 'Оди́н в кано́е — український музичний інді-гурт зі Львова.' +
        '\n\nhttps://www.youtube.com/watch?v=9ea4vNoJpt4', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Океан Ельзи'],
                ['Друга ріка'],
                ['Антитіла'],
                ['Тартак'],
                ['ТНМК'],
                ['Фіолет'],
                ['Воплі Відоплясова'],
                ['BRUTTO'],
                ['Назад'],
                ['Меню'],
                ['Забронювати білет']
            ]
        })
    });
    state[chatId].location = 'about group';
}

function seventhGroup(msg) {
    const chatId = msg.from.id;
    bot.sendMessage(chatId, 'Фіоле́т — музичний гурт з міста Луцька, який виник у 2009-му році.' +
        '\n\nhttps://www.youtube.com/watch?v=Ef_RwaDb1_Q', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Океан Ельзи'],
                ['Друга ріка'],
                ['Антитіла'],
                ['Тартак'],
                ['ТНМК'],
                ['Один в каное'],
                ['Воплі Відоплясова'],
                ['BRUTTO'],
                ['Назад'],
                ['Меню'],
                ['Забронювати білет']
            ]
        })
    });
    state[chatId].location = 'about group';
}

function eighthGroup(msg) {
    const chatId = msg.from.id;
    bot.sendMessage(chatId, 'Воплі Відоплясова — український рок-гурт, створений у 1986 році. Лідером гурту є вокаліст Олег Скрипка.' +
        '\n\nhttps://www.youtube.com/watch?v=Y9QCN-3o8q0', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Океан Ельзи'],
                ['Друга ріка'],
                ['Антитіла'],
                ['Тартак'],
                ['ТНМК'],
                ['Один в каное'],
                ['Фіолет'],
                ['BRUTTO'],
                ['Назад'],
                ['Меню'],
                ['Забронювати білет']
            ]
        })
    });
    state[chatId].location = 'about group';
}

function ninthGroup(msg) {
    const chatId = msg.from.id;
    bot.sendMessage(chatId, 'BRUTTO — панк-рок-гурт Сергія Міхалка, заснований ним після припинення існування колективу «Ляпис Трубецкой».' +
        '\n\nhttps://www.youtube.com/watch?v=DKNWS2eKD4U', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Океан Ельзи'],
                ['Друга ріка'],
                ['Антитіла'],
                ['Тартак'],
                ['ТНМК'],
                ['Один в каное'],
                ['Воплі Відоплясова'],
                ['Назад'],
                ['Меню'],
                ['Забронювати білет']
            ]
        })
    });
    state[chatId].location = 'about group';
}

// ------------------ Локации ---------------//
function cityLocation(msg) {
    const chatId = msg.from.id;
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
    state[chatId].location = 'info about everything';
}

function cherkassy(msg) {
    const chatId = msg.from.id;
    bot.sendMessage(chatId, 'FestUa в м. Черкаси буде тривати 3 дні (25 – 27 серпня) ' +
        'за адресою м.Черкаси, парк Долина Троянд (вулиця Гагаріна, ' +
        'берег Дніпра (Замковий узвіз).' +
        '\n', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Назад'],
                ['Меню'],
                ['Забронювати білет']
            ]
        })
    });
    bot.sendLocation(chatId, 49.450890, 32.065012);
    state[chatId].location = 'about city';
}

function lviv(msg) {
    const chatId = msg.from.id;
    bot.sendMessage(chatId, 'FestUa в м. Львів буде тривати 3 дні (29 – 31 серпня) ' +
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
    bot.sendLocation(chatId, 49.7857744, 23.4995676);
    state[chatId].location = 'about city';
}

function kiev(msg) {
    const chatId = msg.from.id;
    bot.sendMessage(chatId, 'FestUa в м. Київ буде тривати 3 дні (3 – 5 вересня)' +
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
    bot.sendLocation(chatId, 50.378491, 30.478936);
    state[chatId].location = 'about city';
}

// ------------------ / Локации / ---------------//


// ------------------  Photo  ---------------//
function pictures(msg) {
    const chatId = msg.from.id;
    bot.sendMessage(chatId, "http://telegra.ph/Fotograf%D1%96i-z-festu-08-19"); {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Назад'],
                ['Меню'],
                ['Забронювати білет']
            ]
        })
    };
    state[chatId].location = 'photo';
}
// ------------------ / Photo/ ---------------//


// Эта функция обрабатывает НАЗАД
// ------------------ BACK ---------------//
function back(msg) {
    const chatId = msg.from.id;
    switch (state[chatId].location) {
        case 'info':
            menu(msg);
            break;
        case 'info about something':
            info(msg);
            break;
        case 'info about everything':
            info(msg);
            break;
        case 'photo':
            info(msg);
            break;
        case 'about city':
            cityLocation(msg);
            break;
        case 'about group':
            aboutGroups(msg);
            break;

        //    ----------- Забронювати білет -----------

        case 'reservation':
            menu(msg);
            break;
        case 'Some city':
            reservation(msg);
            break;
    }
}
// ------------------ / BACK / ---------------//


//---------------ЗАБРОНЮВАТИ БІЛЕТ-------------//

function reservation(msg) {
    const chatId = msg.from.id;
    bot.sendMessage(chatId, 'Друже, ти  на вірному шляху! ' +
        ' Вартість білету знаходиться в межах 250 - 600 грн, в залежності від кількості днів:\n\n' +
        '1 день = 250 грн.\n' +
        '3 дні = 600 грн.\n\n' +
        'Наступним кроком вибери потрібне місто:)', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['ЧЕРКАСИ'],
                ['ЛЬВІВ'],
                ['КИЇВ'],
                ['Назад']
            ]
        })
    });
    state[chatId].location = 'reservation';
}

// --- Забронювати по конкретному місту + запит на кількість днів -------------- //

function CherkassyTickets(msg) {
    const chatId = msg.from.id;
    state[chatId].city = 'Черкаси';
    bot.sendMessage(chatId, 'Добре!  Обери, буль ласка, який день тебе цікавить. Наразі ти можеш обрати або 1 день, або 3.\n\n' +
        'Якщо ти хочеш відвідати котрісь 2 дні, то повтори бронь ще раз. Дякую тобі за розуміння!', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['1-й день'],
                ['2-й день'],
                ['3-й день'],
                ['На всі 3 дні'],
                ['Назад']
            ]
        })
    });
    state[chatId].location = 'Some city';
}

function LvivTickets(msg) {
    const chatId = msg.from.id;
    state[chatId].city = 'Львів';
    bot.sendMessage(chatId, 'Добре!  Обери, буль ласка, який день тебе цікавить. Наразі ти можеш обрати або 1 день, або 3.\n\n' +
        'Якщо ти хочеш відвідати котрісь 2 дні, то повтори бронь ще раз. Дякую тобі за розуміння!', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['1-й день'],
                ['2-й день'],
                ['3-й день'],
                ['На всі 3 дні'],
                ['Назад']
            ]
        })
    });
    state[chatId].location = 'Some city';
}

function KievTickets(msg) {
    const chatId = msg.from.id;
    state[chatId].city = 'Київ';
    bot.sendMessage(chatId, 'Добре!  Обери, буль ласка, який день тебе цікавить. Наразі ти можеш обрати або 1 день, або 3.\n\n' +
        'Якщо ти хочеш відвідати котрісь 2 дні, то повтори бронь ще раз. Дякую тобі за розуміння!', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['1-й день'],
                ['2-й день'],
                ['3-й день'],
                ['На всі 3 дні'],
                ['Назад']
            ]
        })
    });
    state[chatId].location = 'Some city';

}
// --- Забронювати по конкретному місту + запит на кількість днів //

//----------------бронь за днями + на запит на введення імені-------------//

async function firstDay(msg) {
    const chatId = msg.from.id;
    state[chatId].eventType = 'first';
    const {city, eventType} = state[chatId];
    const event = await Event.findOne({where: {city, type: eventType}});
    const count = await Order.count({where: {eventId: event.id}});
    if (count < ticketsCount) {
        bot.sendMessage(chatId, 'Чудово!  Ти вибрав білет на перший день, вартість білета - 250 грн.\n\n' +
            " Введи своє повне ім'я, наприклад, Петренко Петро Петрович 😊", {
            reply_markup: JSON.stringify({
                keyboard: [
                    ['Відмінити бронь']
                ]
            })
        });
        state[chatId].location = 'some day';
    } else {
        bot.sendMessage(chatId, `Вибач( Але всі ${ticketsCount} квитків уже розпродано( Спробуй інше місто.`, {
            reply_markup: JSON.stringify({
                keyboard: [
                    ['ЧЕРКАСИ'],
                    ['ЛЬВІВ'],
                    ['КИЇВ'],
                    ['Назад']
                ]
            })
        });
        state[chatId].location = 'reservation';
    }
}

async function secondDay(msg) {
    const chatId = msg.from.id;
    state[chatId].eventType = 'second';
    const {city, eventType} = state[chatId];
    const event = await Event.findOne({where: {city, type: eventType}});
    const count = await Order.count({where: {eventId: event.id}});
    if (count < ticketsCount) {
        bot.sendMessage(chatId, 'Чудово!  Ти вибрав білет на другий день, вартість білета - 250 грн.\n\n' +
            " Далі введи своє повне ім'я, наприклад, Петренко Петро Петрович 😊", {
            reply_markup: JSON.stringify({
                keyboard: [
                    ['Відмінити бронь']
                ]
            })
        });
        state[chatId].location = 'some day';
    } else {
        bot.sendMessage(chatId, `Вибач( Але всі ${ticketsCount} квитків уже розпродано( Спробуй інше місто.`, {
            reply_markup: JSON.stringify({
                keyboard: [
                    ['ЧЕРКАСИ'],
                    ['ЛЬВІВ'],
                    ['КИЇВ'],
                    ['Назад']
                ]
            })
        });
        state[chatId].location = 'reservation';
    }
}

async function thirdDay(msg) {
    const chatId = msg.from.id;
    state[chatId].eventType = 'third';
    const {city, eventType} = state[chatId];
    const event = await Event.findOne({where: {city, type: eventType}});
    const count = await Order.count({where: {eventId: event.id}});
    if (count < ticketsCount) {
        bot.sendMessage(chatId, 'Чудово!  Ти вибрав білет на третій день, вартість білета - 250 грн.\n\n' +
            " Далі введи своє повне ім'я, наприклад, Петренко Петро Петрович 😊", {
            reply_markup: JSON.stringify({
                keyboard: [
                    ['Відмінити бронь']
                ]
            })
        });
        state[chatId].location = 'some day';
    } else {
        bot.sendMessage(chatId, `Вибач( Але всі ${ticketsCount} квитків уже розпродано( Спробуй інше місто.`, {
            reply_markup: JSON.stringify({
                keyboard: [
                    ['ЧЕРКАСИ'],
                    ['ЛЬВІВ'],
                    ['КИЇВ'],
                    ['Назад']
                ]
            })
        });
        state[chatId].location = 'reservation';
    }
}

async function threeDays(msg) {
    const chatId = msg.from.id;
    state[chatId].eventType = 'all';
    const {city, eventType} = state[chatId];
    const event = await Event.findOne({where: {city, type: eventType}});
    const count = await Order.count({where: {eventId: event.id}});
    if (count < ticketsCount) {
        bot.sendMessage(chatId, 'Чудово!  Ти вибрав білет на 3 дні, вартість білета - 600 грн.\n\n' +
            " Далі введи своє повне ім'я, наприклад, Петренко Петро Петрович 😊", {
            reply_markup: JSON.stringify({
                keyboard: [
                    ['Відмінити бронь']
                ]
            })
        });
        state[chatId].location = 'some day';
    } else {
        bot.sendMessage(chatId, `Вибач( Але всі ${ticketsCount} квитків уже розпродано( Спробуй інше місто.`, {
            reply_markup: JSON.stringify({
                keyboard: [
                    ['ЧЕРКАСИ'],
                    ['ЛЬВІВ'],
                    ['КИЇВ'],
                    ['Назад']
                ]
            })
        });
        state[chatId].location = 'reservation';
    }
}


function inputData(msg) {
    const chatId = msg.from.id;
    if (state[chatId].location == 'some day') {
        inputName(chatId, msg.text);
    } else if (state[chatId].location == 'order user name') {
        inputEmail(chatId, msg.text);
    } else {
        const chatId = msg.from.id;
        bot.sendMessage(chatId, 'Вибач, але я тебе не розумію( Для спілкування зі мною використовуй кнопки із меню. Дякую)', {
            reply_markup: JSON.stringify({
                keyboard: [
                    ['ІНФО'],
                    ['Забронювати білет'],
                    ['Мої замовлення']
                ]
            })
        });
    }
}


function inputName(chatId, text) {
    state[chatId].fullName = text;
    bot.sendMessage(chatId, 'Чудово!  Тепер введи свій email :)', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Відмінити бронь']
            ]
        })
    });
    state[chatId].location = 'order user name';
}

async function inputEmail(chatId, text) {
    if (!validator.validate(text)) {
        bot.sendMessage(chatId, 'Ойч...Здається ти зробив помилку при вводі email( \n' +
            'Спробуй, будь ласка, ще раз 😉'  , {
            reply_markup: JSON.stringify({
                keyboard: [
                    ['Відмінити бронь']
                ]
            })
        });
        return;
    }
    state[chatId].email = text;
    const {city, eventType, fullName, email} = state[chatId];
    const event = await Event.findOne({where: {city, type: eventType}});
    const order = await Order.create({eventId: event.id, telegramId: chatId, fullName, email});
    bot.sendMessage(chatId, `Чудово!  Твій білет заброньовано! Номер броні - ${order.id}.` +
        ' Свій білет ти зможеш отримати у найблищих касах міста. ', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['ІНФО'],
                ['Забронювати білет'],
                ['Мої замовлення']
            ]
        })
    });
    state[chatId].location = 'order email';
}

function cancelReservation(msg) {
    const chatId = msg.from.id;
    bot.sendMessage(chatId, 'Бронювання відмінено! Я розумію - це важливе рішення...' +
        'Може знову прочитаєш про фест? \n Коли будеш готовий забронювати білет,скористайся головним меню.' +  '' +
        ' Я буду радий тобі допомогти!', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['ІНФО'],
                ['Забронювати білет']
            ]
        })
    });
}

app.use(cors());

app.get('/', (req, res) => {
    res.send({name: 'festuabot', ver: '0.0.1'});
});

app.get('/stats', asyncMiddleware(async (req, res, next) => {
    res.send({
        counts: {
            cherkasy: await Order.count({where: {eventId: {$between: [1, 4]}}}),
            lviv: await Order.count({where: {eventId: {$between: [5, 8]}}}),
            kyiv: await Order.count({where: {eventId: {$between: [9, 12]}}})
        }
    });
}));



app.listen(port, () => console.log(`API server listening on port ${port}`));