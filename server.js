// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// API endpoint to return a list of items
app.get('/api/items', (req, res) => {
  res.json(['AngularJS', 'Express', 'MongoDB', 'Node.js']);
});

// For HTML5 mode routing (optional)
// This sends index.html for any request not matching a static file
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
