# Full-Stack Web Application

A full-stack web application built with React, Express.js, and MySQL.

## Project Structure

```
├── backend/              # Express.js backend
│   ├── config/          # Configuration files
│   │   └── db.config.js # MySQL database configuration
│   ├── routes/          # API routes
│   ├── server.js        # Main server file
│   ├── package.json     # Backend dependencies
│   └── .env.example     # Environment variables example
│
└── frontend/            # React frontend
    ├── public/          # Static files
    │   └── index.html   # HTML template
    ├── src/             # React source code
    │   ├── pages/       # Page components
    │   │   ├── home-page/
    │   │   ├── profile-page/
    │   │   ├── input-page/
    │   │   ├── output-page/
    │   │   └── log-reg-page/
    │   ├── App.js       # Main App component
    │   └── index.js     # React entry point
    └── package.json     # Frontend dependencies
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` and update with your MySQL credentials.

4. Start the server:
   ```bash
   npm start
   ```
   For development with auto-reload:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will open in your browser at `http://localhost:3000`.

## Database Setup

1. Create a MySQL database
2. Update the `backend/config/db.config.js` file with your database credentials
3. Create necessary tables (to be implemented)

## Technologies Used

- **Frontend**: React, React Router DOM, Axios
- **Backend**: Express.js, MySQL2, CORS
- **Database**: MySQL
