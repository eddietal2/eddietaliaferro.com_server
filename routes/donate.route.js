const express = require("express");
const router  = express.Router();
var donateController = require('../controller/donate-controller')

router.get('/', (req, res) => {
  res.send('This is working.')
})

module.exports = router;