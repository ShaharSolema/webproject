const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

// Create a client
router.post('/', async (req, res) => {
  const client = new Client(req.body);
  try {
    await client.save();
    res.status(201).send(client);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all clients
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).send(clients);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a single client
router.get('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).send();
    res.status(200).send(client);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a client
router.patch('/:id', async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!client) return res.status(404).send();
    res.status(200).send(client);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a client
router.delete('/:id', async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).send();
    res.status(200).send(client);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
