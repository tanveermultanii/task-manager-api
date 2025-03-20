# Task Manager API

A simple **RESTful API** for managing tasks with **JWT authentication** and **MongoDB**.

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=flat&logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey?style=flat&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat&logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=flat&logo=jsonwebtokens)

---

## Live API
🔗 **Base URL:** [`https://task-manager-api-4ka0.onrender.com`](https://task-manager-api-4ka0.onrender.com/)

---

## Features
- User Authentication (Signup/Login with JWT)
- Full CRUD operations for tasks (Create, Read, Update, Delete)  
- Protected routes using JWT authentication  
- MongoDB Atlas for database storage 
- Deployed on Render for public access

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/api/auth/signup` | Register a new user |
| **POST** | `/api/auth/login` | Login and receive JWT token |

### Tasks (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/api/tasks` | Create a new task |
| **GET** | `/api/tasks` | Get all tasks for logged-in user |
| **PUT** | `/api/tasks/:id` | Update a specific task |
| **DELETE** | `/api/tasks/:id` | Delete a task |

---

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/tanveermultanii/task-manager-api.git
cd task-manager-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add:
```plaintext
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_random_secret_key_here
PORT=8000
```

### 4. Start the Server
```bash
npx nodemon server.js  # For development (auto-restart)
# OR
node server.js         # For standard Node.js runtime
```
The API will now run at: `http://localhost:8000`

---

## Deployment
### Deployed on Render
- **Live API URL:** [`https://task-manager-api-4ka0.onrender.com`](https://task-manager-api-4ka0.onrender.com/)
- **To Deploy:** Push changes to GitHub, then trigger deployment on Render.

---

## Usage Examples

### 1. User Signup
**Request:**  
```bash
curl -X POST https://task-manager-api-4ka0.onrender.com/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{
         "username": "tanveer",
         "email": "tanveer@example.com",
         "password": "securepassword"
     }'
```
**Response:**
```json
{
    "message": "User created successfully"
}
```

### 2. User Login
**Request:**
```bash
curl -X POST https://task-manager-api-4ka0.onrender.com/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
         "email": "tanveer@example.com",
         "password": "securepassword"
     }'
```
**Response:**
```json
{
    "token": "your_jwt_token"
}
```

### 3. Create a Task
**Request:**
```bash
curl -X POST https://task-manager-api-4ka0.onrender.com/api/tasks \
     -H "Authorization: Bearer your_jwt_token" \
     -H "Content-Type: application/json" \
     -d '{
         "title": "Finish API Project",
         "description": "Complete all CRUD operations"
     }'
```
**Response:**
```json
{
    "_id": "task_id",
    "title": "Finish API Project",
    "description": "Complete all CRUD operations",
    "completed": false,
    "user": "your_user_id",
    "createdAt": "timestamp"
}
```

---

## Technologies Used
- **Node.js** (Backend)
- **Express.js** (Framework)
- **MongoDB Atlas** (Database)
- **Mongoose** (ORM)
- **JWT** (Authentication)
- **Render** (Deployment)

---

## License
This project is licensed under the **MIT License**.
You are free to **use, modify, and distribute** this project under the license terms.
For more details, see the [LICENSE](LICENSE) file or read the full MIT License [here](https://opensource.org/licenses/MIT).
