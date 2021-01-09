const { Router } = require("express");
const contactController = require("../controllers/contactController");
const router = Router();

router.post("/contactUs", contactController.contact_us);

module.exports = router;
