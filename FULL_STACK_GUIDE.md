# How to Build & Deploy Full-Stack Apps (Next.js + Prisma + Vercel)

This guide covers the exact steps we used to build `topik_ez`. Use this checklist for future projects.

## 1. Initial Setup
Start a new project with Next.js (the web framework) and Shadcn/Tailwind (for styling).

```bash
# Create the app
npx create-next-app@latest my-app-name
cd my-app-name

# Install database tools
npm install prisma @prisma/client
npx prisma init
```

## 2. Database Configuration (The "Backend")
We use **Prisma** to talk to the database and **Neon/Vercel Postgres** to host it.

1.  **Edit `prisma/schema.prisma`**:
    Change `datasource db` provider to `"postgresql"`.
    Define your data models (e.g., User, Post, etc.).

2.  **Create the Online Database**:
    *   Go to **Vercel Dashboard** -> Storage -> Create Database (Postgres).
    *   Copy the `DATABASE_URL` (and other env vars).

3.  **Connect Locally**:
    *   Create a `.env` file in your project root.
    *   Paste the `DATABASE_URL="postgres://..."`.
    *   **IMPORTANT**: Add `.env` to your `.gitignore` file so you don't leak secrets!

4.  **Push Schema to DB**:
    Run this command whenever you change your `schema.prisma` file.
    ```bash
    npx prisma db push
    ```

## 3. Development Workflow
*   **Accessing Data**: Use `prisma.user.findMany()`, `prisma.user.create()`, etc., in your Server Actions or API routes.
*   **Testing**: Run `npm run dev` to see your app at `localhost:3000`.

## 4. Deployment (Making it Live)

1.  **Prepare for Vercel**:
    *   Add `"postinstall": "prisma generate"` to the `"scripts"` section of `package.json`. This fixes the "Prisma Client not found" error on deployment.

2.  **Push to GitHub**:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/yourname/repo.git
    git push -u origin main
    ```

3.  **Connect Vercel**:
    *   Import the repo on Vercel.
    *   **Crucial**: In the Vercel Project Settings -> Environment Variables, ensure `DATABASE_URL` is set (Vercel usually does this automatically if you created the DB there, but always double-check).

## 5. Cheat Sheet Commands

*   **Update Database after changing Schema**: `npx prisma db push`
*   **View Database Data (GUI)**: `npx prisma studio`
*   **Deploy Updates**: `git add .` -> `git commit -m "msg"` -> `git push`
