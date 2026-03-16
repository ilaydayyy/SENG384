# SENG 384 – Docker Homework  
## Person Management System

This project is a full-stack web application built using **React, Node.js (Express), PostgreSQL, and Docker Compose**.  
The application allows users to manage people records through a simple web interface.

The entire system runs using Docker containers and can be started with a single command.

---

# Technologies Used

Frontend  
- React (Vite)

Backend  
- Node.js  
- Express.js

Database  
- PostgreSQL

Containerization  
- Docker  
- Docker Compose

---

# Application Features

The system allows users to:

- Add a new person
- View all registered people
- Update existing records
- Delete records

Each person record includes:

- Full Name
- Email (must be unique)

---

# Project Structure
seng384-docker-homework
│
├── backend
│ ├── Dockerfile
│ ├── src
│ └── package.json
│
├── frontend
│ ├── Dockerfile
│ ├── src
│ └── package.json
│
├── db
│ └── init.sql
│
├── docker-compose.yml
├── .env.example
└── README.md


---

# How to Run the Project

Make sure **Docker Desktop** is installed and running.

Clone the repository and run:

```bash
docker compose up --build

Docker will start:
PostgreSQL database
Express backend
React frontend

Application URLs
Frontend
http://localhost:5173
People List Page
http://localhost:5173/people
Backend Health Check
http://localhost:5001/api/health

API Endpoints
Get all people
GET /api/people
Get single person
GET /api/people/:id
Create person
POST /api/people
Example request body
{
  "full_name": "Ilayda Ay",
  "email": "ilayda@test.com"
}
Update person
PUT /api/people/:id
Delete person
DELETE /api/people/:id
Database
The database is automatically initialized using the init.sql script.
Table structure:
people
------
id          SERIAL PRIMARY KEY
full_name   VARCHAR NOT NULL
email       VARCHAR UNIQUE NOT NULL
Environment Variables
Example .env.example
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=people_db
Screenshots
Add screenshots of:
Registration form page
People list page
Add operation
Update operation
Delete operation
Docker containers running in terminal
Notes
The entire system runs using Docker Compose.
This ensures consistent environments across different operating systems and simplifies deployment.

---
