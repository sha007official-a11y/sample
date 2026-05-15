require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Skill = require('./models/Skill');

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for seeding'))
.catch(err => console.log('MongoDB connection error:', err));

const seedProjects = [
  {
    title: 'PORTFOLIO',
    description: 'This is my first project',
    category: 'Web',
    featured: true,
    techStack: ['HTML', 'JS', 'NODE JS'],
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    title: 'E-Commerce AI Agent',
    description: 'An AI-powered customer service agent that integrates with Shopify to answer customer queries instantly.',
    category: 'AI/ML',
    featured: true,
    techStack: ['Python', 'OpenAI', 'Node.js', 'React'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com'
  },
  {
    title: 'Fintech Dashboard',
    description: 'A comprehensive financial dashboard providing real-time analytics and data visualization for enterprise clients.',
    category: 'Web',
    featured: true,
    techStack: ['React', 'TypeScript', 'D3.js', 'PostgreSQL'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com'
  },
  {
    title: 'Fitness Tracker App',
    description: 'A cross-platform mobile application to track workouts and nutrition plans with offline support.',
    category: 'Mobile',
    featured: false,
    techStack: ['React Native', 'Firebase', 'Redux'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com'
  },
  {
    title: 'Infrastructure as Code Framework',
    description: 'A DevOps tool designed to automate AWS resource provisioning securely and efficiently.',
    category: 'DevOps',
    featured: false,
    techStack: ['Terraform', 'AWS', 'Bash', 'Docker'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com'
  }
];

const seedSkills = [
  { category: 'Frontend', name: 'React', proficiency: 95 },
  { category: 'Frontend', name: 'TypeScript', proficiency: 90 },
  { category: 'Frontend', name: 'Next.js', proficiency: 85 },
  { category: 'Frontend', name: 'CSS/Tailwind', proficiency: 98 },
  
  { category: 'Backend', name: 'Node.js', proficiency: 92 },
  { category: 'Backend', name: 'Python', proficiency: 88 },
  { category: 'Backend', name: 'PostgreSQL', proficiency: 85 },
  { category: 'Backend', name: 'GraphQL', proficiency: 80 },

  { category: 'Tools & DevOps', name: 'Docker', proficiency: 85 },
  { category: 'Tools & DevOps', name: 'AWS', proficiency: 75 },
  { category: 'Tools & DevOps', name: 'Git', proficiency: 95 },
  { category: 'Tools & DevOps', name: 'CI/CD', proficiency: 82 }
];

const seedDB = async () => {
  try {
    await Project.deleteMany({});
    await Skill.deleteMany({});
    
    await Project.insertMany(seedProjects);
    await Skill.insertMany(seedSkills);
    
    console.log('Database seeded successfully with new Projects and Skills!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedDB();
