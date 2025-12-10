const express = require('express');
const router = express.Router();
// static data removed — this route will serve case studies only if created at runtime
const caseStudies = [];

// Get all case studies
router.get('/', (req, res) => {
    const studies = caseStudies.map(study => ({ ...study, _id: study.id || study._id }));
    res.json(studies);
});

// Get single case study
router.get('/:id', (req, res) => {
    const cs = caseStudies.find(c => c.id === req.params.id);
    if (!cs) return res.status(404).json({ error: 'Case study not found' });
    res.json(cs);
});

// Create case study (in-memory)
router.post('/', (req, res) => {
    const newCs = { id: `case-${Date.now()}`, ...req.body };
    caseStudies.unshift(newCs);
    res.status(201).json(newCs);
});

// Update case study (in-memory)
router.put('/:id', (req, res) => {
    const idx = caseStudies.findIndex(c => c.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Case study not found' });
    caseStudies[idx] = { ...caseStudies[idx], ...req.body };
    res.json(caseStudies[idx]);
});

// Delete case study (in-memory)
router.delete('/:id', (req, res) => {
    const idx = data.caseStudies.findIndex(c => c.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Case study not found' });
    caseStudies.splice(idx, 1);
    res.json({ message: 'Case study deleted successfully' });
});

module.exports = router;


