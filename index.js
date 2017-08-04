var TelegramBot = require('node-telegram-bot-api'),
    token = '420737343:AAEFUaIA3R6vnycu7Yd9p76n_qGXOTMKf2g',
    bot = new TelegramBot(token, {
        polling: true
    });

var chatId;
var location;
var userName;

// ---- функция для рандомного числа ----//
function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}
// ----/ функция для рандомного числа /----//

bot.onText(/\/start/, start());

bot.on('message', function (msg) {
    chatId = msg.from.id;
    userName = msg.from.first_name;
    switch (msg.text) {
        case '/start':
            start();
            break;
        case 'Назад':
            back();
            break;
        case 'Меню':
            menu();
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
        case 'Фото':
            pictures();
            break;
        case 'Океан Ельзи':
            firstGroup();
            break;
        case 'Друга ріка':
            secondGroup();
            break;
        case 'Антитіла':
            thirdGroup();
            break;
        case 'Тартак':
            fourthGroup();
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

        //  -------------  Забронювати білет ----

        case 'Забронювати білет':
            reservation();
            break;
        case 'ЧЕРКАСИ':
            CherkassyTickets();
            break;
        case 'ЛЬВІВ':
            LvivTickets();
            break;
        case 'КИЇВ':
            KievTickets();
            break;
        case '1-й день':
            firstDay();
            break;
        case '2-й день':
            secondDay();
            break;
        case '3-й день':
            thirdDay();
            break;
        case 'На всі 3 дні':
            threeDays();
            break;
        case 'Відмінити бронь':
            cancelReservation();
            break;

    }

});

// Эта функция начинает разговор с пользователем
function start() {
    bot.sendMessage(chatId, 'Привіт ' + userName + ' :) Мене звати BotFestUa. ' +
        'Я допоможу тобі забронювати білети на фестиваль, ' +
        'а також трохи розповім про нього.');
    startSecPart();
}

function startSecPart() {
    bot.sendMessage(chatId, 'P.S. Якщо хочеш, щоб у нас з тобою все класно склалося, будь ласка, ' +
        'скористуйся пунктами меню :) ', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['ІНФО'],
                ['Забронювати білет']
            ]
        })
    });
    location = 'menu'
}

// Эта функция отправляет пользователю две кнопки главного меню


// ------------------  MENU   ---------------//
function menu() {
    bot.sendMessage(chatId, 'Обери, що тебе цікавить з пунктів меню :)',   {
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
    });
    location = 'info about something';
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
        'Скрябін та ін.' +
        '\n\n\n\nОбери групу із меню, щоб краще ознайомитися з нею.',
        {
            reply_markup: JSON.stringify({
                keyboard: [
                    ['Океан Ельзи'],
                    ['Друга ріка'],
                    ['Антитіла'],
                    ['Тартак'],
                    ['Назад'],
                    ['Меню'],
                    ['Забронювати білет']
                ]
            })
        });
    location = 'info about something';
}

function firstGroup() {
    bot.sendMessage(chatId, '«Океан Ельзи» — украинская рок-группа. Создана 12 октября' +
        ' 1994 года во Львове. Лидером и вокалистом группы является Святослав Вакарчук. ' +
        '\n\nhttps://www.youtube.com/watch?v=1ekDwY0WaP8', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Назад'],
                ['Меню'],
                ['Забронювати білет']
            ]
        })
    });
    location = 'about group';
}
function secondGroup() {
    bot.sendMessage(chatId, 'Друга Ріка — украинская рок-группа, созданная в начале' +
        ' 1996 года в городе Житомире, Украина. Википедия' +
        '\n\nhttps://www.youtube.com/watch?v=UaY8tJkk5Us', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Назад'],
                ['Меню'],
                ['Забронювати білет']
            ]
        })
    });
    location = 'about group';
}
function thirdGroup() {
    bot.sendMessage(chatId, '«Антитела» — украинская поп-рок-группа из Киева, возникшая' +
        ' в 2008 году. Фронтменом музыкального коллектива является Тарас Тополя. В репертуаре' +
        ' группы есть песни на украинском, а также английском и русском языках. ' +
        '\n\nhttps://www.youtube.com/watch?v=_o-15O7x5qk', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Назад'],
                ['Меню'],
                ['Забронювати білет']
            ]
        })
    });
    location = 'about group';
}
function fourthGroup() {
    bot.sendMessage(chatId, 'Тартак — украинская музыкальная группа. Выпустила 8 альбомов.' +
        '\n\nhttps://www.youtube.com/watch?v=VW5oddikCpQ', {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Назад'],
                ['Меню'],
                ['Забронювати білет']
            ]
        })
    });
    location = 'about group';
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
    location = 'info about everything';
}

