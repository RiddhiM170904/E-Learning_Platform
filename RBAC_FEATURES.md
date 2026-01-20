# Role-Based Access Control (RBAC) Implementation

## Overview
This E-Learning platform now includes complete role-based access control with separate dashboards and features for Admins and Users.

## Features Implemented

### 1. Authentication with Role Selection

#### Signup Page
- Users can now select their role during registration:
  - **User (Student)**: For learners who want to enroll in courses
  - **Admin (Instructor)**: For instructors who want to create and manage courses
- Role selection is prominently displayed with helpful descriptions
- Form validates all inputs including role before submission

#### Login Page
- Existing login functionality enhanced with role-based redirection
- After login, users are automatically redirected based on their role:
  - **Admins** → `/admin` dashboard
  - **Users** → `/dashboard` (student dashboard)

### 2. Admin Dashboard Features

Access: `/admin` (Requires admin role)

#### Course Management (CRUD Operations)
- **Create Courses**: Form to add new courses with:
  - Title
  - Description
  - Price
  - Category (Programming, Design, Business, Marketing, Data Science, Other)
  - Difficulty (Beginner, Intermediate, Advanced)
  - Thumbnail URL
  
- **Update Courses**: 
  - Edit button on each course card
  - Pre-fills form with existing course data
  - Updates course details in real-time
  
- **Delete Courses**:
  - Delete button with confirmation dialog
  - Removes courses from the system
  
- **View Course List**:
  - Grid layout showing all courses
  - Displays course details: title, description, category, difficulty, price
  - Quick access to edit/delete actions

#### Additional Admin Features
- **Overview Tab**: Dashboard statistics including:
  - Total users
  - Total enrollments
  - Recent users list
  - Recent enrollments list
  
- **Users Tab**: 
  - View all registered users
  - See user roles (Admin/User badges)
  - Delete user accounts (except admin users)
  - User registration dates

### 3. User Dashboard Features

Access: `/dashboard` (Requires authentication)

#### Two-Tab Interface

**Tab 1: My Enrolled Courses**
- Displays all courses the user has enrolled in
- Shows progress tracking:
  - Progress percentage
  - Visual progress bar
  - Status badges (Not Started, In Progress, Completed)
- Course thumbnails and descriptions
- "Continue Learning" or "Start Learning" buttons
- Statistics cards showing:
  - Total enrolled courses
  - Completed courses count
  - In-progress courses count

**Tab 2: Available Courses**
- Browse all courses available on the platform
- Grid layout with course cards showing:
  - Course thumbnail
  - Title and description
  - Category and difficulty badges
  - Price information
- **Enroll Now** button for non-enrolled courses
- **Enrolled** badge with "View Course" link for enrolled courses
- One-click enrollment functionality

### 4. Backend Implementation

#### Updated Auth Controller
- Signup endpoint now accepts `role` parameter
- Validates role (defaults to 'user' if invalid)
- Returns user role in JWT token response

#### Authorization Middleware
- `protect`: Verifies JWT token and authenticates users
- `authorize(...roles)`: Restricts access based on user roles
- Returns 403 Forbidden for unauthorized access attempts

#### Protected Routes
- Course creation, update, delete: Admin only
- Enrollment operations: Authenticated users only
- User management: Admin only

### 5. Frontend Routing & Protection

#### Route Configuration
```
/ - Landing page (public)
/login - Login page (public)
/signup - Signup page (public)
/courses - Course listing (public)
/courses/:slug - Course details (public)
/dashboard - User dashboard (protected)
/admin - Admin panel (protected, admin only)
```

#### PrivateRoute Component
- Checks authentication status
- Validates admin role for admin-only routes
- Redirects to login if not authenticated
- Redirects to home if non-admin tries to access admin routes

### 6. User Experience Enhancements

#### Header Navigation
- Dynamically shows/hides menu items based on:
  - Authentication status
  - User role
- Admin users see both "Dashboard" and "Admin" links
- Regular users only see "Dashboard" link

#### Role-Based Redirection
- Post-login redirect based on user role
- Post-signup redirect based on selected role
- Maintains security by preventing unauthorized access

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register with role selection
- `POST /api/auth/login` - Login with role-based response

### Courses (Admin Only for CUD operations)
- `GET /api/courses` - List all courses (public)
- `GET /api/courses/:id` - Get course details (public)
- `POST /api/courses` - Create course (admin only)
- `PUT /api/courses/:id` - Update course (admin only)
- `DELETE /api/courses/:id` - Delete course (admin only)

### Enrollments (Authenticated Users)
- `POST /api/enrollments` - Enroll in a course
- `GET /api/enrollments/me` - Get user's enrollments
- `PUT /api/enrollments/:id/progress` - Update progress
- `DELETE /api/enrollments/:id` - Unenroll from course

### Users (Admin Only)
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user details
- `DELETE /api/users/:id` - Delete user account

## Security Features

1. **JWT-based Authentication**: Secure token-based auth
2. **Role Validation**: Server-side role checking on all protected routes
3. **Password Hashing**: bcrypt for secure password storage
4. **HTTP-only Cookies**: Secure token storage option
5. **Authorization Middleware**: Prevents unauthorized access
6. **Client-side Route Protection**: PrivateRoute component guards sensitive routes

## Usage Instructions

### For Students (User Role)
1. Sign up selecting "User (Student)" role
2. Browse available courses in the "Available Courses" tab
3. Click "Enroll Now" to join a course
4. Track progress in "My Enrolled Courses" tab
5. Continue learning from where you left off

### For Instructors (Admin Role)
1. Sign up selecting "Admin (Instructor)" role
2. Access admin panel via `/admin` or navigation menu
3. Create new courses using the course creation form
4. Edit existing courses by clicking "Edit" button
5. Delete courses using the "Delete" button
6. View platform statistics in the Overview tab
7. Manage users in the Users tab

## Testing the Implementation

### Test User Accounts
Create test accounts with different roles:

**Admin Account:**
- Email: admin@test.com
- Password: admin123
- Role: Admin

**User Account:**
- Email: user@test.com
- Password: user123
- Role: User

### Test Scenarios
1. **Role-based Signup**: Create accounts with both roles
2. **Admin Course Creation**: Create, update, and delete courses
3. **User Enrollment**: Browse and enroll in courses as a user
4. **Access Control**: Try accessing `/admin` as a regular user (should redirect)
5. **Role-based Navigation**: Verify menu items change based on role
6. **Progress Tracking**: Enroll in courses and verify progress display

## Files Modified

### Backend
- `backend/controllers/auth.controller.js` - Added role support in signup
- `backend/middleware/auth.js` - Authorization middleware (already existed)
- `backend/routes/course.routes.js` - Protected with admin authorization

### Frontend
- `frontend/src/pages/Signup.jsx` - Added role selector
- `frontend/src/pages/Login.jsx` - Added role-based redirection
- `frontend/src/pages/Dashboard.jsx` - Complete redesign with enrollment features
- `frontend/src/pages/Admin.jsx` - Added update course functionality
- `frontend/src/context/AuthContext.jsx` - Updated signup to accept role
- `frontend/src/components/Header.jsx` - Role-based menu (already existed)
- `frontend/src/components/PrivateRoute.jsx` - Admin route protection (already existed)

## Future Enhancements

Potential improvements for the RBAC system:
- Multiple role assignments (e.g., user can be both student and instructor)
- Super admin role for platform management
- Course approval workflow for instructor-created courses
- Student analytics for admins
- Bulk operations for course management
- Export/import course data
- Course categories management
- Email notifications for enrollments
- Certificate generation upon course completion
