require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Message = require('./models/Message');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// --- API Routes ---

// GET /api/skills
app.get('/api/skills', async (req, res) => {
  try {
    const skills = await Skill.find();
    // Group skills by category to match the frontend format
    const groupedData = {};
    skills.forEach(skill => {
      if (!groupedData[skill.category]) {
        groupedData[skill.category] = [];
      }
      groupedData[skill.category].push({
        name: skill.name,
        proficiency: skill.proficiency
      });
    });
    
    res.json({ data: groupedData });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

// GET /api/projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json({ data: projects });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// POST /api/projects
app.post('/api/projects', async (req, res) => {
  const { title, description, category, techStack, githubUrl, liveUrl, featured } = req.body;
  
  if (!title || !description || !category) {
    return res.status(400).json({ success: false, message: 'Please provide title, description, and category.' });
  }

  try {
    const techArray = techStack ? techStack.split(',').map(s => s.trim()) : [];
    const newProject = new Project({ 
      title, 
      description, 
      category, 
      techStack: techArray, 
      githubUrl, 
      liveUrl,
      featured: featured || false
    });
    const saved = await newProject.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create project.' });
  }
});

// POST /api/contact
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
  }

  try {
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();
    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to save message.' });
  }
});

// Catch-all route to serve index.html for any other requests (useful if using client-side routing, though we aren't here)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
