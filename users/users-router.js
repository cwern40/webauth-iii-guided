const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
  const { sub, role } = req.decodedToken;

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
      .catch(err => {
        console.log(err)
        res.status(500).json({
          message: "error in application"
        })
      })
  }
});

module.exports = router;
