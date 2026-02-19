# Database Setup Guide

Your Next.js app is now configured to use **PostgreSQL with Prisma ORM**!

## 🔧 Setup Steps

### 1. Configure Your Database Connection

Create a `.env.local` file in the root of your project (if you don't have one already):

```bash
# .env.local
DATABASE_URL="postgresql://username:password@host:port/database?schema=public"
```

**Replace with your actual PostgreSQL connection details:**
- `username` - Your database username
- `password` - Your database password
- `host` - Your database host (e.g., localhost, or a remote server)
- `port` - PostgreSQL port (usually 5432)
- `database` - Your database name
- `schema` - Database schema (usually "public")

**Example:**
```
DATABASE_URL="postgresql://sakib:mypassword@localhost:5432/portfolio?schema=public"
```

### 2. Generate Prisma Client

After setting up your DATABASE_URL, run:

```bash
npx prisma generate
```

This will generate the Prisma Client based on your schema.

### 3. Create the Database Table

Run the migration to create the `course_signups` table in your database:

```bash
npx prisma db push
```

Or if you want to create a migration file:

```bash
npx prisma migrate dev --name init
```

### 4. Verify Everything Works

Start your development server:

```bash
npm run dev
```

Then test the form submission on your course page!

## 📊 Database Schema

The `CourseSignup` model includes:

```prisma
model CourseSignup {
  id          String   @id @default(cuid())
  courseId    String
  courseTitle String
  name        String
  email       String
  phone       String?
  background  String
  motivation  String
  experience  String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🔍 Viewing Submissions

### Option 1: Prisma Studio (GUI)

Open Prisma Studio to view/manage your data:

```bash
npx prisma studio
```

This opens a GUI at `http://localhost:5555` where you can see all submissions.

### Option 2: API Endpoint

Make a GET request to view submissions:

```bash
# Get all submissions
curl http://localhost:3000/api/course-signup

# Get submissions for a specific course
curl http://localhost:3000/api/course-signup?courseId=1
```

## 🚀 Production Deployment

### Environment Variables

Make sure to add `DATABASE_URL` to your production environment variables:

- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Environment Variables
- **Railway/Render**: Add in their dashboard

### Generate Prisma Client in Production

Add this to your `package.json` build script if not already there:

```json
{
  "scripts": {
    "build": "prisma generate && next build"
  }
}
```

## 📝 Common Commands

```bash
# Generate Prisma Client
npx prisma generate

# Push schema changes to database
npx prisma db push

# Create a migration
npx prisma migrate dev --name your-migration-name

# Open Prisma Studio
npx prisma studio

# Format schema file
npx prisma format

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

## 🔐 Security Notes

1. **Never commit** `.env.local` or `.env` files to Git
2. Use **different databases** for development and production
3. Use **connection pooling** for production (Prisma Accelerate or PgBouncer)
4. Consider adding **rate limiting** to your API routes

## ❓ Troubleshooting

### "Can't reach database server"
- Check if PostgreSQL is running
- Verify your DATABASE_URL is correct
- Check firewall settings

### "Table doesn't exist"
- Run `npx prisma db push` to create tables

### Prisma Client not found
- Run `npx prisma generate`

### Connection pool timeout
- Use Prisma connection pooling or PgBouncer for production

## 📚 Learn More

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Next.js with Prisma](https://www.prisma.io/nextjs)
