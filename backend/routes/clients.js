const express = require('express');
const router = express.Router();
// static data removed - use local in-memory clients array (now empty)
const clients = [];

// Get all clients
router.get('/', (req, res) => {
    const response = clients.map(client => ({ ...client, _id: client.id || client._id }));
    res.json(response);
});

// Get single client
router.get('/:id', (req, res) => {
    const client = clients.find(c => c.id === req.params.id);
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.json(client);
});

// Create client (in-memory)
router.post('/', (req, res) => {
    const newClient = { id: `client-${Date.now()}`, ...req.body };
    clients.unshift(newClient);
    res.status(201).json(newClient);
});

// Update client (in-memory)
router.put('/:id', (req, res) => {
    const idx = clients.findIndex(c => c.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Client not found' });
    clients[idx] = { ...clients[idx], ...req.body };
    res.json(clients[idx]);
});

// Delete client (in-memory)
router.delete('/:id', (req, res) => {
    const idx = clients.findIndex(c => c.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Client not found' });
    clients.splice(idx, 1);
    res.json({ message: 'Client deleted successfully' });
});

module.exports = router;


