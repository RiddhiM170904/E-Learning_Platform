# System Architecture - Role-Based Access Control

## Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         SIGNUP PROCESS                           │
└─────────────────────────────────────────────────────────────────┘

User visits /signup
    │
    ├─► Enters: Name, Email, Password, Confirm Password
    │
    └─► Selects Role:
         ├─► User (Student) 
         └─► Admin (Instructor)
              │
              ▼
        POST /api/auth/signup
              │
              ├─► Validates input
              ├─► Checks if email exists
              ├─► Hashes password
              ├─► Creates user with role
              ├─► Generates JWT token (includes role)
              │
              ▼
        Returns: { token, user: { id, name, email, role } }
              │
              ▼
        Frontend stores token & user
              │
              ├─► If role === 'admin' → Redirect to /admin
              └─► If role === 'user'  → Redirect to /dashboard
```

## Admin Dashboard Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     ADMIN DASHBOARD (/admin)                     │
└─────────────────────────────────────────────────────────────────┘

Access Check:
    │
    ├─► PrivateRoute checks if authenticated
    │
    └─► Checks if user.role === 'admin'
         │
         ├─► ✅ Yes → Load Admin Dashboard
         └─► ❌ No  → Redirect to home


┌──────────────────────────────────────────────────────────────────┐
│                         TAB 1: OVERVIEW                          │
└──────────────────────────────────────────────────────────────────┘
GET /api/users/stats
    │
    └─► Shows:
        ├─► Total Users
        ├─► Total Enrollments
        ├─► Recent Users (last 5)
        └─► Recent Enrollments (last 5)


┌──────────────────────────────────────────────────────────────────┐
│                          TAB 2: USERS                            │
└──────────────────────────────────────────────────────────────────┘
GET /api/users
    │
    └─► Displays table with:
        ├─► Name
        ├─► Email
        ├─► Role (badge)
        ├─► Join Date
        └─► Delete button (if not admin)
             │
             └─► DELETE /api/users/:id (admin only)


┌──────────────────────────────────────────────────────────────────┐
│                         TAB 3: COURSES                           │
└──────────────────────────────────────────────────────────────────┘

GET /api/courses (limit: 100)
    │
    ├─► CREATE COURSE
    │   │
    │   └─► Click "Create Course" button
    │        │
    │        └─► Fill form:
    │            ├─► Title
    │            ├─► Description
    │            ├─► Price
    │            ├─► Category
    │            ├─► Difficulty
    │            └─► Thumbnail URL
    │                 │
    │                 └─► POST /api/courses (admin only)
    │
    ├─► UPDATE COURSE
    │   │
    │   └─► Click "Edit" button
    │        │
    │        ├─► Form pre-fills with course data
    │        ├─► Modify fields
    │        └─► PUT /api/courses/:id (admin only)
    │
    └─► DELETE COURSE
        │
        └─► Click "Delete" button
             │
             ├─► Confirmation dialog
             └─► DELETE /api/courses/:id (admin only)
```

## User Dashboard Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER DASHBOARD (/dashboard)                   │
└─────────────────────────────────────────────────────────────────┘

Access Check:
    │
    └─► PrivateRoute checks if authenticated
         │
         └─► ✅ Authenticated → Load Dashboard


┌──────────────────────────────────────────────────────────────────┐
│                   TAB 1: MY ENROLLED COURSES                     │
└──────────────────────────────────────────────────────────────────┘

GET /api/enrollments/me
    │
    └─► Returns enrollments with course details:
         │
         ├─► Course info (title, description, category, difficulty)
         ├─► Progress data (completed lessons, percentage)
         ├─► Enrollment date
         └─► Last accessed date
              │
              └─► Display:
                  ├─► Statistics Cards
                  │   ├─► Total Enrolled
                  │   ├─► Completed
                  │   └─► In Progress
                  │
                  └─► Course Cards with:
                      ├─► Thumbnail
                      ├─► Title & Description
                      ├─► Progress Bar
                      ├─► Status Badge
                      └─► "Start/Continue Learning" button


┌──────────────────────────────────────────────────────────────────┐
│                    TAB 2: AVAILABLE COURSES                      │
└──────────────────────────────────────────────────────────────────┘

GET /api/courses (limit: 50)
    │
    └─► Also GET /api/enrollments/me (to check enrollment status)
         │
         └─► For each course:
              │
              ├─► Is enrolled?
              │   │
              │   ├─► ✅ Yes → Show "Enrolled" badge + "View Course" link
              │   └─► ❌ No  → Show "Enroll Now" button
              │                 │
              │                 └─► Click "Enroll Now"
              │                      │
              │                      └─► POST /api/enrollments
              │                           { courseId: "..." }
              │                            │
              │                            ├─► Creates enrollment
              │                            ├─► Refreshes data
              │                            └─► Updates UI
              │
              └─► Display course cards with:
                  ├─► Thumbnail
                  ├─► Title & Description
                  ├─► Category & Difficulty badges
                  ├─► Price
                  └─► Enroll button or Enrolled status
```

## Authorization Matrix

```
┌──────────────────────────────────────────────────────────────────┐
│                      ROUTE AUTHORIZATION                         │
└──────────────────────────────────────────────────────────────────┘

