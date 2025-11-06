# Full-Stack Web Application

A full-stack web application built with React, Express.js, and MySQL.

## Project Description

A recipe generator with a React frontend and an Express backend using a MySQL database. Users can generate, save, and view recipes, as well as manage user profiles and preferences.

## Project Structure

```
├── package.json
├── package-lock.json
├── README.md
├── backend/                          # Express.js backend
│   ├── config/
│   │   └── db.config.js              # MySQL connection config (uses env vars)
│   ├── controller/
│   │   ├── generate.controller.js
│   │   └── profileController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── model/
│   │   ├── Preferences.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── generate.routes.js
│   │   ├── output.routes.js
│   │   ├── profile.routes.js
│   │   ├── recipe.routes.js
│   │   └── user.routes.js
│   ├── services/
│   │   └── generate.service.js
│   ├── db.js                          # mysql2 pool
│   ├── init-db.sql                    # Database schema and seed
│   ├── generateTestToken.js
│   ├── server.js                      # App entrypoint
│   └── package.json                   # Backend dependencies
│
└── frontend/                         # React frontend (CRA)
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.js
    │   ├── index.js
    │   ├── pages/
    │   │   ├── home-page/
    │   │   │   └── style/HomePage.css
    │   │   ├── profile-page/
    │   │   ├── input-page/
    │   │   ├── output-page/
    │   │   ├── log-reg-page/
    │   │   └── generate-page/
    │   └── services/                  # Frontend API helpers (if any)
    └── package.json
```

## Installation & Start

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables (example):
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=<your_user>
   DB_PASSWORD=<your_password>
   DB_NAME=fridge
   ```

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

### Required Node Packages

- **Backend (backend/package.json)**
  - express, cors, dotenv, mysql2, jsonwebtoken, @google/genai
  - Dev: nodemon
- **Frontend (frontend/package.json)**
  - react, react-dom, react-router-dom, axios, lucide-react
  - Dev: react-scripts

## Database Setup

1. Create the MySQL database and tables by running:
   ```sql
   backend/init-db.sql
   ```
2. Ensure `.env` contains correct DB settings as above.
3. Connection is configured via `backend/config/db.config.js` and `backend/db.js` (mysql2 pool).


## API Testing
- **GET /api/recipes** - Fetch all recipes including ingredients
- **GET /api/recipes/:id** - Fetch a single recipe by ID including ingredients

## Technologies Used

- **Frontend**: React, React Router DOM, Axios
- **Backend**: Express.js, MySQL2, CORS
- **Database**: MySQL

## Visual Design

- **Colors** (from `HomePage.css`):
  - Background: `#111827` (dark), `#1f2937` (surfaces/nav)
  - Text: `#ffffff` (primary), `#9ca3af` (secondary)
  - Primary buttons: red `#dc2626` (hover `#b91c1c`), green `#10b981` (hover `#059669`), blue `#3b82f6` (hover `#2563eb`)
  - Difficulty tags: easy `#4ade80`, medium `#facc15`, hard `#f87171`
- **Typography**: No explicit web font configured; default system/browser fonts are used.
- **Principles**: Dark theme, strong contrast, responsive grid (1–3 columns), rounded corners, subtle card shadows.

## Branching Strategy

- **main**: Stable, production-ready code. Only via pull requests and review.
- **dev**: Integration branch for ongoing development; aggregates feature branches.
- **feature/<short-name>**: One task or feature per branch. Merge into `dev` via PR.
- **hotfix/<short-name>**: Urgent production fixes. Merge into both `main` and `dev`.

Recommended flow: create feature branch from `dev` → PR to `dev` → test → PR to `main` for release.

## Database Structure

MySQL with the following tables (see `backend/init-db.sql`):

- **users**
  - `id` INT PK AUTO_INCREMENT
  - `email` VARCHAR(100)
  - `password` VARCHAR(255)
- **preferences**
  - `id` INT PK AUTO_INCREMENT
  - `user_id` INT FK → users(id)
  - `experience_level` VARCHAR(50)
  - `cuisines` JSON
  - `dietary_restrictions` JSON
  - `allergies` JSON
- **recipes**
  - `id` INT PK AUTO_INCREMENT
  - `title` VARCHAR(255)
  - `image_url` VARCHAR(512)
  - `cook_time` VARCHAR(50)
  - `difficulty` VARCHAR(50)
  - `description` TEXT
  - `created_at`, `updated_at` TIMESTAMP
- **ingredients**
  - `id` INT PK AUTO_INCREMENT
  - `recipe_id` INT FK → recipes(id) ON DELETE CASCADE
  - `ingredient_text` VARCHAR(255)
- **results**
  - `id` INT PK AUTO_INCREMENT
  - `user_id` INT FK → users(id)
  - `input_value` TEXT
  - `output_value` TEXT
  - `created_at` TIMESTAMP
