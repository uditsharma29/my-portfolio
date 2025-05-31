import { GitHubRepo } from '@/types'; // Assuming types.ts is in src and alias '@/' is set up for src
import Link from 'next/link'; // Import Link from Next.js
import { motion } from 'framer-motion'; // Import motion

interface ProjectCardProps {
  repo: GitHubRepo;
}

export default function ProjectCard({ repo }: ProjectCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div 
      key={repo.id} 
      className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-between h-full hover:shadow-blue-500/30 transition-shadow duration-300"
      variants={cardVariants}
      // We can rely on the parent (cardContainerVariants) to trigger visibility,
      // or add individual whileInView to each card if preferred for more granular control.
      // For now, parent stagger should handle it.
    >
      <div>
        <h3 className="text-xl font-semibold mb-2 text-blue-400 truncate hover:text-blue-300">
          <Link href={`/projects/${encodeURIComponent(repo.name)}`}>
            {repo.name}
          </Link>
        </h3>
        <p className="text-gray-400 mb-4 text-sm h-24 overflow-y-auto custom-scrollbar">
          {repo.description || 'No description available.'}
        </p>
        {repo.topics && repo.topics.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-500 mb-1">Topics:</h4>
            <div className="flex flex-wrap gap-2">
              {repo.topics.map((topic) => (
                <span key={topic} className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="mt-auto pt-4 border-t border-gray-700">
        <div className="flex justify-between items-center">
          {repo.language && (
            <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">{repo.language}</span>
          )}
          <span className="text-xs text-gray-400">Stars: {repo.stargazers_count}</span>
        </div>
      </div>
    </motion.div>
  );
} 