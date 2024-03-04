const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const app = new express();
const conection = require('./services/conection');
const db = require('./services/databaseServices');
const path = require('path');

db.init(conection);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use('/', router);

console.log('the server is on!');
app.listen(8080);

//node server.js para executar