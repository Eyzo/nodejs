const utils = require('./../Utils/ResponseUtils');
const express = require('express');

/**
 * @type {Array.<{id: Number, first_name: String, last_name: String}>} members
 */
const members = require('./../Data/members.json');
const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.get('/', (req, res) => {
  res.json(utils.responseSuccess('Résultats', members));
});

router.post('/create', (req, res) => {
  members.push({
    id: members.length + 1,
    first_name: req.body.first_name,
    last_name: req.body.last_name
  });
  res.json(utils.responseSuccess('Ajout bien effectué', members));
});

module.exports = router;