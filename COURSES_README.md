# Course Pages System

This document explains how the course pages work in your portfolio.

## Overview

The course system includes:
- A courses listing page (`/courses`)
- Individual course pages with tabs (`/courses/[slug]`)
- A sign-up form for course enrollment
- Data storage for form submissions

## File Structure

```
├── app/
│   ├── courses/
│   │   ├── page.tsx              # Courses listing page
│   │   └── [slug]/
│   │       └── page.tsx          # Individual course page
│   └── api/
│       └── course-signup/
│           └── route.ts          # API endpoint for form submissions
├── components/
│   ├── Tabs.tsx                  # Reusable tabs component
│   └── CourseSignupForm.tsx      # Course sign-up form
├── lib/
│   └── courses.ts                # Course data and types
└── data/
    └── course-signups.json       # Form submissions (auto-created)
```

## Managing Courses

### Adding a New Course

Edit `lib/courses.ts` and add a new course object to the `courses` array:

```typescript
{
  id: '2',
  slug: 'your-course-slug',
  title: 'Your Course Title',
  subtitle: 'Course Subtitle',
  description: 'Course description...',
  thumbnail: '/courses/thumbnail.jpg',
  status: 'enrolling', // or 'upcoming', 'in-progress', 'completed'
  startDate: 'April 2026',
  duration: '8 weeks',
  about: {
    whatIsThisProgram: [
      'First paragraph...',
      'Second paragraph...',
    ],
    benefits: [
      'First benefit',
      'Second benefit',
    ],
    courseStructure: [
      'First structure point',
      'Second structure point',
    ]
  }
}
```

### Course Status Options

- `enrolling` - Currently accepting applications (shows "🚀 Now Enrolling")
- `upcoming` - Coming soon (shows "📅 Upcoming")
- `in-progress` - Course in progress (shows "▶️ In Progress")
- `completed` - Course completed (shows "✅ Completed")

## Form Submissions

### Storage

Form submissions are stored in `data/course-signups.json`. This file is:
- Auto-created on first submission
- Git-ignored for privacy
- Stored as JSON for easy access

### Viewing Submissions

You can view submissions by:

1. **Reading the JSON file directly:**
   ```bash
   cat data/course-signups.json
   ```

2. **Using the API endpoint:**
   ```bash
   # Get all submissions
   curl http://localhost:3000/api/course-signup
   
   # Get submissions for a specific course
   curl http://localhost:3000/api/course-signup?courseId=1
   ```

### Submission Data Structure

Each submission includes:
```json
{
  "id": "1708276800000",
  "courseId": "1",
  "courseTitle": "Engineering the Web: Systems-Level Development",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 000-0000",
  "background": "Computer Science graduate...",
  "motivation": "I want to learn...",
  "experience": "2 years of JavaScript...",
  "timestamp": "2026-02-18T12:00:00.000Z"
}
```

## Future Enhancements

Consider these improvements for production:

1. **Database Integration**: Replace JSON storage with a proper database (PostgreSQL, MongoDB, etc.)
2. **Email Notifications**: Send confirmation emails to applicants
3. **Admin Dashboard**: Build an interface to manage submissions
4. **Email Service**: Notify you when new applications arrive
5. **Form Validation**: Add more robust server-side validation
6. **Rate Limiting**: Prevent spam submissions
7. **Payment Integration**: Add payment processing for paid courses
8. **Waitlist System**: Handle course capacity limits

## Navigation

The "Courses" link has been added to the main navigation in `components/Header.tsx`. It will appear in both desktop and mobile menus.

## Customization

### Updating the Course Page Layout

The course page has two tabs managed by the `Tabs` component:

1. **About the Course**: Shows course details, benefits, structure, and instructor info
2. **Sign Up**: Contains the application form

To modify the instructor section, edit the "About the Instructor" section in `app/courses/[slug]/page.tsx`.

### Styling

The pages use Tailwind CSS and follow your existing design system with:
- Dark mode support
- Responsive design
- Framer Motion animations
- Consistent spacing and typography

## Development

```bash
# Start development server
npm run dev

# The courses will be available at:
# http://localhost:3000/courses
# http://localhost:3000/courses/engineering-the-web
```

## Notes

- The system uses Next.js App Router with server and client components
- Static generation is used for course pages for optimal performance
- Form submissions are client-side with server-side validation
- All TypeScript types are defined in `lib/courses.ts`
