import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

// Data storage (in-memory array)
const data = [];

// Get __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON and serve static files
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API to fetch all data
app.get('/api/data', (req, res) => {
    res.json(data); // Send the array to the frontend
});

// API to add new data
app.post('/api/data', (req, res) => {
    const { title, name } = req.body; // Destructure data from the request body

    if (!title || !name) {
        return res.status(400).json({ error: 'Title and Name are required' });
    }

    const newData = { id: data.length + 1, title, name };
    data.push(newData); // Add new data to the array

    res.status(201).json({ message: 'Data added successfully', data: newData });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
