# Event Scheduling Web Application - PERN Stack

A full-featured Event Scheduling Web Application built with PostgreSQL, Express, React, and Node.js (PERN stack). This application allows users to create, discover, and join events with a modern, responsive interface.

## Overview

This Event Scheduling Application demonstrates a complete full-stack implementation following modern development practices. It provides a seamless experience for users to:

- **User Management**: Register, login, and manage user profiles
- **Event Creation**: Create, edit, and delete events (by event creators)
- **Event Discovery**: Browse all available events with detailed information
- **RSVP System**: Join or leave events, view attendee lists
- **Real-time Updates**: Instant feedback on actions through context management

---

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing

### Frontend
- **Library**: React
- **Build Tool**: Vite 
- **Language**: TypeScript
- **Styling**: Tailwind CSS 
- **State Management**: Context API
- **HTTP Client**: Axios 
- **Routing**: React Router 

---

## Features

### Core Features Implemented

#### 1. User Management
- **Authentication**: Secure signup and login with JWT-based authentication
- **Password Security**: bcryptjs hashing with salt rounds for secure password storage
- **Session Management**: Cookie-based JWT storage with httpOnly flag for security
- **User Profile**: Access to user information (id, email, name, creation date)

#### 2. Event Management
- **Create Events**: Authenticated users can create events with title, description, date, time, and location
- **Edit Events**: Event creators can modify their own events
- **Delete Events**: Event creators can remove their events
- **View Events**: All users can view available events with attendee counts

#### 3. RSVP System (Join/Leave Events)
- **Join Events**: Users can RSVP to any event (one RSVP per user per event)
- **Leave Events**: Users can cancel their attendance
- **Attendee List**: View all attendees with their join dates
- **Unique Constraints**: Database ensures users can only join events once

#### 4. Frontend Pages
- **Landing Page**: Welcome page with feature highlights
- **Login Page**: User authentication
- **Signup Page**: User registration
- **Events Listing**: Grid view of all events with search capability
- **Event Details**: Comprehensive event information with attendee list
- **Create Event**: Form to create new events (protected)
- **Edit Event**: Form to modify existing events (protected, creator-only)

---

## Project Structure

```
event-scheduling-app/
│
├── Frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.ts              # Axios configuration with interceptors
│   │   ├── components/
│   │   │   ├── LoginForm.tsx         # Login form component
│   │   │   ├── SignupForm.tsx        # Signup form component
│   │   │   ├── EventCard.tsx         # Event card display component
│   │   │   ├── EventForm.tsx         # Event creation/editing form
│   │   │   └── Navbar.tsx            # Navigation bar
│   │   ├── context/
│   │   │   ├── AuthContext.tsx       # Authentication state management
│   │   │   └── EventContext.tsx      # Events state management
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx       # Landing/home page
│   │   │   ├── LoginPage.tsx         # Login page
│   │   │   ├── SignupPage.tsx        # Signup page
│   │   │   ├── EventsPage.tsx        # Events listing page
│   │   │   ├── EventDetailsPage.tsx  # Event details page
│   │   │   ├── CreateEventPage.tsx   # Create event page
│   │   │   └── EditEventPage.tsx     # Edit event page
│   │   ├── types/
│   │   │   └── index.ts              # TypeScript type definitions
│   │   ├── App.tsx                   # Main app component with routing
│   │   ├── main.tsx                  # React entry point
│   │   └── index.css                 # Global styles
│   ├── index.html                    # HTML entry point
│   ├── vite.config.ts                # Vite configuration
│   ├── tsconfig.json                 # TypeScript configuration
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   ├── package.json                  # Frontend dependencies
│   ├── .env.example                  # Environment variables template
│   └── .gitignore                    # Git ignore rules
│
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.ts               # Authentication logic (signup, login)
│   │   │   ├── events.ts             # Event CRUD operations
│   │   │   └── attendees.ts          # Event attendance management
│   │   ├── routes/
│   │   │   ├── auth.ts               # Auth API routes
│   │   │   ├── events.ts             # Event API routes
│   │   │   └── attendees.ts          # Attendee/RSVP routes
│   │   ├── middleware/
│   │   │   └── auth.ts               # JWT verification middleware
│   │   ├── types/
│   │   │   └── index.ts              # TypeScript type definitions
│   │   └── server.ts                 # Express server setup
│   ├── prisma/
│   │   └── schema.prisma             # Database schema (Prisma)
│   ├── .env.example                  # Environment variables template
│   ├── tsconfig.json                 # TypeScript configuration
│   ├── package.json                  # Backend dependencies
│   └── .gitignore                    # Git ignore rules
│
└── README.md                         # This file
```

---

## Installation & Setup

### Prerequisites
- Node.js 
- PostgreSQL 
- npm or yarn package manager
- Git

### Backend Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/kavitasoren02/EventScheduling-assignment.git
cd Backend
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Environment Configuration
Create a `.env` file in the Backend directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Database URL - Update with your PostgreSQL credentials
DATABASE_URL="postgresql://username:password@localhost:5432/event_scheduling"

# JWT Secret - Change this to a secure random string
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Server Configuration
PORT=5000
NODE_ENV="development"

