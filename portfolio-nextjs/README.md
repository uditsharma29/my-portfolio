# My Personal Portfolio

**Live Site:** [To be added after deployment]

## Description

This is my personal portfolio website, built to showcase my projects, skills, and experience as a Machine Learning Engineer. It dynamically fetches project information from my GitHub profile.

## Technologies Used

*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Animations:** Framer Motion
*   **Data Fetching:** GitHub GraphQL API (for pinned repositories and project details)
*   **Deployment:** Vercel (or planned deployment platform)

## Features

*   Dynamic fetching of pinned GitHub repositories for the main project showcase.
*   Individual detail pages for each project.
*   "About Me" section with personal introduction and links to LinkedIn/Resume.
*   Responsive design for various screen sizes.
*   Subtle animations for an enhanced user experience.
*   SEO-friendly metadata for better search engine visibility.

## Setup and Running Locally

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd portfolio-nextjs
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add your GitHub Personal Access Token:
    ```env
    GITHUB_TOKEN=your_github_personal_access_token_here
    ```
    *Note: The token needs `public_repo` scope (or `repo` if you intend to show private pinned repos) to fetch pinned repositories via the GitHub GraphQL API.*

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    # yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project is set up for easy deployment on Vercel. Ensure your `GITHUB_TOKEN` is added as an environment variable in your Vercel project settings.

---

*This README was initially generated with assistance from an AI pair programmer.*
