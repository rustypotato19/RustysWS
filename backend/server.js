const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs'); // File system module for writing to files
require('dotenv').config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// POST endpoint to send email and save request to a file
app.post('/send-email', (req, res) => {
  const { requestType, email, description } = req.body;

  // Save request to a file
  const requestData = {
    requestType,
    email,
    description,
    submittedAt: new Date().toISOString(),
  };

  fs.readFile('requests.json', 'utf8', (err, data) => {
    let requests = [];
    if (!err && data) {
      requests = JSON.parse(data); // Read existing requests
    }
    requests.push(requestData); // Add new request
    
    // Write the updated list to the file
    fs.writeFile('requests.json', JSON.stringify(requests, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Failed to write to file', writeErr);
        return res.status(500).json({ error: 'Failed to save request' });
      }
      console.log('Request saved successfully');
    });
  });

  // Send email via SendGrid (optional)
  const transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: 'apikey', // Fixed username for SendGrid
      pass: process.env.SENDGRID_API_KEY, // SendGrid API Key
    },
  });

  const mailOptions = {
    from: email,
    to: 'your-email@example.com', // Replace with your email
    subject: `New Contact Request: ${requestType}`,
    text: `Email: ${email}\nRequest Type: ${requestType}\nDescription: ${description}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: 'Failed to send email' });
    }
    res.status(200).json({ message: 'Request submitted successfully' });
  });
});

// GET endpoint to retrieve all requests
app.get('/requests', (req, res) => {
  fs.readFile('requests.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read requests' });
    }
    const requests = JSON.parse(data);
    res.status(200).json(requests);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
