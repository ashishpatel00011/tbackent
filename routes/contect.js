const express = require('express');
const router = express.Router();
const Contact = require('../models/contect');  

router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        type: req.body.type,
        number: req.body.number,
        subject: req.body.subject,
        message: req.body.message
    });

    try {
        const newContact = await contact.save();
        res.status(201).json(newContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET a contact by ID
router.get('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (contact == null) {
            return res.status(404).json({ message: 'Cannot find contact' });
        }
        res.status(200).json(contact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (contact == null) {
            return res.status(404).json({ message: 'Cannot find contact' });
        }
        await contact.remove();
        res.status(200).json({ message: 'Contact deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
