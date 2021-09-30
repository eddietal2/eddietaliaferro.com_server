const express = require("express");
const router  = express.Router();
var projectController = require('../controller/project-controller')

router.get('/', (req, res) => {
  res.send('This is working.')
})


module.exports = router;