# E-Learning Platform - Frontend

A modern, responsive frontend for the E-Learning platform built with React, Vite, and Tailwind CSS.

## Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Course Browsing**: Filter courses by category, difficulty, and search
- **User Authentication**: Secure login and signup flows
- **Personal Dashboard**: Track enrolled courses and progress
- **Admin Panel**: Manage users and courses (admin only)
- **Progress Tracking**: Visual progress indicators for courses
- **Responsive Design**: Mobile-first approach, works on all devices

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (see backend README)

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
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── CourseCard.jsx
│   │   ├── Pagination.jsx
│   │   └── PrivateRoute.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Courses.jsx
│   │   ├── CourseDetail.jsx
│   │   ├── Dashboard.jsx
│   │   └── Admin.jsx
│   ├── services/
│   │   └── api.service.js
│   ├── utils/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Routes

| Path | Component | Access | Description |
|------|-----------|--------|-------------|
| `/` | Landing | Public | Homepage with features |
| `/login` | Login | Public | User login |
| `/signup` | Signup | Public | User registration |
| `/courses` | Courses | Public | Browse all courses |
| `/courses/:slug` | CourseDetail | Public | View course details |
| `/dashboard` | Dashboard | Private | User dashboard |
| `/admin` | Admin | Admin Only | Admin panel |

## Components

### Layout Components

- **Header**: Navigation bar with auth state
- **Footer**: Site footer with links
- **PrivateRoute**: Protected route wrapper

### Feature Components

- **CourseCard**: Course display card with thumbnail
- **Pagination**: Page navigation component

## Context & State Management

### AuthContext

Manages authentication state globally:

```javascript
const { user, login, signup, logout, isAuthenticated, isAdmin } = useAuth();
```

## API Integration

### Services

All API calls are centralized in `services/api.service.js`:

- `authService`: Authentication operations
- `courseService`: Course CRUD operations
- `enrollmentService`: Enrollment management
- `userService`: Admin user operations

### Axios Configuration

Axios is configured in `utils/api.js` with:
- Base URL from environment
- Automatic token injection
- Response/request interceptors
- Error handling

## Styling

### Tailwind CSS

Custom configuration in `tailwind.config.js`:

**Custom Colors**:
- Primary palette (blue shades)

**Custom Components**:
- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline`
- `.input`
- `.card`

## Authentication Flow

1. User submits login/signup form
2. API call to backend
3. Token stored in localStorage
4. User data stored in context
5. Protected routes become accessible

## Features by Page

### Landing Page
- Hero section with CTA
- Feature highlights
- Course categories preview

### Courses Page
- Filter by category, difficulty
- Search functionality
- Pagination
- Course grid display

### Course Detail Page
- Course information
- Syllabus/lessons list
- Enrollment button
- Pricing display

### Dashboard
- Enrolled courses
- Progress tracking
- Quick stats
- Continue learning buttons

### Admin Panel
- User management
- Course CRUD operations
- Platform statistics
- Recent activity

## Environment Variables

```env
VITE_API_URL=http://localhost:5000/api  # Backend API URL
```

For production:
```env
VITE_API_URL=https://your-api-domain.com/api
```

## Building for Production

```bash
npm run build
```

Build output will be in `dist/` directory.

## Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy!

**Environment Variables in Vercel**:
- `VITE_API_URL`: Your production API URL

### Manual Deployment

1. Build the project: `npm run build`
2. Upload `dist/` folder to your hosting service
3. Configure server to serve `index.html` for all routes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Code splitting with React lazy loading
- Vite's fast HMR in development
- Optimized production builds
- Image lazy loading
- Efficient re-renders with React hooks

## Responsive Breakpoints

Tailwind default breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## Demo Credentials

**User Account**:
- Email: `demo@elearning.com`
- Password: `demo123`

**Admin Account**:
- Email: `admin@elearning.com`
- Password: `admin123`

## License

MIT

## Author

Your Name
