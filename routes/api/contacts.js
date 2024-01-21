const express = require("express");
const router = express.Router();
const contactsControllers = require("../../controllers/contactsControllers");
const validate = require("../../validation/validate");
const {
  createContactSchema,
  updateContactSchema,
} = require("../../validation/contactsValidation");

router.get("/", contactsControllers.listContacts);
router.get("/:contactId", contactsControllers.getContactById);
router.post("/", validate(createContactSchema), contactsControllers.addContact);
router.delete("/:contactId", contactsControllers.removeContact);
router.put(
  "/:contactId",
  validate(updateContactSchema),
  contactsControllers.updateContact
);
router.patch(
  "/:contactId/favorite",
  validate(updateContactSchema),
  contactsControllers.updateStatusContact
);

module.exports = router;
