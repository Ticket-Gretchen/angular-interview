# Angular Interview Challenge

This repository contains a take-home coding challenge for Senior Angular Developer candidates.

## For Candidates

👉 **Start here: [CHALLENGE.md](./CHALLENGE.md)**

This document contains all the information you need to complete the challenge, including:

- Product requirements
- Technical specifications
- Acceptance criteria
- Submission instructions

## For Interviewers

📋 **Review these documents:**

- [EVALUATION_RUBRIC.md](./EVALUATION_RUBRIC.md) - Detailed scoring rubric
- [INTERVIEWER_GUIDE.md](./INTERVIEWER_GUIDE.md) - Setup and evaluation guide
- [SAMPLE_DATA.md](./SAMPLE_DATA.md) - Sample data for reference

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build
```

The application will be available at `http://localhost:4200/`

## Project Structure

This is an Nx workspace with Angular 21:

```
apps/
  interview/          # Main Angular application
    src/
      app/            # Application code
libs/                 # Shared libraries (if needed)
```

## Technology Stack

- **Angular**: 21.0.4
- **TypeScript**: 5.9.x
- **Nx**: 22.2.0
- **RxJS**: 7.8.x
- **Testing**: Vitest (unit) + Playwright (e2e)

## Notes

- This is a standalone Angular application (no NgModules)
- TypeScript strict mode is enabled

---

Good luck! 🚀
