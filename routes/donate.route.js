const express = require("express");
const router  = express.Router();
var donateController = require('../controller/donate-controller')

router.get('/get-donations', donateController.getDonations);
router.post('/send-donation', donateController.sendDonation);
router.post('/delete-donation', donateController.deleteDonation);

module.exports = router;