ENDPOINT                    PUBLIC  USER   ADMIN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
POST /api/auth/signup         ✓      -      -
POST /api/auth/login          ✓      -      -
GET  /api/courses             ✓      ✓      ✓
GET  /api/courses/:id         ✓      ✓      ✓
POST /api/courses             ✗      ✗      ✓
PUT  /api/courses/:id         ✗      ✗      ✓
DELETE /api/courses/:id       ✗      ✗      ✓
POST /api/enrollments         ✗      ✓      ✓
GET  /api/enrollments/me      ✗      ✓      ✓
PUT  /api/enrollments/:id     ✗      ✓      ✓
DELETE /api/enrollments/:id   ✗      ✓      ✓
GET  /api/users               ✗      ✗      ✓
DELETE /api/users/:id         ✗      ✗      ✓
GET  /api/users/stats         ✗      ✗      ✓

✓ = Allowed
✗ = Forbidden (403)
- = N/A
```

## Frontend Route Protection

```
┌──────────────────────────────────────────────────────────────────┐
│                     ROUTE PROTECTION FLOW                        │
└──────────────────────────────────────────────────────────────────┘

User navigates to route
    │
    ▼
┌───────────────┐
│ Is Protected? │
└───────┬───────┘
        │
    ┌───┴───┐
    │  No   │ → Render component
    └───────┘
        │
    ┌───┴───┐
    │  Yes  │ → PrivateRoute component
    └───┬───┘
        │
        ▼
┌──────────────────┐
│ Is Authenticated?│
└────────┬─────────┘
         │
    ┌────┴────┐
    │   No    │ → Redirect to /login
    └─────────┘
         │
    ┌────┴────┐
    │   Yes   │
    └────┬────┘
         │
         ▼
┌────────────────┐
│ Admin Required?│
└────────┬───────┘
         │
    ┌────┴────┐
    │   No    │ → Render component
    └─────────┘
         │
    ┌────┴────┐
    │   Yes   │
    └────┬────┘
         │
         ▼
┌────────────────┐
│  Is Admin?     │
└────────┬───────┘
         │
    ┌────┴────┐
    │   No    │ → Redirect to /
    └─────────┘
         │
    ┌────┴────┐
    │   Yes   │ → Render component
    └─────────┘
```

## Data Flow Example: Course Enrollment

```
┌──────────────────────────────────────────────────────────────────┐
│             COMPLETE ENROLLMENT FLOW                             │
└──────────────────────────────────────────────────────────────────┘

1. User browses available courses
   │
   └─► Frontend: GET /api/courses
        │
        └─► Backend: Returns all courses (public)

2. User clicks "Enroll Now"
   │
   └─► Frontend: POST /api/enrollments
        │         { courseId: "course123" }
        │         Headers: { Authorization: "Bearer token..." }
        │
        └─► Backend:
             │
             ├─► Middleware: verify JWT token
             ├─► Middleware: extract user from token
             ├─► Controller: Check if course exists
             ├─► Controller: Check if already enrolled
             ├─► Controller: Create enrollment document
             │                { userId, courseId, progress: [] }
             │
             └─► Returns: { success: true, data: enrollment }

3. Frontend updates UI
   │
   ├─► Changes "Enroll Now" → "Enrolled" ✓
   ├─► Adds course to enrolled list
   └─► Shows success message

4. User switches to "My Enrolled Courses"
   │
   └─► Frontend: GET /api/enrollments/me
        │
        └─► Backend:
             │
             ├─► Finds all enrollments for user
             ├─► Populates course details
             ├─► Calculates progress percentage
             │
             └─► Returns: [{
                     _id: "enrollment123",
                     course: { title, description, ... },
                     progress: [...],
                     progressPercentage: 0
                 }]

5. Frontend displays enrolled course
   │
   └─► Shows course card with:
        ├─► Course details
        ├─► Progress bar (0%)
        ├─► "Start Learning" button
        └─► Status: "Not Started"
```

## Key Security Features

```
┌──────────────────────────────────────────────────────────────────┐
│                       SECURITY LAYERS                            │
└──────────────────────────────────────────────────────────────────┘

LAYER 1: Frontend Route Protection
    │
    └─► PrivateRoute component blocks unauthorized access
         └─► Redirects to login if not authenticated

LAYER 2: JWT Authentication
    │
    └─► All protected endpoints verify token
         └─► Token includes: { id, role }

LAYER 3: Role Authorization
    │
    └─► authorize() middleware checks user role
         └─► Returns 403 if role doesn't match

LAYER 4: Input Validation
    │
    └─► Controllers validate all input data
         └─► Prevents malicious data injection

LAYER 5: Password Security
    │
    └─► bcrypt hashing (10 rounds)
         └─► Passwords never stored in plain text

LAYER 6: HTTP-Only Cookies (optional)
    │
    └─► Tokens can be stored in secure cookies
         └─► Prevents XSS attacks
```

This architecture ensures:
✅ Separation of concerns (admin vs user features)
✅ Secure authentication and authorization
✅ Role-based access control at multiple layers
✅ Smooth user experience with auto-redirects
✅ Real-time UI updates after actions
✅ Comprehensive error handling
