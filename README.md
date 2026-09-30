<<<<<<< HEAD
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
=======
<div align="center">

<picture>
  <source media="(prefers-color-scheme: light)" srcset="./banner-light.svg?v=1">
  <source media="(prefers-color-scheme: dark)" srcset="./banner.svg?v=1">
  <img src="./banner.svg?v=1" alt="Vishal Pratap Singh animated GitHub banner">
</picture>

## 👋 Hi, I'm Vishal Pratap Singh

**Student • Developer • Learner**  
**On Code Mode 🚀**

[![GitHub](https://img.shields.io/badge/GitHub-vishalrajendra-181717?logo=github)](https://github.com/vishalrajendra)
[![Email](https://img.shields.io/badge/Email-hello.vishal.ps%40gmail.com-EA4335?logo=gmail)](mailto:hello.vishal.ps@gmail.com)

</div>

## 🪪 Developer Lanyard

<div align="center"><img src="./lanyard.svg?v=1" width="380" alt="Animated developer ID badge"></div>

## ⚡ Stats

<div align="center">
<img src="./stats.svg?v=1" width="48%" alt="GitHub stats">
<img src="./langs.svg?v=1" width="48%" alt="Language stats">
<img src="./trophies.svg?v=1" width="70%" alt="Developer trophies">
</div>

## 🛠️ Skills

`Communication` `Python` `Java` `C++` `VS Code` `React` `JavaScript` `NodeJS` `Docker` `Kubernetes` `Angular`

## 🚀 Projects

| Project | Description | Stack |
|---|---|---|
| **Project One** | Add your best project here | React / NodeJS |
| **Project Two** | Add your second showcase project | Python / C++ |
| **Project Three** | Add another project you want recruiters to see | JavaScript |

## 📈 Contribution Activity

<div align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=vishalrajendra&theme=react-dark&hide_border=true" alt="Contribution activity graph">
</div>

## 🐍 Contribution Snake

<div align="center">
  <img src="./output/github-contribution-grid-snake.svg?v=1" alt="GitHub contribution snake animation">
</div>

## 🔗 Connect

<div align="center">
  <a href="https://github.com/vishalrajendra"><img src="https://img.shields.io/badge/GitHub-vishalrajendra-black?logo=github"></a>
  <a href="mailto:hello.vishal.ps@gmail.com"><img src="https://img.shields.io/badge/Email-Contact-red?logo=gmail"></a>
</div>

<div align="center">

![Profile Views](https://komarev.com/ghpvc/?username=vishalrajendra&label=Profile%20Views&color=ff69b4&style=for-the-badge)

**KEEP CODING • KEEP GROWING 💜**

</div>
>>>>>>> 306d5e7aed2eb48f6612aa1902c03de678e28e4a
