import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './models/Course.model.js';
import User from './models/User.model.js';
import Enrollment from './models/Enrollment.model.js';

dotenv.config();

const courses = [
  {
    title: 'Complete JavaScript Bootcamp 2024',
    description: 'Master JavaScript from basics to advanced concepts including ES6+, async/await, and more.',
    price: 0,
    category: 'Programming',
    difficulty: 'Beginner',
    thumbnailUrl: 'https://via.placeholder.com/400x225?text=JavaScript+Course',
    lessons: [
      { title: 'Introduction to JavaScript', contentHtml: '<h2>Welcome to JavaScript</h2><p>Learn the fundamentals...</p>', order: 1 },
      { title: 'Variables and Data Types', contentHtml: '<h2>Understanding Variables</h2><p>Let, const, var...</p>', order: 2 },
      { title: 'Functions and Scope', contentHtml: '<h2>Functions in JavaScript</h2><p>Function declarations...</p>', order: 3 }
    ]
  },
  {
    title: 'React - The Complete Guide',
    description: 'Dive deep into React.js - Hooks, Context API, Redux, and build real projects.',
    price: 49.99,
    category: 'Programming',
    difficulty: 'Intermediate',
    thumbnailUrl: 'https://via.placeholder.com/400x225?text=React+Course',
    lessons: [
      { title: 'React Basics', contentHtml: '<h2>Getting Started with React</h2><p>Components and JSX...</p>', order: 1 },
      { title: 'State and Props', contentHtml: '<h2>Managing State</h2><p>useState hook...</p>', order: 2 },
      { title: 'React Router', contentHtml: '<h2>Navigation in React</h2><p>React Router v6...</p>', order: 3 }
    ]
  },
  {
    title: 'UI/UX Design Masterclass',
    description: 'Learn professional UI/UX design principles, Figma, prototyping, and user research.',
    price: 39.99,
    category: 'Design',
    difficulty: 'Beginner',
    thumbnailUrl: 'https://via.placeholder.com/400x225?text=UI+UX+Design',
    lessons: [
      { title: 'Design Fundamentals', contentHtml: '<h2>Design Principles</h2><p>Color theory, typography...</p>', order: 1 },
      { title: 'Figma Basics', contentHtml: '<h2>Introduction to Figma</h2><p>Tools and features...</p>', order: 2 }
    ]
  },
  {
    title: 'Data Science with Python',
    description: 'Complete guide to data science using Python, NumPy, Pandas, and machine learning.',
    price: 59.99,
    category: 'Data Science',
    difficulty: 'Advanced',
    thumbnailUrl: 'https://via.placeholder.com/400x225?text=Data+Science',
    lessons: [
      { title: 'Python for Data Science', contentHtml: '<h2>Python Basics</h2><p>NumPy and Pandas...</p>', order: 1 },
      { title: 'Data Visualization', contentHtml: '<h2>Matplotlib and Seaborn</h2><p>Creating charts...</p>', order: 2 }
    ]
  },
  {
    title: 'Digital Marketing Fundamentals',
    description: 'Master SEO, social media marketing, content marketing, and paid advertising.',
    price: 29.99,
    category: 'Marketing',
    difficulty: 'Beginner',
    thumbnailUrl: 'https://via.placeholder.com/400x225?text=Digital+Marketing',
    lessons: [
      { title: 'Introduction to Digital Marketing', contentHtml: '<h2>Marketing Basics</h2><p>Overview...</p>', order: 1 },
      { title: 'SEO Fundamentals', contentHtml: '<h2>Search Engine Optimization</h2><p>Keywords...</p>', order: 2 }
    ]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    // Clear existing data
    await Course.deleteMany();
    await User.deleteMany();
    await Enrollment.deleteMany();
    console.log('Data cleared');

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@elearning.com',
      passwordHash: 'admin123',
      role: 'admin'
    });

    // Create demo user
    const demoUser = await User.create({
      name: 'Demo User',
      email: 'demo@elearning.com',
      passwordHash: 'demo123',
      role: 'user'
    });

    console.log('Users created');

    // Create courses
    const createdCourses = await Course.insertMany(courses);
    console.log('Courses created');

    // Enroll demo user in first course
    await Enrollment.create({
      userId: demoUser._id,
      courseId: createdCourses[0]._id,
      progress: new Map([
        [createdCourses[0].lessons[0]._id.toString(), true]
      ])
    });

    console.log('Demo enrollment created');
    console.log('\n✅ Database seeded successfully!');
    console.log('\nLogin credentials:');
    console.log('Admin: admin@elearning.com / admin123');
    console.log('User: demo@elearning.com / demo123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
