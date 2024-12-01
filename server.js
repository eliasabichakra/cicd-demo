const express = require('express');
const app = express();
const port = 3000;

app.get('/api/data', (req, res) => {
    res.json({
        message: 'Hello, this is a sample API new test token!',
        success: true,
        data: {
            name: 'John Doe',
            age: 30,
            profession: 'Software Developer'
        }
    });
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing
