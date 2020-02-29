// server.js
require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());



const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;



webPush.setVapidDetails('mailto:monsefigueroa.lagos@gmail.com', publicVapidKey, privateVapidKey);
app.set('port', process.env.PORT || 5000);

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({ title: 'test' });

  console.log(subscription);

  webPush.sendNotification(subscription, payload).catch(error => {
    console.error(error.stack);
  });
});

app.use(express.static(path.join(__dirname, 'static/Scripts')));


const server = app.listen(app.get('port'), () => {
  console.log('Express running → PORT ${server.address().port}');
});