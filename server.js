const express = require('express');
const app = express();
const port = 3000;
const { exec } = require('child_process');

// Existing endpoint
app.get('/api/data', (req, res) => {
    res.json({
        message: 'Hello, this is a sample API!',
        success: true,
        data: {
            name: 'John Doe',
            age: 30,
            profession: 'Software Developer'
        }
    });
});

// New endpoint with a vulnerability
app.get('/api/execute', (req, res) => {
    const userCommand = req.query.cmd; // Unvalidated user input
    exec(userCommand, (error, stdout, stderr) => {
        if (error) {
            res.status(500).json({ success: false, error: stderr });
        } else {
            res.json({ success: true, output: stdout });
        }
    });
});

// New endpoint
app.get('/api/newdata', (req, res) => {
    res.json({
        message: 'Helllo, this is a sample new data from new api endpoint API!',
        success: true,
        data: {
            name: 'test user ',
            age: 41,
            profession: 'Devops Engineer'
        }
    });
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing
