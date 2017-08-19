const express = require('express');
const cors = require('cors');
const {Event, Order} = require('./models');
const port = process.env.PORT || 5000;

const app = express();
const bodyParser = require('body-parser');
const asyncMiddleware = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const token = process.env.TELEGRAM_TOKEN || '420737343:AAEFUaIA3R6vnycu7Yd9p76n_qGXOTMKf2g';

app.use(cors());
app.use(bodyParser.json());
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

app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.listen(port, () => console.log(`API server listening on port ${port}`));