const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (free at mongodb.com)
mongoose.connect('mongodb+srv://username:password@cluster.mongodb.net/travelbuddy');

// Create Trip Schema
const TripSchema = new mongoose.Schema({
    from: String,
    to: String,
    date: String,
    time: String,
    people: Number,
    amount: String,
    gender: String,
    contact: String,
    createdAt: { type: Date, default: Date.now }
});

const Trip = mongoose.model('Trip', TripSchema);

// API Endpoints
app.get('/api/trips', async (req, res) => {
    const trips = await Trip.find().sort({createdAt: -1});
    res.json(trips);
});

app.post('/api/trips', async (req, res) => {
    const trip = new Trip(req.body);
    await trip.save();
    res.json(trip);
});

app.delete('/api/trips/:id', async (req, res) => {
    await Trip.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});

app.listen(3000, () => console.log('Server running on port 3000'));