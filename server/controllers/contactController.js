const Contact = require("../models/Contact");

module.exports.contact_us = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const contact = await new Contact({ name, email, subject, message });
    await contact.save();
    res.status(200).send("Contact created successfully");
  } catch (err) {
    res.json(err);
  }
};