function cherkassy() {
    bot.sendMessage(chatId, '…Fest в м. Черкаси буде тривати 3 дні (25 – 27 серпня) ' +
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
    location = 'about city';
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
    bot.sendLocation(chatId, 49.450890, 32.065012);
    location = 'about city';
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
    bot.sendLocation(chatId, 50.378491, 30.478936);
    location = 'about city';
}

// ------------------ / Локации / ---------------//


// ------------------  Photo  ---------------//
function pictures() {
    bot.sendPhoto(chatId, "http://cms.hostelworld.com/hwblog/wp-content/uploads/sites/2/2015/10/CsudaiS%C3%A1ndor-11.jpg");
    bot.sendPhoto(chatId, "http://vv-hotel.com/photos/11-calendar/summer_fest_zaxid/zahid_2_900.jpg");
    bot.sendPhoto(chatId, "https://expresstour.com.ua/upload/image/3333333.jpg");
    bot.sendPhoto(chatId, "https://v-ticket.com.ua/dynamic/event/gallery/007667_normal.jpg?v=81d9d3eeaaef");
    bot.sendPhoto(chatId, "http://rok.kiev.ua/wp-content/uploads/2016/08/zaxidfest.png");
    bot.sendPhoto(chatId, "http://pre-party.com.ua/uploads/2017/Olya_March/Afisha/Zaxidfest/Zahidfest_4.jpg");
    bot.sendMessage(chatId, "Круті фотографії, на фесті було файно )", {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Назад'],
                ['Меню'],
                ['Забронювати білет']
            ]
        })
    });
    location = 'photo';
}
// ------------------ / Photo/ ---------------//


// Эта функция обрабатывает НАЗАД
// ------------------ BACK ---------------//
function back() {
    switch (location) {
        case 'info':
           menu();
            break;
        case 'info about something':
            info();
            break;
        case 'info about everything':
            info();
            break;
        case 'photo':
            info();
            break;
        case 'about city':
            cityLocation();
            break;
        case 'about group':
            aboutGroups();
            break;

        //    ----------- Забронювати білет -----------

        case 'reservation':
            menu();
            break;
        case 'Some city':
            reservation();
            break;
    }
}
// ------------------ / BACK / ---------------//


//---------------ЗАБРОНЮВАТИ БІЛЕТ-------------//

function reservation() {
    bot.sendMessage(chatId, 'Друже, ти  на вірному шляху! ' +
        ' Вартість білету знаходиться в межах 350 - 600 грн, в залежності від кількості днів:\n\n' +
        '1 день = 350 грн.\n' +
        '2 дня = 500 грн.\n' +
        '3 дня = 600 грн.\n\n' +
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
    location = 'reservation';
}

// --- Забронювати по конкретному місту + запит на кількість днів -------------- //

function CherkassyTickets() {
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
    location = 'Some city';
}

function LvivTickets() {
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
    location = 'Some city';
}

function KievTickets() {
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
    location = 'Some city';

}
// --- Забронювати по конкретному місту + запит на кількість днів //


//----------------бронь за днями + на запит на введення імені-------------//

//--- бронь на 1-й день

function firstDay() {
    bot.sendMessage(chatId, 'Чудово!  Ти вибрав білет на перший день, вартість білета - 350 грн\n\n' +
        " введи своє повне ім'я, наприклад, Петренко Петро Петрович 😊", {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Відмінити бронь']
            ]
        })
    });
    location = 'some day';
}

// // ---- бронь на 2-й дні
function secondDay() {
    bot.sendMessage(chatId, 'Чудово!  Ти вибрав білет на другий день, вартість білета - 350 грн.\n\n' +
        " Далі введи своє повне ім'я, наприклад, Петренко Петро Петрович 😊", {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Відмінити бронь']
            ]
        })
    });
    location = 'some day';
}
// // ---- бронь на 3-й день
function thirdDay() {
    bot.sendMessage(chatId, 'Чудово!  Ти вибрав білет на третій день, вартість білета - 350 грн.\n\n' +
        " Далі введи своє повне ім'я, наприклад, Петренко Петро Петрович 😊", {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Відмінити бронь']
            ]
        })
    });
    location = 'some day';
}
// // ---- бронь на 3 дні
function threeDays() {
    bot.sendMessage(chatId, 'Чудово!  Ти вибрав білет на 3 дні, вартість білета - 600 грн.\n\n' +
        " Далі введи своє повне ім'я, наприклад, Петренко Петро Петрович 😊", {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Відмінити бронь']
            ]
        })
    });
    location = 'some day';
}

// ----------бронь за днями--------//



//--- Кнопка відміни бронь ----//

function cancelReservation() {
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
// -- Кнопка відмінити бронь ---- //



// ----------------- Форма-------------------------- //

// це форма для введення імені та пошти



//---------ЗАБРОНЮВАТИ БІЛЕТ---------//