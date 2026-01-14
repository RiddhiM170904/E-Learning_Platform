# E-Learning Platform - Backend

A comprehensive REST API for an e-learning platform built with Node.js, Express, and MongoDB.

## Features

- **Authentication & Authorization**: JWT-based auth with role-based access control (User/Admin)
- **Course Management**: Full CRUD operations for courses with lessons
- **Enrollment System**: Users can enroll in courses and track progress
- **User Management**: Admin panel for user oversight
- **Progress Tracking**: Track lesson completion and overall course progress

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Environment Variables**: dotenv

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Create environment file**:
   ```bash
   cp .env.example .env
   ```

3. **Configure environment variables** in `.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRE=7d
   CLIENT_URL=http://localhost:5173
   ```

4. **Seed the database** (optional):
   ```bash
   node seed.js
   ```

5. **Start the server**:
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/signup` | Register new user | Public |
| POST | `/login` | Login user | Public |
| GET | `/me` | Get current user | Private |
| POST | `/logout` | Logout user | Private |

### Courses (`/api/courses`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all courses (with filters) | Public |
| GET | `/:id` | Get single course by ID/slug | Public |
| POST | `/` | Create new course | Admin |
| PUT | `/:id` | Update course | Admin |
| DELETE | `/:id` | Delete course | Admin |

**Query Parameters for GET /**:
- `category`: Filter by category
- `difficulty`: Filter by difficulty level
- `search`: Search in title and description
- `page`: Page number (default: 1)
- `limit`: Results per page (default: 10)

### Enrollments (`/api/enrollments`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/` | Enroll in a course | Private |
| GET | `/me` | Get user's enrollments | Private |
| GET | `/:id` | Get single enrollment | Private |
| PUT | `/:id/progress` | Update progress | Private |
| DELETE | `/:id` | Delete enrollment | Private |

### Users (`/api/users`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all users | Admin |
| GET | `/stats` | Get platform statistics | Admin |
| GET | `/:id` | Get user by ID | Admin |
| DELETE | `/:id` | Delete user | Admin |

## Data Models

### User
```javascript
{
  name: String,
  email: String (unique),
  passwordHash: String,
  role: 'user' | 'admin',
  createdAt: Date
}
```

### Course
```javascript
{
  title: String,
  slug: String (auto-generated),
  description: String,
  price: Number,
  category: String,
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced',
  thumbnailUrl: String,
  lessons: [{
    title: String,
    contentHtml: String,
    videoUrl: String,
    order: Number
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Enrollment
```javascript
{
  userId: ObjectId,
  courseId: ObjectId,
  progress: Map<String, Boolean>,
  enrolledAt: Date,
  lastAccessedAt: Date
}
```

## Security Features

- Password hashing with bcrypt (10 rounds)
- JWT authentication with secure cookies
- HTTP-only cookies in production
- Role-based authorization
- Input validation and sanitization
- MongoDB injection protection
- CORS configuration

## Demo Credentials

After running the seed script:

**Admin Account**:
- Email: `admin@elearning.com`
- Password: `admin123`

**User Account**:
- Email: `demo@elearning.com`
- Password: `demo123`

## Project Structure

```
backend/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   ├── auth.controller.js
│   ├── course.controller.js
│   ├── enrollment.controller.js
│   └── user.controller.js
├── middleware/
│   ├── auth.js            # JWT verification & authorization
│   └── errorHandler.js    # Global error handler
├── models/
│   ├── User.model.js
│   ├── Course.model.js
│   ├── Enrollment.model.js
│   └── Review.model.js
├── routes/
│   ├── auth.routes.js
│   ├── course.routes.js
│   ├── enrollment.routes.js
│   └── user.routes.js
├── utils/
│   └── tokenUtils.js      # JWT token generation
├── .env.example
├── .gitignore
├── package.json
├── seed.js                # Database seeding script
└── server.js              # Application entry point
```

## Error Handling

The API uses a consistent error response format:

```javascript
{
  success: false,
  message: "Error message here",
  stack: "Stack trace (development only)"
}
```

## Testing

```bash
npm test
```

## Deployment

### MongoDB Atlas Setup

1. Create a MongoDB Atlas cluster
2. Whitelist your server IP or use 0.0.0.0/0 for testing
3. Create database user and get connection string
4. Add connection string to `MONGO_URI` in `.env`

### Render Deployment

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect your repository
4. Add environment variables
5. Deploy!

## Environment Variables for Production

```env
NODE_ENV=production
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=strong_random_secret
CLIENT_URL=https://your-frontend-domain.com
```

## License

MIT

## Author

Your Name
