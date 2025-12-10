const express = require('express');
const router = express.Router();
// Data moved to frontend - keep empty arrays so routes still behave but don't ship content
const services = [];
const trainingPrograms = [];
const serviceVideos = [];

// Get all services
router.get('/', (req, res) => {
    const response = services.map(service => ({ ...service, _id: service.id || service._id }));
    res.json(response);
});

// Get all training programs
router.get('/training', (req, res) => {
    const programs = trainingPrograms.map(program => ({ ...program, _id: program.id || program._id }));
    res.json(programs);
});

// Get all service videos
router.get('/videos', (req, res) => {
    const videos = serviceVideos.map(video => ({ ...video, _id: video.id || video._id }));
    res.json(videos);
});

// Create service (in-memory)
router.post('/', (req, res) => {
    const newService = { id: `service-${Date.now()}`, ...req.body };
    services.unshift(newService);
    res.status(201).json(newService);
});

// Create training program (in-memory)
router.post('/training', (req, res) => {
    const newProgram = { id: `training-${Date.now()}`, ...req.body };
    trainingPrograms.unshift(newProgram);
    res.status(201).json(newProgram);
});

// Create service video (in-memory)
router.post('/videos', (req, res) => {
    const newVideo = { id: `video-${Date.now()}`, ...req.body };
    serviceVideos.unshift(newVideo);
    res.status(201).json(newVideo);
});

module.exports = router;