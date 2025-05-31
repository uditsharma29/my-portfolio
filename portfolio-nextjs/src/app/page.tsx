"use client"; // Mark as a Client Component for framer-motion

import { GitHubRepo } from '@/types';
import ProjectCard from './components/ProjectCard';
import Image from 'next/image';
import { motion } from 'framer-motion'; // Import motion
import { useEffect, useState } from 'react'; // For client-side data fetching if needed or handling state

// getGithubRepos will now be called client-side or passed as props if static/server-rendered
// For simplicity with framer-motion and existing structure, we'll keep data fetching server-side 
// as much as possible. The "use client" directive affects how components are rendered.
// The actual getGithubRepos function is defined outside the component and can still be async server-side.
// We'll assume repos are passed as props or fetched in a useEffect if making it fully client-side fetching.

// To keep existing data fetching, we create a wrapper or adjust where getGithubRepos is called.
// For this animation setup, we will fetch data client-side to integrate with "use client".
// This is a change from the previous server-side fetching approach for the Home component.

// const GITHUB_USERNAME = 'uditsharma29'; // No longer needed directly here for fetching

export default function Home() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRepos() {
      setIsLoading(true);
      try {
        // Fetch from the new API route
        const response = await fetch('/api/pinned-repos'); 
        if (!response.ok) {
          console.error("Failed to fetch pinned repos from API route:", response.status);
          setRepos([]);
        } else {
          const data = await response.json();
          setRepos(data); // The data should already be in GitHubRepo[] format
        }
      } catch (error) {
        console.error("Error fetching pinned repos client-side:", error);
        setRepos([]);
      }
      setIsLoading(false);
    }
    loadRepos();
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger animation for each card
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-8">
      <motion.header 
        className="w-full max-w-4xl py-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold">Udit Sharma's Portfolio</h1>
        <p className="text-lg sm:text-xl text-gray-400 mt-2">Showcasing my GitHub Projects</p>
      </motion.header>

      <motion.section 
        className="w-full max-w-4xl py-8 px-4"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible" // Animate when section comes into view
        viewport={{ once: true, amount: 0.3 }} // Trigger animation once, when 30% is visible
      >
        <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center text-blue-400">About Me</h2>
        <div className="md:flex md:gap-8 items-start">
          <motion.div 
            className="mb-6 md:mb-0 md:w-1/3 flex-shrink-0 mx-auto md:mx-0 max-w-xs"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <Image 
              src="/IMG_2770.jpg" 
              alt="Udit Sharma" 
              width={300} 
              height={300} 
              className="rounded-full shadow-lg mx-auto object-cover aspect-square"
              priority 
            />
          </motion.div>
          <motion.div 
            className="md:w-2/3 text-gray-300 leading-relaxed space-y-4 text-left"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p>
              Hello! I'm Udit Sharma, a Machine Learning Engineer with a Master's in Computer Engineering. I'm fundamentally driven by a passion for engineering and the creative process of building new things, especially at the intersection of data and artificial intelligence. My core interest lies in exploring cutting-edge AI/ML concepts—from deep learning and transformers to the potential of generative AI and agentic systems—and translating these powerful technologies into practical, impactful solutions that can solve real-world challenges and enhance how we interact with the digital world.
            </p>
          </motion.div>
        </div>
        <motion.div 
            className="flex justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href="https://www.linkedin.com/in/uditsharma29/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-medium">
            LinkedIn Profile
          </a>
          <a href="https://docs.google.com/document/d/1OJ4nPqH8Qi0U-PuAMXwcjs7KPp-F3SnE_0KxoUH1YQ8/edit?tab=t.0" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-medium">
            View My Resume
          </a>
        </motion.div>
      </motion.section>

      <motion.main 
        className="w-full max-w-4xl flex-grow py-8" 
        id="projects-container"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center sm:text-left">My Projects</h2>
        {isLoading ? (
          <p className="text-gray-500 text-center">Loading projects...</p>
        ) : repos && repos.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {repos.map((repo) => (
              <ProjectCard key={repo.id} repo={repo} />
            ))}
          </motion.div>
        ) : (
          <p className="text-gray-500 text-center">No projects found or failed to load projects.</p>
        )}
      </motion.main>

      <motion.footer 
        className="w-full max-w-4xl py-8 text-center text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }} // Delay footer animation slightly
      >
        <p>&copy; {new Date().getFullYear()} Udit Sharma. Powered by Next.js & GitHub API.</p>
      </motion.footer>
    </div>
  );
}
