const express = require('express');
const app = express();
const port = 3000;
const { exec } = require('child_process');
const fs = require('fs');

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

// New endpoint with a vulnerability (Command Injection - already existing)
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

// New vulnerability 1: **SQL Injection** (Insecure database query)
app.get('/api/sql-injection', (req, res) => {
    const userInput = req.query.query; // User input without sanitization
    const sqlQuery = `SELECT * FROM users WHERE username = '${userInput}'`; // SQL Injection vulnerability
    // Simulate database query execution (unsafe)
    console.log(`Executing SQL Query: ${sqlQuery}`);
    res.json({ success: true, message: 'Query executed' });
});

// New vulnerability 2: **Insecure Deserialization** (Deserializing user input without validation)
app.get('/api/deserialize', (req, res) => {
    const userData = req.query.data; // User input containing potentially dangerous object
    const dataObject = JSON.parse(userData); // Insecure deserialization
    res.json({ success: true, message: 'Data deserialized', data: dataObject });
});

// New vulnerability 3: **Insecure File Handling** (Allowing file write without validation)
app.get('/api/write-file', (req, res) => {
    const filePath = req.query.filePath; // User-controlled file path
    const fileContent = req.query.content; // User-controlled file content
    fs.writeFileSync(filePath, fileContent); // Vulnerable file write operation
    res.json({ success: true, message: `File written to ${filePath}` });
});

// New vulnerability 4: **Improper Error Handling** (Exposing internal error details)
app.get('/api/error', (req, res) => {
    try {
        throw new Error("This is a simulated internal error!");
    } catch (err) {
        // Improper error handling by exposing stack trace
        res.status(500).json({ success: false, error: err.stack });
    }
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
