// Create web server

// Import express
const express = require('express');
// Import body-parser
const bodyParser = require('body-parser');
// Import node-persist
const storage = require('node-persist');

// Create express app
const app = express();

// Use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create a comment
app.post('/comments', async (req, res) => {
  // Get comment from request body
  const comment = req.body;
  // Get comments array from storage
  await storage.init();
  const comments = await storage.getItem('comments') || [];
  // Add comment to comments array
  comments.push(comment);
  // Save comments array to storage
  await storage.setItem('comments', comments);
  // Send response with comment
  res.send(comment);
});

// Get all comments
app.get('/comments', async (req, res) => {
  // Get comments array from storage
  await storage.init();
  const comments = await storage.getItem('comments') || [];
  // Send response with comments
  res.send(comments);
});

// Get a comment by id
app.get('/comments/:id', async (req, res) => {
  // Get id from request params
  const id = req.params.id;
  // Get comments array from storage
  await storage.init();
  const comments = await storage.getItem('comments') || [];
  // Find comment by id
  const comment = comments.find(comment => comment.id === id);
  // Send response with comment
  res.send(comment);
});

// Update a comment by id
app.put('/comments/:id', async (req, res) => {
  // Get id from request params
  const id = req.params.id;
  // Get comment from request body
  const comment = req.body;
  // Get comments array from storage
  await storage.init();
  let comments = await storage.getItem('comments') || [];
  // Find comment by id
  const index = comments.findIndex(comment => comment.id === id);
  // Update comment
  comments[index] = comment;
  // Save comments array to storage
  await storage.setItem('comments', comments);
  // Send response with comment
  res.send(comment);
});

// Delete a comment by id
app.delete('/comments/:id', async (req, res) => {
  // Get id from request params
  const id = req.params.id