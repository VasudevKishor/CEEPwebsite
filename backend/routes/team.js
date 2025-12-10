const express = require('express');
const router = express.Router();
// static data removed — this route no longer depends on backend-stored content
// The website now serves team member data entirely from the frontend.
// Keep an in-memory array for runtime changes if needed (starts empty).
const team = [];

// Get all team members
router.get('/', (req, res) => {
    const responseTeam = team.map(member => ({ ...member, _id: member.id || member._id }));
    res.json(responseTeam);
});


// Get single team member
router.get('/:id', (req, res) => {
    const member = team.find(m => m.id === req.params.id);
    if (!member) return res.status(404).json({ error: 'Team member not found' });
    res.json(member);
});

// Create team member (in-memory)
router.post('/', (req, res) => {
    const newMember = { id: `team-${Date.now()}`, ...req.body };
    team.unshift(newMember);
    res.status(201).json(newMember);
});

// Update team member (in-memory)
router.put('/:id', (req, res) => {
    const idx = team.findIndex(m => m.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Team member not found' });
    team[idx] = { ...team[idx], ...req.body };
    res.json(team[idx]);
});

// Delete team member (in-memory)
router.delete('/:id', (req, res) => {
    const idx = team.findIndex(m => m.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Team member not found' });
    team.splice(idx, 1);
    res.json({ message: 'Team member deleted successfully' });
});

module.exports = router;


