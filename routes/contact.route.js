const express = require("express");
const router  = express.Router();
var contactController = require('../controller/contact-controller')

router.get('/get-contact-messages', contactController.getMessages);
router.post('/send-contact-message', contactController.sendMessage);
router.post('/delete-contact-message', contactController.deleteMessage);

module.exports = router;