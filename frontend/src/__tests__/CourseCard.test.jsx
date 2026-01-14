import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CourseCard from '../components/CourseCard';

describe('CourseCard', () => {
  const mockCourse = {
    _id: '1',
    title: 'Test Course',
    slug: 'test-course',
    description: 'This is a test course',
    price: 49.99,
    category: 'Programming',
    difficulty: 'Beginner',
    thumbnailUrl: 'https://via.placeholder.com/400x225',
    lessons: [{ _id: '1' }, { _id: '2' }, { _id: '3' }]
  };

  it('renders course title', () => {
    render(
      <BrowserRouter>
        <CourseCard course={mockCourse} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Test Course')).toBeInTheDocument();
  });

  it('displays course price', () => {
    render(
      <BrowserRouter>
        <CourseCard course={mockCourse} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('$49.99')).toBeInTheDocument();
  });

  it('shows number of lessons', () => {
    render(
      <BrowserRouter>
        <CourseCard course={mockCourse} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('3 lessons')).toBeInTheDocument();
  });

  it('displays difficulty badge', () => {
    render(
      <BrowserRouter>
        <CourseCard course={mockCourse} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Beginner')).toBeInTheDocument();
  });
});
