const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Route to run the AppleScript
app.post('/run-applescript', (req, res) => {
    const { appleScript } = req.body;

    if (!appleScript) {
        return res.status(400).send("No AppleScript provided.");
    }

    // Use 'osascript' to run the AppleScript on macOS
    exec(`osascript -e '${appleScript}'`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing AppleScript: ${error.message}`);
            return res.status(500).send(`Error executing AppleScript: ${stderr}`);
        }

        res.send(`AppleScript executed: ${stdout}`);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
