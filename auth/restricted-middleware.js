const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log('failed verification', err);
        res.status(401).json({
          message: 'not verified'
        })
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    })
  } else [
    res.status(400).json({
      message: 'Please log in'
    })
  ]
};
