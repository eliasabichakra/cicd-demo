const express = require('express');
const app = express();
const port = 3000;
const https = require('https');

// 1. Weak JWT Generation (Manual Token Creation - No Library)
app.get('/api/generate-token', (req, res) => {
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
    const payload = Buffer.from(JSON.stringify({ user: 'testUser' })).toString('base64');
    const signature = Buffer.from('weak_signature').toString('base64'); // Weak signature
    const token = `${header}.${payload}.${signature}`; // Manually created JWT (insecure)
    res.json({ success: true, token });
});

// 2. Insecure SSL/TLS Connection (No Hostname Verification)
app.get('/api/ssl-request', (req, res) => {
    https.get('https://example.com', { rejectUnauthorized: false }, (response) => { // No hostname verification
        response.on('data', (chunk) => {
            res.write(chunk);
        });
        response.on('end', () => {
            res.end();
        });
    });
});

// 3. New Endpoint with Potential Code Execution Risk (Eval Example)
app.get('/api/unsafe-eval', (req, res) => {
    const userInput = req.query.input; // Unvalidated input
    eval(userInput); // Dangerous eval usage
    res.json({ success: true, message: 'Executed eval!' });
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing
