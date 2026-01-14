# E-Learning Platform 🎓

A full-stack, production-ready e-learning platform built with the MERN stack (MongoDB, Express, React, Node.js). This platform enables users to browse courses, enroll, track their learning progress, while administrators can manage courses and users through a comprehensive admin panel.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)
![React](https://img.shields.io/badge/react-18.2.0-blue)

## 🌟 Features

### For Users
- **Course Browsing**: Filter courses by category, difficulty level, and search by keywords
- **User Authentication**: Secure JWT-based authentication with role-based access
- **Course Enrollment**: Simple one-click enrollment in courses
- **Progress Tracking**: Track completed lessons and overall course progress
- **Personal Dashboard**: View all enrolled courses with visual progress indicators
- **Responsive Design**: Fully responsive UI that works on all devices

### For Administrators
- **Course Management**: Create, edit, and delete courses with lessons
- **User Management**: View and manage platform users
- **Analytics Dashboard**: View platform statistics and recent activity
- **Role-Based Access**: Separate admin interface with protected routes

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### DevOps & Deployment
- **Frontend**: Vercel (recommended) or Netlify
- **Backend**: Render, Heroku, or Railway
- **Database**: MongoDB Atlas

## 📁 Project Structure

```
E-Learning_Platform/
├── backend/                 # Node.js + Express API
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Auth & error handling
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   ├── seed.js             # Database seeding
│   └── server.js           # Entry point
│
├── frontend/               # React + Vite application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React Context
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   └── App.jsx        # Root component
│   └── public/            # Static assets
│
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** account (or local MongoDB)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/E-Learning_Platform.git
   cd E-Learning_Platform
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   
   # Create .env file
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   
   # Seed the database (optional)
   node seed.js
   
   # Start the server
   npm run dev
   ```
   
   Backend will run on `http://localhost:5000`

3. **Setup Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   
   # Create .env file
   cp .env.example .env
   # Edit .env with backend API URL
   
   # Start the development server
   npm run dev
   ```
   
   Frontend will run on `http://localhost:5173`

### Environment Variables

#### Backend `.env`
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/elearning
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

#### Frontend `.env`
```env
VITE_API_URL=http://localhost:5000/api
```

## 📊 Data Models

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
  category: 'Programming' | 'Design' | 'Business' | 'Marketing' | 'Data Science' | 'Other',
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced',
  thumbnailUrl: String,
  lessons: [{ title, contentHtml, videoUrl, order }],
  createdAt: Date,
  updatedAt: Date
}
```

### Enrollment
```javascript
{
  userId: ObjectId (ref: User),
  courseId: ObjectId (ref: Course),
  progress: Map<lessonId, Boolean>,
  enrolledAt: Date,
  lastAccessedAt: Date
}
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `POST /api/auth/logout` - Logout user (Protected)

### Courses
- `GET /api/courses` - Get all courses (with filters)
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course (Admin)
- `PUT /api/courses/:id` - Update course (Admin)
- `DELETE /api/courses/:id` - Delete course (Admin)

### Enrollments
- `POST /api/enrollments` - Enroll in course (Protected)
- `GET /api/enrollments/me` - Get user enrollments (Protected)
- `PUT /api/enrollments/:id/progress` - Update progress (Protected)
- `DELETE /api/enrollments/:id` - Delete enrollment (Protected)

### Users (Admin Only)
- `GET /api/users` - Get all users
- `GET /api/users/stats` - Get platform statistics
- `GET /api/users/:id` - Get user by ID
- `DELETE /api/users/:id` - Delete user

## 🧪 Demo Credentials

After running the seed script (`node backend/seed.js`):

**Admin Account**
- Email: `admin@elearning.com`
- Password: `admin123`

**User Account**
- Email: `demo@elearning.com`
- Password: `demo123`

## 🎨 Screenshots

### Landing Page
Beautiful hero section with clear call-to-action and feature highlights.

### Course Catalog
Browse courses with advanced filtering by category, difficulty, and search.

### User Dashboard
Track your enrolled courses with visual progress indicators.

### Admin Panel
Comprehensive admin interface for managing courses and users.

## 🚢 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Set environment variable: `VITE_API_URL`
5. Deploy!

### Backend (Render)

1. Push your code to GitHub
2. Go to [Render](https://render.com)
3. Create new Web Service
4. Connect your repository
5. Set environment variables (MONGO_URI, JWT_SECRET, etc.)
6. Deploy!

### Database (MongoDB Atlas)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for testing)
5. Get connection string and add to backend `.env`

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📝 Development Roadmap

### Phase 1 (Completed) ✅
- User authentication and authorization
- Course CRUD operations
- Enrollment system
- Progress tracking
- Basic admin panel
- Responsive UI

### Phase 2 (Future Enhancements)
- [ ] Payment integration (Stripe)
- [ ] Video streaming with AWS S3
- [ ] Course reviews and ratings
- [ ] Discussion forums
- [ ] Certificates of completion
- [ ] Email notifications
- [ ] Advanced analytics dashboard
- [ ] Course recommendations
- [ ] Instructor dashboard
- [ ] Quiz and assessment system

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Design inspiration from modern e-learning platforms
- Icons from Heroicons
- Tailwind CSS for styling framework

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

---

**Built with ❤️ using the MERN Stack**