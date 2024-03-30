const utils = require('./../Utils/ResponseUtils');
const express = require('express');
const fs = require('fs');

/**
 * @type {Array.<{id: Number, first_name: String, last_name: String}>} members
 */
const members = require('./../Data/members.json');
const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.get('/', (req, res) => {
  return res.json(utils.responseSuccess('Résultats', members));
});

router.post('/create', (req, res) => {
  members.push({
    id: members.length + 1,
    first_name: req.body.first_name,
    last_name: req.body.last_name
  });
  const data = JSON.stringify(members);
  fs.writeFile('./Data/members.json', data, (err) => {
    res.json(utils.responseSuccess('Ajout bien effectué', members));
  });
  return;
});
router.put('/update/:id', (req, res) => {
  const {id} = req.params;
  const member = members[id - 1];
  const {first_name, last_name} = req.body
  if (member) {
    member.first_name = first_name;
    member.last_name = last_name;
    const data = JSON.stringify(members);
    fs.writeFile('./Data/members.json', data, (err) => {
      res.json(utils.responseSuccess('Modification bien effectué', members));
    });
    return;
  }
  return res.json(utils.responseError("L'utilisateur recherché n'existe pas", member));
});

router.delete('/delete/:id', (req, res) => {
  const {id} = req.params;
  const data = JSON.stringify(members);
  const member = members[id - 1];
  console.log(member);
  if (member) {
    members.splice(id - 1, 1);
    fs.writeFile('./Data/members.json', data, (err) => {
      res.json(utils.responseSuccess(`L'utilisateur ${id} à bien été supprimé`, members));
    });
    return;
  }
  return res.json(utils.responseError("L'utilisateur recherché n'existe pas", member));
});

router.get('/:id', (req, res) => {
  const {id} = req.params;
  const member = members[id - 1];
  if (member) {
    return res.json(utils.responseSuccess('Utilisateur', member));
  }
  return res.json(utils.responseError("L'utilisateur recherché n'existe pas", member));
});

module.exports = router;