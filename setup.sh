#!/bin/bash

# E-Learning Platform - Installation Script Helper

echo "========================================"
echo "E-Learning Platform - Setup Script"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Check Node.js
echo -e "${YELLOW}Checking prerequisites...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓ Node.js is installed: $NODE_VERSION${NC}"
else
    echo -e "${RED}✗ Node.js is not installed. Please install Node.js v16 or higher from https://nodejs.org${NC}"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓ npm is installed: $NPM_VERSION${NC}"
else
    echo -e "${RED}✗ npm is not installed.${NC}"
    exit 1
fi

echo ""
echo -e "${CYAN}========================================${NC}"
echo -e "${CYAN}Backend Setup${NC}"
echo -e "${CYAN}========================================${NC}"

# Backend installation
echo ""
echo -e "${YELLOW}Installing backend dependencies...${NC}"
cd backend
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend dependencies installed successfully${NC}"
else
    echo -e "${RED}✗ Backend installation failed${NC}"
    exit 1
fi

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo ""
    echo -e "${YELLOW}Creating backend .env file...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓ Created .env file from .env.example${NC}"
    echo -e "${YELLOW}⚠ IMPORTANT: Edit backend/.env and add your MongoDB URI and JWT secret!${NC}"
fi

cd ..

echo ""
echo -e "${CYAN}========================================${NC}"
echo -e "${CYAN}Frontend Setup${NC}"
echo -e "${CYAN}========================================${NC}"

# Frontend installation
echo ""
echo -e "${YELLOW}Installing frontend dependencies...${NC}"
cd frontend
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend dependencies installed successfully${NC}"
else
    echo -e "${RED}✗ Frontend installation failed${NC}"
    exit 1
fi

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo ""
    echo -e "${YELLOW}Creating frontend .env file...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓ Created .env file from .env.example${NC}"
fi

cd ..

echo ""
echo -e "${CYAN}========================================${NC}"
echo -e "${GREEN}Setup Complete!${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Edit backend/.env with your MongoDB URI and JWT secret"
echo "2. Run 'node backend/seed.js' to seed the database (optional)"
echo "3. Start backend: 'cd backend && npm run dev'"
echo "4. Start frontend (new terminal): 'cd frontend && npm run dev'"
echo ""
echo -e "${CYAN}For detailed instructions, see QUICKSTART.md${NC}"
echo ""
echo -e "${YELLOW}Demo credentials after seeding:${NC}"
echo "  User:  demo@elearning.com / demo123"
echo "  Admin: admin@elearning.com / admin123"
echo ""
