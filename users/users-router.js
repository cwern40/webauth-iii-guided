const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');
const { sub, role } = req.decodedToken;

router.get('/', restricted, (req, res) => {

  if (role === 'admin') {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
  } else {
    Users.findById(sub)
      .then(user => {
        res.json(user);
      })
      .catch(err => )
  }
});

module.exports = router;
