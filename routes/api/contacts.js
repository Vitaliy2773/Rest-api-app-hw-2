const express = require("express");
const router = express.Router();
const contactsControllers = require("../../controllers/contactsControllers");
const { validateContact } = require("../../validation/contactsValidation");

router.get("/", contactsControllers.listContacts);
router.get("/:contactId", contactsControllers.getContactById);
router.post("/", validateContact, contactsControllers.addContact);
router.delete("/:contactId", contactsControllers.removeContact);
router.put("/:contactId", validateContact, contactsControllers.updateContact);

module.exports = router;
