const express = require('express');
const router = express.Router();

// Do work here
router.get('/', (req, res) => {
  res.render('hello', {
    name: "Hannah",
    dog: req.query.dog,
  });
});

module.exports = router;
