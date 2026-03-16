# SENG 384 Docker Homework – Person Management System

This project is a full-stack web application built with React, Node.js (Express), PostgreSQL, and Docker Compose.

## Project Description

The application allows users to:

- Add a new person
- View all registered people
- Delete a person

The system uses:
- **Frontend:** React
- **Backend:** Node.js + Express
- **Database:** PostgreSQL
- **Containerization:** Docker + Docker Compose

## Project Structure

```bash
seng384-docker-homework/
├── backend/
├── frontend/
├── db/
├── docker-compose.yml
├── .env.example
└── README.md 

How to Run
Make sure Docker Desktop is installed and running.
Run the following command in the project root:
docker compose up --build

Application URLs
Frontend: http://localhost:5173
Backend: http://localhost:5001/api/health
API Endpoints
GET all people

GET /api/people

GET single person

GET /api/people/:id

Create person

POST /api/people

Content-Type: application/json

Example request body: {
  "full_name": "Ilayda Ay",
  "email": "ilayda@test.com"
}
Update person
PUT /api/people/:id
Delete person
DELETE /api/people/:id
Environment Variables
Example .env.example:
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=people_db

Screenshots
Add the following screenshots here:
Form page
People list page
Add operation
Delete operation
Docker running in terminal
Notes
This project is containerized with Docker Compose and can be started with a single command.