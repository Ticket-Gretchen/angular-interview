# Sample Data Structure

This document provides sample data that candidates can use to seed their application for testing and development purposes.

---

## Task Data Model

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

---

## Sample Tasks (JSON)

You can use this sample data to seed your localStorage or for initial development:

```json
[
  {
    "id": "1",
    "title": "Complete project proposal",
    "description": "Finish writing the project proposal document and submit it to the client by end of week.",
    "status": "pending",
    "priority": "high",
    "dueDate": "2024-12-20T00:00:00.000Z",
    "category": "Work",
    "createdAt": "2024-12-15T10:00:00.000Z",
    "updatedAt": "2024-12-15T10:00:00.000Z"
  },
  {
    "id": "2",
    "title": "Review team code submissions",
    "description": "Go through the pull requests from the development team and provide feedback.",
    "status": "pending",
    "priority": "medium",
    "dueDate": "2024-12-18T00:00:00.000Z",
    "category": "Work",
    "createdAt": "2024-12-14T09:30:00.000Z",
    "updatedAt": "2024-12-14T09:30:00.000Z"
  },
  {
    "id": "3",
    "title": "Update documentation",
    "description": "Update the API documentation with the latest endpoint changes.",
    "status": "completed",
    "priority": "low",
    "dueDate": "2024-12-16T00:00:00.000Z",
    "category": "Work",
    "createdAt": "2024-12-13T14:20:00.000Z",
    "updatedAt": "2024-12-16T11:00:00.000Z"
  },
  {
    "id": "4",
    "title": "Plan team meeting agenda",
    "description": "Prepare the agenda for next week's team meeting and send it out.",
    "status": "pending",
    "priority": "medium",
    "dueDate": "2024-12-19T00:00:00.000Z",
    "category": "Planning",
    "createdAt": "2024-12-15T08:15:00.000Z",
    "updatedAt": "2024-12-15T08:15:00.000Z"
  },
  {
    "id": "5",
    "title": "Fix critical bug in payment module",
    "description": "Investigate and fix the payment processing bug reported by QA team.",
    "status": "pending",
    "priority": "high",
    "dueDate": "2024-12-17T00:00:00.000Z",
    "category": "Development",
    "createdAt": "2024-12-15T11:45:00.000Z",
    "updatedAt": "2024-12-15T11:45:00.000Z"
  },
  {
    "id": "6",
    "title": "Write unit tests for user service",
    "description": "Add comprehensive unit tests for the user service to improve code coverage.",
    "status": "pending",
    "priority": "medium",
    "dueDate": null,
    "category": "Development",
    "createdAt": "2024-12-14T16:30:00.000Z",
    "updatedAt": "2024-12-14T16:30:00.000Z"
  },
  {
    "id": "7",
    "title": "Schedule performance review",
    "description": "Coordinate with HR to schedule annual performance reviews for the team.",
    "status": "completed",
    "priority": "low",
    "dueDate": "2024-12-15T00:00:00.000Z",
    "category": "HR",
    "createdAt": "2024-12-10T09:00:00.000Z",
    "updatedAt": "2024-12-15T10:30:00.000Z"
  },
  {
    "id": "8",
    "title": "Research new Angular features",
    "description": "Look into the latest Angular features and evaluate if we should adopt them.",
    "status": "pending",
    "priority": "low",
    "dueDate": null,
    "category": "Research",
    "createdAt": "2024-12-13T13:15:00.000Z",
    "updatedAt": "2024-12-13T13:15:00.000Z"
  }
]
```

---

## Sample Categories

Suggested categories for tasks:

- Work
- Personal
- Development
- Planning
- Research
- HR
- Marketing
- Sales
- Support

---

## Usage Notes

Candidates can:

1. **Use this data for initial development** - Helps them get started quickly
2. **Seed localStorage** - Populate the app with sample data for testing
3. **Reference for structure** - Understand the expected data format
4. **Test edge cases** - Modify the data to test various scenarios:
   - Tasks with no due date
   - Completed vs pending tasks
   - Different priorities
   - Various categories

---

## Edge Cases to Test

Consider testing with:

- **Empty state**: No tasks
- **Single task**: Only one task
- **Many tasks**: 20+ tasks (for pagination/virtual scrolling)
- **Tasks with no due date**: `dueDate: null`
- **Overdue tasks**: `dueDate` in the past
- **Long titles/descriptions**: Test text truncation
- **Special characters**: Test with emojis, special chars in titles
- **Very long lists**: 100+ tasks for performance testing

---

## Data Validation Rules

When implementing, ensure:

- `id` is unique and non-empty
- `title` is required and non-empty
- `status` is either 'pending' or 'completed'
- `priority` is either 'low', 'medium', or 'high'
- `dueDate` is either a valid Date or null
- `category` is a non-empty string
- `createdAt` and `updatedAt` are valid Date objects

---

This sample data is provided as a convenience. Candidates are free to use it, modify it, or create their own data structure as long as it meets the requirements in the challenge.
