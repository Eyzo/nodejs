const config = require('./config.json');
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const members = require('./Router/MemberRouter');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(config.endpoint + '/member', members);

app.listen(config.port);