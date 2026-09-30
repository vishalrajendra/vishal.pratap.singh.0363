# ClubSphere - College Club Events Management

A responsive full-stack college club events website using HTML, CSS, JavaScript, Node.js, Express and MongoDB.

## Features

### Student side
- Home page
- Club introduction
- Upcoming events
- Featured event
- All events
- Search by event name
- Category filter
- Event registration
- Responsive design

### Admin side
- Dashboard statistics
- Add event
- Edit event
- Delete event
- View registered students
- Search registrations
- Filter registrations by event

## Requirements

- Node.js
- MongoDB Community Server running locally

## Run

Open the project folder in VS Code terminal:

```bash
npm install
npm start
```

Open:

- Student site: http://localhost:3000
- Events: http://localhost:3000/events.html
- Admin: http://localhost:3000/admin

Default MongoDB database:
`mongodb://127.0.0.1:27017/club_events`

If your MongoDB uses another connection string, set `MONGO_URI`.

## MongoDB check on Windows

You can check whether MongoDB is running with:

```powershell
Get-Service MongoDB
```

If it is installed as a Windows service:

```powershell
net start MongoDB
```

If `net start MongoDB` says the service name is invalid, MongoDB may not be installed/configured as a Windows service. You can start `mongod.exe` manually or configure the MongoDB service.

## Project structure

```text
server/
  server.js
  models/
  routes/

public/
  index.html
  events.html
  register.html
  admin/
  css/
  js/
```

This version intentionally keeps admin authentication out so the project can be tested easily. For production, add admin login/session or JWT authentication before deploying.
