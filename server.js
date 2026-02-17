const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Simple in-memory storage (trips disappear when server restarts)
let trips = [];

// API Routes
app.get('/api/trips', (req, res) => {
    res.json(trips);
});

app.post('/api/trips', (req, res) => {
    const newTrip = {
        id: Date.now().toString(),
        ...req.body,
        createdAt: new Date().toISOString()
    };
    trips.push(newTrip);
    res.json(newTrip);
});

app.delete('/api/trips/:id', (req, res) => {
    trips = trips.filter(trip => trip.id !== req.params.id);
    res.json({ message: 'Trip deleted' });
});

// Serve HTML
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontendtravel.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});