# CORS - Frontend URL
FRONTEND_URL="http://localhost:5173"
```

#### 4. Database Setup

Initialize Prisma and create the database:

```bash
# Generate Prisma client
npm run prisma:generate

# Create database tables
npm run prisma:push
```

Or if you prefer using migrations:

```bash
npm run prisma:migrate
```

#### 5. Start the Backend Server

```bash
# Development mode with auto-reload
npm run dev

# Or build and run production
npm run build
npm start
```

The backend will be running at `http://localhost:5000`

---

### Frontend Setup

#### 1. Navigate to Frontend Directory
```bash
cd Frontend
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Environment Configuration
Create a `.env` file in the Frontend directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# API URL - Match your backend server
VITE_API_URL=http://localhost:5000/api
```

#### 4. Start Development Server

```bash
npm run dev
```

The frontend will be running at `http://localhost:5173`

#### 5. Build for Production

```bash
npm run build
```

The optimized build will be created in the `dist` directory.

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Sign Up
```
POST /auth/signup
Content-Type: application/json

Request Body:
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "securepassword123"
}

Response:
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### Log In
```
POST /auth/login
Content-Type: application/json

Request Body:
{
  "email": "user@example.com",
  "password": "securepassword123"
}

Response:
{
  "success": true,
  "message": "Logged in successfully",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### Get Current User (Protected)
```
GET /auth/me
Headers: Authorization: Bearer <token>

Response:
{
  "success": true,
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Log Out
```
POST /auth/logout

Response:
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Event Endpoints

#### Get All Events
```
GET /events

Response:
{
  "success": true,
  "events": [
    {
      "id": "event_id",
      "title": "Tech Meetup",
      "description": "Join us for...",
      "date": "2024-02-15T00:00:00Z",
      "time": "18:30",
      "location": "Downtown Hall",
      "creatorId": "user_id",
      "creator": {
        "id": "user_id",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "attendeeCount": 5,
      "isAttending": false
    }
  ]
}
```

#### Get Event Details (Protected)
```
GET /events/:eventId

Response:
{
  "success": true,
  "event": {
    "id": "event_id",
    "title": "Tech Meetup",
    "description": "Join us for...",
    "date": "2024-02-15T00:00:00Z",
    "time": "18:30",
    "location": "Downtown Hall",
    "creatorId": "user_id",
    "creator": { ... },
    "attendees": [
      {
        "id": "attendee_id",
        "user": {
          "id": "user_id",
          "name": "Jane Smith",
          "email": "jane@example.com"
        },
        "joinedAt": "2024-01-20T15:45:00Z"
      }
    ]
  }
}
```

#### Create Event (Protected)
```
POST /events
Content-Type: application/json
Authorization: Bearer <token>

Request Body:
{
  "title": "Tech Meetup",
  "description": "Join us for...",
  "date": "2024-02-15",
  "time": "18:30",
  "location": "Downtown Hall"
}

Response:
{
  "success": true,
  "message": "Event created successfully",
  "event": { ... }
}
```

#### Update Event (Protected - Creator Only)
```
PUT /events/:eventId
Content-Type: application/json
Authorization: Bearer <token>

Request Body:
{
  "title": "Updated Title",
  "description": "Updated description",
  "date": "2024-02-20",
  "time": "19:00",
  "location": "New Location"
}

Response:
{
  "success": true,
  "message": "Event updated successfully",
  "event": { ... }
}
```

#### Delete Event (Protected - Creator Only)
```
DELETE /events/:eventId
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Event deleted successfully"
}
```

### RSVP Endpoints

#### Join Event (Protected)
```
POST /events/:eventId/join
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Joined event successfully"
}
```

#### Leave Event (Protected)
```
POST /events/:eventId/leave
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Left event successfully"
}
```

---

## Usage Guide

### For Users

#### 1. Create an Account
- Navigate to the application
- Click "Sign Up"
- Enter email, name, and password
- Click "Sign Up" button

#### 2. Browse Events
- After login, you'll be redirected to the events page
- View all available events in a grid format
- Click on any event card to see full details

#### 3. Create an Event
- Click "Create Event" in the navigation
- Fill in event details (title, description, date, time, location)
- Click "Save Event"

#### 4. Join an Event
- Go to an event's detail page
- Click "Join Event" button
- Your status will update to show you're attending

#### 5. Leave an Event
- Go to an event you're attending
- Click "Leave Event" button
- You'll be removed from the attendee list

#### 6. Edit Your Events
- Go to an event you created
- Click "Edit" button
- Modify the details
- Click "Save Event"

#### 7. Delete Your Events
- Go to an event you created
- Click "Delete" button
- Confirm the deletion

---


#### Backend
```bash
# Development server with auto-reload
npm run dev

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Open Prisma Studio (GUI for database)
npm run prisma:studio

# Build for production
npm run build

# Start production server
npm start
```

#### Frontend
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```


```bash
# Create a feature branch
git checkout -b feature/feature-name

# Make your changes and commit
git add .
git commit -m "Add feature description"

# Push to repository
git push origin feature/feature-name

# Create a pull request on GitHub
```
