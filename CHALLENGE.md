# Senior Angular Developer - Take-Home Challenge

## Overview

This challenge is designed to assess your skills in building a production-ready Angular application. You'll be implementing a **Task Management Dashboard** that demonstrates your understanding of modern Angular patterns, state management, testing, and user experience design.

**Time Allocation:** This challenge is designed to take approximately 4 hours. However, we understand that you may not complete everything. Focus on demonstrating your best work rather than rushing through all features. Quality over quantity.

---

## Product Scenario

You're building a Task Management Dashboard for a team collaboration tool. The application should allow users to:

- View a list of tasks with filtering and sorting capabilities
- Create, edit, and delete tasks
- Mark tasks as complete/incomplete
- View task details
- Search tasks by title or description
- Organize tasks by categories/tags

---

## Technical Requirements

### Core Features (Must Implement)

1. **Task List View**

   - Display tasks in a responsive grid or list layout
   - Show task title, description, status (complete/incomplete), priority, and due date
   - Implement pagination or virtual scrolling for performance (if >20 tasks)
   - Loading states and error handling

2. **Task Management**

   - Create new tasks with a form (title, description, priority, due date, category)
   - Edit existing tasks
   - Delete tasks with confirmation
   - Toggle task completion status

3. **Filtering & Search**

   - Filter by status (all/active/completed)
   - Filter by priority (low/medium/high)
   - Search by title or description (real-time search)
   - Combine multiple filters

4. **Routing**

   - `/` - Task list view
   - `/tasks/new` - Create task form
   - `/tasks/:id` - Task detail view
   - `/tasks/:id/edit` - Edit task form
   - Implement route guards where appropriate

5. **State Management**
   - Implement a state management solution (choose one):
     - Signals-based state (preferred for Angular 18+)
     - RxJS with services
     - NgRx (if you're comfortable with it)
   - Handle loading, success, and error states
   - Persist tasks to localStorage (no backend required)

### Data Model

```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date | null;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Stretch Goals (Optional - Implement if time permits)

1. **Advanced Features**

   - Drag-and-drop to reorder tasks
   - Bulk actions (select multiple tasks, mark as complete, delete)
   - Task categories/tags with color coding
   - Due date reminders/notifications
   - Export tasks to JSON/CSV

2. **Performance Optimizations**

   - Implement OnPush change detection strategy
   - Lazy load routes
   - Virtual scrolling for large lists
   - Debounce search input

3. **Accessibility**

   - Full keyboard navigation
   - ARIA labels and roles
   - Screen reader support
   - Focus management

4. **Testing**
   - Unit tests for services and components (aim for >70% coverage)
   - Integration tests for critical user flows
   - E2E tests for main workflows (if you have time)

---

## Technical Constraints

- Use **Angular 18** standalone components (no NgModules)
- Use **TypeScript strict mode** (already configured)
- Follow **Angular style guide** best practices
- Use **RxJS** for async operations
- Implement **reactive forms** for task creation/editing
- Ensure the app is **responsive** (mobile, tablet, desktop)
- Use **SCSS** for styling (you can use a CSS framework if desired, but custom styling is preferred)

---

## Acceptance Criteria

### Functional Requirements

- [ ] Users can view a list of tasks
- [ ] Users can create new tasks with all required fields
- [ ] Users can edit existing tasks
- [ ] Users can delete tasks with confirmation
- [ ] Users can toggle task completion status
- [ ] Users can filter tasks by status and priority
- [ ] Users can search tasks by title/description
- [ ] Tasks persist in localStorage across page refreshes
- [ ] All routes are functional and protected appropriately
- [ ] Loading and error states are handled gracefully

### Code Quality Requirements

- [ ] Code follows Angular style guide and TypeScript best practices
- [ ] Components are properly structured (separation of concerns)
- [ ] Services are used for business logic and data management
- [ ] Reusable components are created where appropriate
- [ ] Type safety is maintained throughout (no `any` types)
- [ ] Code is well-commented where complex logic exists

### Testing Requirements

- [ ] At least 3-5 unit tests for critical components/services
- [ ] Tests demonstrate understanding of Angular testing patterns
- [ ] Tests are meaningful and test actual behavior, not just implementation

### UX/UI Requirements

- [ ] Application is visually appealing and professional
- [ ] Responsive design works on mobile, tablet, and desktop
- [ ] User interactions provide appropriate feedback (loading, success, error)
- [ ] Forms have proper validation and error messages
- [ ] Navigation is intuitive

---

## Deliverables

1. **Source Code**

   - Complete, working Angular application
   - All code should be in the repository
   - Include a README with setup instructions

2. **Documentation**

   - Update the README.md with:
     - How to run the application
     - How to run tests
     - Brief explanation of architectural decisions
     - Any assumptions or trade-offs made

3. **Testing**
   - Unit tests for key components/services
   - Test files should be in the same structure as source files

---

## Getting Started

1. Clone this repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Begin implementing the features

---

## Evaluation Criteria

Your submission will be evaluated on:

1. **Architecture & Code Quality** (30%)

   - Clean, maintainable code structure
   - Proper separation of concerns
   - Effective use of Angular patterns and best practices
   - Type safety and error handling

2. **Functionality** (25%)

   - All core features working correctly
   - Edge cases handled appropriately
   - User experience is smooth and intuitive

3. **State Management** (20%)

   - Effective state management solution
   - Proper handling of async operations
   - Data persistence works correctly

4. **Testing** (15%)

   - Quality and coverage of tests
   - Understanding of testing patterns
   - Tests are meaningful and maintainable

5. **UI/UX & Accessibility** (10%)
   - Professional appearance
   - Responsive design
   - Accessibility considerations

---

## Submission Instructions

1. Complete your implementation
2. Ensure all tests pass: `npm test`
3. Ensure the app builds successfully: `npm run build`
4. Update the README.md with your documentation
5. Commit all changes with clear, descriptive commit messages
6. Push to your repository or create a zip file of the project

**Note:** Please do not spend more than 4-5 hours on this challenge. We value quality over completeness. If you need to make trade-offs, document them in your README.

---

## Questions?

If you have any questions about the requirements, please reach out. We're here to help!

Good luck! 🚀
