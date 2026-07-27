# ChatGPT style LLM using Gemini API with context management

A full stack chatGPT type Bot with the help of gemini API key which provide the functionality of chatGPT like conversation with maintaining its previous context with the help of gemini stateful conversation provided and managed context internally by google by using its interaction id.

## Features
- ChatGPT like interface to conversation with the bot
- Stateful conversation
- Chat wise context management with the help of interaction id provided by google
- AI Assistance respond to your question
- Can create multiple chat session which will maintain your history also

##  Tec Stack

### Frontend
- React.js
- Material UI
- Axios

###Backend
- Express.js
- Gemini API 
- Google GenAI SDK

### Database
- Postgres

## Folder structure

### Backend
chatgpt_backend.git/
├── .gitignore
├── config/
│   └── data-source.ts
├── controller/
│   ├── authController.ts
│   ├── chatController.ts
│   └── getMe.ts
├── entity/
│   ├── Message.ts
│   ├── Session.ts
│   └── User.ts
├── eslint.config.mts
├── middleware/
│   └── checkLogin.ts
├── package-lock.json
├── package.json
├── routes/
│   └── userRoute.ts
├── server.ts
├── tsconfig.json
└── utils/
    ├── gemini.ts
    ├── generateToken.ts
    └── verifyToken.ts


### Frontend

chatgpt_frontend.git/
├── .gitignore
├── README.md
├── api/
│   └── apidata.ts
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   ├── ChatPage.tsx
│   │   ├── ChatSidebar.tsx
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── MainLayout.tsx
│   │   ├── NotFound.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── PubLayout.tsx
│   │   ├── PubNav.tsx
│   │   ├── Signup.tsx
│   │   └── UserDashboard.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── index.css
│   └── main.tsx
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
└── vite.config.ts


## installation

Clone the Repository

```
https://github.com/sudhir-kumar999/chatgpt_frontend.git
```

Install dependencies

```
npm install
```

## Create a env file at your root of the project

### Backend

```
PORT=5500
DATABASE_URL=You database url
JWT_SECRET=your JWT secret key
CORS_ORIGIN=frontend deployed url or local host url
NODE_ENV=development
GEMINI_API_KEY=your gemini api key
```

### Frontend env

```
VITE_API_URL=Backend localhost or deployed URL
```

### Start frontend and backend

```
npm run dev
```