// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// For HTML5 mode routing (optional)
// This sends index.html for any request not matching a static file
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// server.js
// API endpoint to return a list of items
app.get('/api/items', (req, res) => {
    res.json({
      items: ['AngularJS', 'Express', 'MongoDB', 'Node.js']
    });
  });
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
