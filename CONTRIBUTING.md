# Contributing to E-Learning Platform

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Assume good intentions

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, Node version, etc.)

### Suggesting Features

1. Check if the feature has been suggested
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the existing code style
   - Write clear commit messages
   - Add tests if applicable
   - Update documentation

4. **Test your changes**
   ```bash
   # Backend tests
   cd backend && npm test
   
   # Frontend tests
   cd frontend && npm test
   ```

5. **Commit your changes**
   ```bash
   git commit -m "Add: amazing feature description"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Create a Pull Request**
   - Clear title and description
   - Reference any related issues
   - Include screenshots for UI changes

## Development Guidelines

### Code Style

**JavaScript/React:**
- Use ES6+ features
- Use functional components with hooks
- Follow Airbnb JavaScript Style Guide
- Use meaningful variable names
- Add comments for complex logic

**CSS/Tailwind:**
- Use Tailwind utility classes
- Keep custom CSS minimal
- Follow mobile-first approach
- Ensure responsive design

### Git Commit Messages

Format: `Type: Brief description`

**Types:**
- `Add:` New feature
- `Fix:` Bug fix
- `Update:` Changes to existing feature
- `Refactor:` Code restructuring
- `Docs:` Documentation changes
- `Test:` Adding or updating tests
- `Style:` Code formatting

**Examples:**
```
Add: User profile page
Fix: Login authentication error
Update: Course card styling
Refactor: API service structure
Docs: Update installation guide
```

### Project Structure

**Backend:**
```
backend/
├── controllers/    # Route logic
├── models/        # Database schemas
├── routes/        # API endpoints
├── middleware/    # Auth, validation, etc.
└── utils/         # Helper functions
```

**Frontend:**
```
frontend/src/
├── components/    # Reusable components
├── pages/        # Page components
├── context/      # React Context
├── services/     # API calls
└── utils/        # Helper functions
```

### Testing

- Write tests for new features
- Ensure existing tests pass
- Aim for meaningful test coverage
- Test both success and error cases

### Documentation

- Update README.md for major changes
- Add JSDoc comments for functions
- Update API documentation
- Include examples where helpful

## Areas for Contribution

### Good First Issues
- UI improvements
- Adding form validation
- Writing tests
- Fixing typos in documentation
- Adding error messages

### Feature Ideas
- Password reset functionality
- Email notifications
- Course reviews and ratings
- Video upload integration
- Advanced search filters
- User profile customization
- Discussion forums
- Quiz system
- Certificate generation

### Performance
- Database query optimization
- Image lazy loading
- Code splitting
- Caching strategies

### Security
- Input sanitization
- Rate limiting
- CSRF protection
- Security headers

## Questions?

- Open an issue for questions
- Check existing issues and PRs
- Read the documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing! 🙏
