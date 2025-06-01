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
      className="group relative bg-gradient-to-br from-gray-800/60 to-gray-900/40 backdrop-blur-xl border border-gray-700/50 p-6 rounded-2xl shadow-xl flex flex-col justify-between h-full overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-400/50"
      variants={cardVariants}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      {/* Gradient overlay that appears on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      
      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />
      
      <div className="relative z-10">
        {/* Project Title */}
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 truncate group-hover:from-blue-300 group-hover:to-cyan-300 transition-all duration-300">
            <Link href={`/projects/${encodeURIComponent(repo.name)}`} className="hover:text-shadow-lg">
              {repo.name}
            </Link>
          </h3>
          
          {/* Language and Stars Row */}
          <div className="flex justify-between items-center mb-3">
            {repo.language && (
              <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 rounded-full text-indigo-300 backdrop-blur-sm">
                {repo.language}
              </span>
            )}
            <div className="flex items-center space-x-1 text-yellow-400">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="text-xs font-medium text-gray-300">{repo.stargazers_count}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-gray-300 text-sm leading-relaxed h-20 overflow-y-auto custom-scrollbar group-hover:text-gray-200 transition-colors duration-300">
            {repo.description || 'No description available.'}
          </p>
        </div>

        {/* Topics/Tags */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {repo.topics.slice(0, 4).map((topic) => (
                <span 
                  key={topic} 
                  className="px-2 py-1 text-xs font-medium bg-gray-700/50 border border-gray-600/50 rounded-md text-gray-300 backdrop-blur-sm hover:bg-gray-600/50 hover:border-gray-500/50 transition-all duration-200"
                >
                  {topic}
                </span>
              ))}
              {repo.topics.length > 4 && (
                <span className="px-2 py-1 text-xs font-medium text-gray-400 border border-gray-600/30 rounded-md bg-gray-800/30">
                  +{repo.topics.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Section with enhanced styling */}
      <div className="relative z-10 mt-auto pt-4 border-t border-gray-600/30 group-hover:border-gray-500/50 transition-colors duration-300">
        <div className="flex items-center justify-between">
          <Link 
            href={`/projects/${encodeURIComponent(repo.name)}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-400/30 hover:border-blue-300/50 rounded-lg transition-all duration-200 backdrop-blur-sm group/button"
          >
            View Details
            <svg className="w-4 h-4 ml-2 group-hover/button:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          
          {/* Decorative element */}
          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Subtle floating animation elements */}
      <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-cyan-400/10 to-indigo-400/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100" />
    </motion.div>
  );
} 