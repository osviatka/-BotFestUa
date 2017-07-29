const {Event, Order, sequelize} = require('./models');

async function seed() {
    await sequelize.sync();
    await Event.create({city: 'Черкаси', type: 'first', date: '2017-08-25'});
    await Event.create({city: 'Черкаси', type: 'second', date: '2017-08-26'});
    await Event.create({city: 'Черкаси', type: 'third', date: '2017-08-27'});
    await Event.create({city: 'Черкаси', type: 'all', date: '2017-08-25'});
    await Event.create({city: 'Львів', type: 'first', date: '2017-08-29'});
    await Event.create({city: 'Львів', type: 'second', date: '2017-08-30'});
    await Event.create({city: 'Львів', type: 'third', date: '2017-08-31'});
    await Event.create({city: 'Львів', type: 'all', date: '2017-08-29'});
    await Event.create({city: 'Київ', type: 'first', date: '2017-09-03'});
    await Event.create({city: 'Київ', type: 'second', date: '2017-09-04'});
    await Event.create({city: 'Київ', type: 'third', date: '2017-09-05'});
    await Event.create({city: 'Київ', type: 'all', date: '2017-09-03'});
};

seed();
