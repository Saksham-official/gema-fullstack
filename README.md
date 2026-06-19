# Kidrove AI & Robotics Summer Workshop Landing Page

A responsive full-stack landing page built for Kidrove to market and register students for the AI & Robotics Summer Workshop (Ages 8–14) starting 15 July 2026.

## Features

- **Responsive Landing Page:** Tailored UI for children's learning, utilizing a custom grid blueprint, rounded cards, and smooth section transitions.
- **Details Grid:** Highlights workshop parameters (Age, Duration, Mode, Fee, Start Date) with clear details.
- **Learning Outcomes & Project Showcase:** Lists learning points and displays mock previews of projects built during the course.
- **Interactive Registration Form:** Clean registration card featuring custom validation, error messages, and loading states.
- **Interactive AI Chatbot:** Floating robot assistant widget integrated with Groq API (Llama 3 model) to answer parents' queries about the workshop in real-time (falls back to local keyword matching if no API key is provided).
- **Express.js API Backend:** Simple REST API with `/api/enquiry`, `/api/enquiries` (list view), and `/api/chat` (AI query helper) endpoints.
- **Database Connection with Fallback:** Connects to MongoDB via Mongoose. If MongoDB is not active on the host machine, the API falls back to saving enquiries to a local JSON file (`backend/data/enquiries.json`) to prevent runtime crashes.

---

## Project Structure

```
gema-fullstack/
├── frontend/             # React + TypeScript + Vite + Tailwind CSS
│   ├── src/
│   │   ├── assets/       # Media and SVGs
│   │   ├── components/   # Modular UI blocks (Hero, Stats, Form, FAQs, Outcomes)
│   │   └── App.tsx       # Main page layout composer
│   └── package.json
└── backend/              # Express + TypeScript
    ├── src/
    │   ├── models/       # Database schemas & JSON file fallback
    │   ├── validators/   # Input validators
    │   └── server.ts     # Main server entrypoint
    └── package.json
```

---

## Running Locally

### Prerequisites
- Node.js (v18+)
- MongoDB (Optional - falls back to local file database if MongoDB is offline)

### 1. Start the Backend Server
```bash
cd backend
npm install
npm run dev
```
The server runs on `http://localhost:5000`.

### 2. Start the Frontend Server
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## API Documentation

### Create Enquiry
* **Endpoint:** `POST /api/enquiry`
* **Headers:** `Content-Type: application/json`
* **Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "9876543210",
  "age": 10
}
```
* **Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Enquiry registered successfully!",
  "data": {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "9876543210",
    "age": 10,
    "_id": "...",
    "createdAt": "..."
  }
}
```
* **Error Response (400 Bad Request):**
```json
{
  "success": false,
  "errors": [
    {
      "field": "phone",
      "message": "Phone number must be a valid 10-digit mobile number"
    }
  ]
}
```
