# Quick Start Guide - RBAC E-Learning Platform

## 🚀 Running the Application

### 1. Start Backend Server
```bash
cd backend
npm install
npm run dev
```
Backend will run on: http://localhost:5000

### 2. Start Frontend Development Server
```bash
cd frontend
npm install
npm run dev
```
Frontend will run on: http://localhost:5173

## 👥 User Roles & Access

### Admin Role (Instructor)
**Access:** Full course management capabilities

**Features:**
- ✅ Create new courses
- ✅ Edit existing courses
- ✅ Delete courses
- ✅ View all courses
- ✅ Manage users
- ✅ View platform statistics

**How to become Admin:**
1. Go to `/signup`
2. Select "Admin (Instructor)" from role dropdown
3. Complete registration
4. Auto-redirected to `/admin` dashboard

### User Role (Student)
**Access:** Course enrollment and learning

**Features:**
- ✅ Browse all available courses
- ✅ Enroll in courses with one click
- ✅ View enrolled courses
- ✅ Track learning progress
- ✅ Continue from where they left off

**How to become User:**
1. Go to `/signup`
2. Select "User (Student)" from role dropdown
3. Complete registration
4. Auto-redirected to `/dashboard`

## 🎯 Quick Testing Workflow

### Test Admin Features:
```
1. Sign up as Admin
2. Create a course:
   - Title: "Introduction to React"
   - Description: "Learn React from scratch"
   - Category: Programming
   - Difficulty: Beginner
   - Price: 49.99
3. Edit the course (change price to 39.99)
4. View the course in the list
```

### Test User Features:
```
1. Sign up as User
2. Go to "Available Courses" tab
3. Click "Enroll Now" on a course
4. Switch to "My Enrolled Courses" tab
5. Verify course appears with progress tracking
6. Click "Start Learning"
```

### Test Access Control:
```
1. Login as User
2. Try accessing: http://localhost:5173/admin
3. Verify: Redirected to home (access denied)
4. Logout and login as Admin
5. Access: http://localhost:5173/admin
6. Verify: Admin dashboard loads successfully
```

## 📋 Feature Checklist

### ✅ Signup & Login
- [x] Role selection in signup (User/Admin)
- [x] Role-based redirect after signup
- [x] Role-based redirect after login
- [x] JWT token includes role

### ✅ Admin Dashboard
- [x] Create course form
- [x] Update course form
- [x] Delete course with confirmation
- [x] View all courses
- [x] User management
- [x] Platform statistics

### ✅ User Dashboard
- [x] View enrolled courses
- [x] Browse available courses
- [x] Enroll in courses
- [x] Progress tracking
- [x] Course statistics
- [x] Tab-based navigation

### ✅ Security
- [x] Protected routes (frontend)
- [x] Authorization middleware (backend)
- [x] Role validation on all endpoints
- [x] Admin-only course CRUD
- [x] Authenticated enrollment

### ✅ UI/UX
- [x] Responsive design
- [x] Loading states
- [x] Error handling
- [x] Confirmation dialogs
- [x] Role-based navigation menu
- [x] Status badges
- [x] Progress bars

## 🔑 Demo Credentials (If seeded)

Check if `backend/seed.js` has created demo accounts:

**Admin:**
- Email: admin@elearning.com
- Password: admin123

**User:**
- Email: demo@elearning.com
- Password: demo123

## 📱 Key Pages

| Page | URL | Access | Description |
|------|-----|--------|-------------|
| Home | `/` | Public | Landing page |
| Signup | `/signup` | Public | Register with role selection |
| Login | `/login` | Public | Login with auto-redirect |
| Courses | `/courses` | Public | Browse all courses |
| User Dashboard | `/dashboard` | Users | Enrolled & available courses |
| Admin Panel | `/admin` | Admins | Course & user management |

## 🎨 Screenshots Reference

### Signup Page Features:
- Name input
- Email input
- Password input
- Confirm password input
- **Role selector** (NEW) - User/Admin dropdown
- Helper text explaining roles

### Admin Dashboard:
- Three tabs: Overview, Users, Courses
- Course creation form with all fields
- Course grid with Edit/Delete buttons
- User table with role badges

### User Dashboard:
- Two tabs: My Enrolled Courses, Available Courses
- Statistics cards (enrolled, completed, in-progress)
- Course cards with enrollment buttons
- Progress bars on enrolled courses

## 🐛 Troubleshooting

### Backend won't start:
```bash
# Check MongoDB connection
# Verify .env file exists with correct DB URL
# Check if port 5000 is available
```

### Frontend can't connect:
```bash
# Verify backend is running on port 5000
# Check CORS settings in backend/server.js
# Verify API base URL in frontend/src/utils/api.js
```

### Role not saving:
```bash
# Check backend auth.controller.js
# Verify role field in User model
# Check JWT token includes role
```

## 💡 Tips

1. **Create Admin First**: Start by creating an admin account to set up courses
2. **Test Both Roles**: Create both admin and user accounts to see full functionality
3. **Check Browser Console**: Monitor for any API errors
4. **Use Network Tab**: Verify API calls are successful (200/201 status)
5. **Clear LocalStorage**: If issues persist, clear browser storage and login again

## 🎉 Success Indicators

You'll know everything is working when:
- ✅ Role selector appears in signup form
- ✅ Admin can create/edit/delete courses
- ✅ Users can enroll in courses
- ✅ Progress tracking displays correctly
- ✅ Admins are blocked from accessing /admin
- ✅ Navigation menu changes based on role
- ✅ Redirects work after login/signup

Happy Learning! 📚
