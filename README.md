# Full-Stack Personal Portfolio

A sleek, premium full-stack personal portfolio built with Node.js, Express, MongoDB, and a static monolithic frontend.

## Prerequisites

Before you can run this project locally, you need to install the following on your system:
- [Node.js](https://nodejs.org/) (which comes with npm)
- [MongoDB](https://www.mongodb.com/try/download/community) (or use a free MongoDB Atlas cloud cluster)

## Step-by-Step Local Setup

### 1. Build and Run Server
1. Open your terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
4. Run the database seed script to add example projects and skills to your MongoDB database so they render on the frontend:
   ```bash
   npm run seed
   ```
5. Start the server (which will dynamically serve the API and the static frontend):
   ```bash
   npm start
   ```
   *Your portfolio should now be live on `http://localhost:5000` in your browser!*

## Deployment Guide

You only need ONE server to run this now!

### Deploying the Full Stack App (to Render or Heroku)
1. Push your full repository code to GitHub.
2. Go to [Render](https://render.com) and create a new **Web Service**.
3. Connect your GitHub repository and build settings:
   - **Root Directory**: `backend` (Important!)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add your Environment Variable `MONGO_URI` pointing to your MongoDB Atlas cloud cluster connection string.
5. Click **Deploy Web Service**. Render will install Node, boot your Express server, and your single frontend HTML chunk will be perfectly served alongside your API!
