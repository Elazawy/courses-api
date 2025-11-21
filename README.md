# Courses Management API

A RESTful API built with Node.js and Express for managing courses. This API provides CRUD operations for courses with user authentication, role-based authorization, and image upload capabilities.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Authentication & Authorization](#authentication--authorization)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Course Management**: Complete CRUD operations for courses
- **User Authentication**: Secure registration and login with JWT
- **Role-Based Authorization**: ADMIN, MANAGER, and USER roles
- **Image Upload**: Profile image upload support with Multer
- **Input Validation**: Request validation using Express Validator
- **Error Handling**: Centralized error handling middleware
- **Password Security**: Bcrypt password hashing
- **CORS Enabled**: Cross-origin resource sharing support
- **Pagination**: Support for paginated course listings

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5.1.0
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: Bcrypt
- **Validation**: Express Validator
- **File Upload**: Multer
- **Development**: Nodemon
- **Others**: CORS, Dotenv

## 📁 Project Structure

```
courses/
├── controllers/
│   ├── courses.controller.js
│   └── users.controller.js
├── middlewares/
│   ├── allowedTo.js
│   ├── asyncWrapper.js
│   └── verifyToken.js
├── models/
│   ├── course.model.js
│   └── user.model.js
├── routes/
│   ├── courses.route.js
│   └── users.route.js
├── uploads/
│   └── (uploaded images)
├── utils/
│   ├── appError.js
│   ├── httpStatusText.js
│   └── userRoles.js
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md
```

## 🚀 Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/courses-api.git
   cd courses-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (see below)

5. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm start
   
   # Production mode
   node app.js
   ```

The server will start on `http://localhost:4000` (or your configured PORT).

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=4000

# Database
DB_URI=mongodb://localhost:27017/courses
# Or for MongoDB Atlas:
# DB_URI=mongodb+srv://username:password@cluster.mongodb.net/courses

# JWT Secret
JWT_SECRET_KEY=your_super_secret_jwt_key_here_change_in_production
```

## 📡 API Endpoints

### Courses

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| GET | `/api/courses` | Get all courses (with pagination) | No | - |
| GET | `/api/courses/:courseId` | Get single course by ID | No | - |
| POST | `/api/courses` | Create a new course | No | - |
| PATCH | `/api/courses/:courseId` | Update a course | No | - |
| DELETE | `/api/courses/:courseId` | Delete a course | Yes | ADMIN, MANAGER |

### Users

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| GET | `/api/users` | Get all users | Yes | - |
| POST | `/api/users/register` | Register new user | No | - |
| POST | `/api/users/login` | Login user | No | - |

### Query Parameters

**Get All Courses** supports pagination:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

Example: `/api/courses?page=2&limit=5`

## 📝 Request & Response Examples

### Create a Course

**Request:**
```http
POST /api/courses
Content-Type: application/json

{
  "name": "Advanced Node.js Development",
  "price": 99.99
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "course": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Advanced Node.js Development",
      "price": 99.99
    }
  }
}
```

### Register a User

**Request:**
```http
POST /api/users/register
Content-Type: multipart/form-data

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "SecurePassword123",
  "role": "USER",
  "image": [file]
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "role": "USER",
    "image": "uploads/image-1234567890.jpg"
  }
}
```

### Login

**Request:**
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "SecurePassword123"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Get All Courses (Paginated)

**Request:**
```http
GET /api/courses?page=1&limit=10
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "courses": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Advanced Node.js Development",
        "price": 99.99
      },
      {
        "_id": "507f1f77bcf86cd799439013",
        "name": "React Fundamentals",
        "price": 79.99
      }
    ]
  }
}
```

### Update a Course

**Request:**
```http
PATCH /api/courses/507f1f77bcf86cd799439011
Content-Type: application/json

{
  "name": "Advanced Node.js & Express Development",
  "price": 109.99
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "course": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Advanced Node.js & Express Development",
      "price": 109.99
    }
  }
}
```

### Delete a Course (Protected)

**Request:**
```http
DELETE /api/courses/507f1f77bcf86cd799439011
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "course": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Advanced Node.js & Express Development",
      "price": 109.99
    }
  }
}
```

## 🔒 Authentication & Authorization

### Using JWT Token

After logging in, include the JWT token in the Authorization header:

```http
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

### User Roles

- **USER**: Default role for registered users
- **MANAGER**: Can delete courses
- **ADMIN**: Full access to all operations

## ⚠️ Error Handling

The API uses consistent error responses:

```json
{
  "status": "fail",
  "message": "Course not found",
  "code": 404,
  "data": null
}
```

### Common Error Codes

- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing or invalid token)
- `404` - Not Found
- `500` - Internal Server Error

## 🔮 Future Improvements

- [ ] Add course categories and tags
- [ ] Implement course search and filtering
- [ ] Add course reviews and ratings
- [ ] Implement user enrollment system
- [ ] Add email verification for registration
- [ ] Implement password reset functionality
- [ ] Add API rate limiting
- [ ] Create comprehensive API documentation with Swagger
- [ ] Add unit and integration tests
- [ ] Implement caching with Redis
- [ ] Add course content management (videos, documents)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and adhere to the existing coding style.

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ using Node.js and Express**

For questions or support, please open an issue in the GitHub repository.
