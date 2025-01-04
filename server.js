const express = require('express');
const app = express();
const port = 3000;
const { exec } = require('child_process');


app.get('/api/data', (req, res) => {
    res.json({
        message: 'Hello, this is a sample API!',
        success: true,
        data: {
            name: 'John Doe',
            age: 137,
            profession: 'Software Developer'
        }
    });
});
app.get('/api/newdata', (req, res) => {
    res.json({
        message: 'Helllo, this is a samples news data from new api endpoint API!',
        success: true,
        data: {
            name: 'test user ',
            age: 41,
            profession: 'Devops Engineer'
        }
    });
});


app.get('/api/execute', (req, res) => {
    const userInput = req.query.cmd; // Unsanitized input from user
    exec(userInput, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ message: 'Error executing command', success: false, error: error.message });
        }
        res.json({
            message: 'Command executed successfully',
            success: true,
            output: stdout
        });
    });
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing
