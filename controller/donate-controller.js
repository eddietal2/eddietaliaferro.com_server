const Donate = require('../models/donate.model');

exports.getDonations = (req, res) => {
  console.log('Getting Messages...');
  Contact.find((err, messages) => {
    if(err) {
      console.log(err);
      return res.status(400).json(err)
    }
    if(!messages) {
      console.log('There were no Messages! Uh oh!');
      return res.status(400).json({msg: 'There were no Message!'})
    }
    if(messages) {
      console.log(messages);
      return res.status(200).json({
        messageCount: messages.length,
        messages
      })
    }
  });
}

exports.sendDonation = (req, res) => {
  console.log('Sending Donation...')
  console.log(req.body)
  let fullName = req.body.name;
  let email = req.body.email;
  let message = req.body.message;
  let amount = req.body.amount;
  let date = Date.now();

  // if(!fullName || !email || !message) {
  //   return res.status(400).json({msg: 'Donation does not have all properties!'})
  // }

  newDonation = Donate({
    fullName,
    email,
    message,
    amount,
    date
  });

  newDonation.save(
    (err, message) => {
      if(err) {
        console.log(err);
        return res.status(400).json(err);}
      if(!message) {
        console.log('No Message saved!');
        return res.status(400).json({msg: 'There was no message that saved.'})
      }
      if(message) {
        return res.status(200).json(message)
      }
    }
  )
}

exports.deleteDonation = (req, res) => {
  console.log('Delete Message...')
  console.log(req.body);
  let id = req.body.id;
  let deletedMessage;
  Contact.findByIdAndDelete(
    id,
    (err, message) => {
    if(err) {
      console.log(err);
      return res.status(400).json(err)
    }
    if(!message) {
      console.log('There were no Messages! Uh oh!');
      return res.status(400).json({msg: 'There were no Message!'})
    }
    if(message) {
      console.log(message);
      deletedMessage = message;
      Contact.find((err, messages) => {
        if(err) {
          console.log(err);
          return res.status(400).json(err)
        }
        if(!messages) {
          console.log('There were no Messages! Uh oh!');
          return res.status(400).json({msg: 'There were no Message!'})
        }
        if(messages) {
          console.log(messages);
          return res.status(200).json({
            messageCount: messages.length,
            deletedMessage,
            messages
          })
        }
      });
    }
  });
}