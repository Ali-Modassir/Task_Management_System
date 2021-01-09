const mongoose = require("mongoose");
const { isEmail } = require("validator");

const contactSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  subject: String,
  message: String,
});

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
