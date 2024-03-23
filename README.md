# Project_backend
Graduation project of the Department of Information Management, National Sun Yat-sen University. This repo is for backend development, it demonstrate how api works in our project. Repo for frontend:https://github.com/ycloudo/Project_frontend

## Getting Started (with Docker)
if you have Docker installed in your computer, you can simply fork this repo and get started with following script:
  ```bash
   $ docker-compose up
  ```
## Code Overview
### dependencies
- dotenv - Loads .env parameters
- express - Web framework for Node.js for building web apps and APIs.
- jsonwebtoken - Library for generating and verifying JSON Web Tokens (JWTs).
- mongoose - MongoDB object modeling tool for Node.js apps.

### Development Dependencies
- nodemon - Monitors Node.js files for changes and automatically restarts the server.

### Application Structure
- `index.js` - The entry point to our application. This file defines the express server, integrates all the routes, initializes the logger and the mongoDB connection. 
- `src/controller/` - This folder contains the controllers for the app to read and write data to MongoDB.
- `src/routes/` - This folder contains the route definitions for the app.
- `src/models/` - This folder contains the Mongoose Schema definitions.
- `mongo_seed/` - This folder contains example data and script that push that data into MongoDB on Docker.

# API Examples

## 







