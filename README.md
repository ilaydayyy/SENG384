# SENG 384 - Docker Homework 
# Person Management System

**Developer:** Ulku Ilayda AY  
**Student ID:** 202128004

This project is a full-stack web application built with React, Node.js (Express), PostgreSQL, and Docker Compose.

---

## Project Description

The application allows users to:

- Add a new person
- View all registered people
- Edit/Update/Delete a person

---

## Technologies Used
- **Frontend:** React (Vite)
- **Backend:** Node.js + Express
- **Database:** PostgreSQL
- **Containerization:** Docker + Docker Compose

---

## Project Structure

```bash
SENG384/
│
├── docker-compose.yml        
├── .env.example              
├── README.md                 
│
├── backend/                  
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── src/
│       └── index.js          
│
├── frontend/                 
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx           
│       ├── main.jsx          
│       └── components/       
│
├── db/                       
│   └── init.sql              
│
└── screenshots/              
    ├── FORMPAGE.png
    ├── LISTPAGE.png
    ├── EDIT-UPDATE.png
    ├── DELETE.png
    └── DOCKERRUNNING.png
```

---

## How to Run

Make sure **Docker Desktop** is installed and running.

Clone the repository and run:

```bash
docker compose up --build
```

## Application URLs

**Frontend:** http://localhost:5173  

**People List Page:** http://localhost:5173/people  

**Backend Health Check:** http://localhost:5001/api/health 

---

## API Endpoints
**Get all people:** GET /api/people  

**Get single person:** GET /api/people/:id  

**Create a new person:** POST /api/people

**Example request body:**
```bash
{
  "full_name": "Ilayda Ay",
  "email": "ilayda@test.com"
}
```
**Update a person:** PUT /api/people/:id  

**Example request body:**
```bash
{
  "full_name": "Updated Name",
  "email": "updated@email.com"
}
```
**Delete a person:** DELETE /api/people/:id  

---

## Screenshots 

**Form page:** <img width="1520" height="904" alt="Ekran Resmi 2026-03-16 20 13 52" src="https://github.com/user-attachments/assets/75a0c888-5197-4d43-9810-0781d9fe3f5c" />

**People list page:** <img width="1492" height="887" alt="Ekran Resmi 2026-03-16 20 14 58" src="https://github.com/user-attachments/assets/69930ab5-e03b-4134-a7b1-4832d7ac68e4" />

**Edit/Update operation:** <img width="1509" height="887" alt="Ekran Resmi 2026-03-16 20 15 22" src="https://github.com/user-attachments/assets/da1ba2cb-568d-4c8e-9375-9ce6fcd4ec0f" />

**Delete operation:** <img width="1503" height="886" alt="Ekran Resmi 2026-03-16 20 17 30" src="https://github.com/user-attachments/assets/17c66f9b-f258-4703-8b19-338d007afeb2" />

**Docker running in terminal:** <img width="1728" height="1117" alt="Ekran Resmi 2026-03-16 20 18 27" src="https://github.com/user-attachments/assets/7ebfff3a-cbff-4b5c-8cd7-7ec1f0916d95" />

---
