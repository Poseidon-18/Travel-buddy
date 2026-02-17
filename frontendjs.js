// Save trip to shared database
async function saveTrip() {
    const tripData = {
        from: document.getElementById('startLocation').value,
        to: document.getElementById('destination').value,
        date: document.getElementById('travelDate').value,
        time: document.getElementById('travelTime').value,
        people: document.getElementById('peopleCount').value,
        amount: document.getElementById('amount').value,
        gender: document.getElementById('gender').value,
        contact: document.getElementById('contact').value
    };

    const response = await fetch('http://localhost:3000/api/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tripData)
    });
    
    const result = await response.json();
    alert('Trip shared with everyone!');
    loadAllTrips();
}

// Load all trips from everyone
async function loadAllTrips() {
    const response = await fetch('http://localhost:3000/api/trips');
    const trips = await response.json();
    displayTrips(trips);
}