// const config                  = require("config");
const mongoose                = require("mongoose");
const express                 = require("express");
const fs                      = require("fs");
// const passport 	              = require('passport');
const app                     = express();
const cors                    = require('cors');
const dotenv                  = require('dotenv');

// Routes
const contactRoute = require('./routes/contact.route');
const blogRoute = require('./routes/blog.route');
const donateRoute = require('./routes/donate.route');
const projectRoute = require('./routes/project.route');
const userRoute = require('./routes/user.route');
const pictureRoute = require('./routes/pictures.route');

// Configure Environment Variables
dotenv.config();

console.log(process.env.DB_HOST_DEV)

// JSON Web Token config
// use config module to get the privatekey, if no private key set, end the application

// config and connect to mongodb
console.log('Connecting via Mongoose');
mongoose
  // For DeprecationWarning:  collection.ensureIndex is deprecated.  Use createIndexes instead.

  .set('useCreateIndex', true)
  .set('useFindAndModify', false)

  .connect(process.env.DB_HOST_DEV, {
    useNewUrlParser: true, useUnifiedTopology: true
  })

  .then(() => console.log('Connected to MongoDB'))

  .catch(err => console.log(err))

// Add middleware + routes
app.use(cors());
app.use(express.json())

app.use("/blog", blogRoute);
app.use("/contact", contactRoute);
app.use("/donate", donateRoute);
app.use("/project", projectRoute);
app.use("/user", userRoute);
app.use("/pictures", pictureRoute);

// Listen on port...
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))