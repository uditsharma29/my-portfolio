'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface SubProject {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  description: string[];
  technologies: string[];
}

interface TimelineItem {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies: string[];
  type: 'work' | 'education' | 'project';
  logo?: string;
  subProjects?: SubProject[];
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'work':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
          </svg>
        );
      case 'education':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'work':
        return 'from-blue-600 to-blue-700';
      case 'education':
        return 'from-purple-600 to-purple-700';
      default:
        return 'from-green-600 to-green-700';
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4">
          Professional Journey
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          A timeline of my career progression, education, and key achievements in machine learning and AI
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative"
      >
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-cyan-400"></div>

        {/* Timeline Items */}
        <div className="space-y-8">
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="relative flex items-start"
            >
              {/* Timeline Node */}
              <div className={`relative z-10 flex items-center justify-center w-16 h-16 bg-gradient-to-r ${getTypeColor(item.type)} rounded-full text-white shadow-lg flex-shrink-0`}>
                {getTypeIcon(item.type)}
              </div>

              {/* Content Card */}
              <motion.div
                className="ml-6 flex-1 bg-gradient-to-br from-gray-800/60 to-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-300">
                      <span className="font-medium text-blue-400">{item.company}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="text-sm">{item.location}</span>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0 sm:text-right">
                    <span className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 text-sm rounded-full">
                      {item.duration}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <ul className="space-y-2 text-gray-300">
                    {item.description.map((desc, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-blue-400 mr-2 mt-1.5 text-xs">▸</span>
                        <span className="text-sm leading-relaxed">{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                {item.technologies.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Technologies & Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project Teaser for items with subProjects */}
                {item.subProjects && item.subProjects.length > 0 && (
                  <div className="mt-4 p-3 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-600/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-blue-400 mb-1">🚀 Key Projects Showcase</h4>
                        <p className="text-xs text-gray-300">
                          {item.subProjects.length} detailed project{item.subProjects.length > 1 ? 's' : ''} with technical deep-dives, metrics & impact
                        </p>
                        <div className="flex gap-2 mt-2">
                          {item.subProjects.map((project, i) => (
                            <span key={i} className="text-xs text-cyan-400 bg-cyan-600/20 px-2 py-1 rounded">
                              {project.title}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-blue-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {/* Expand/Collapse Button */}
                <motion.button
                  onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
                  className="mt-4 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-blue-600/30 hover:border-blue-500/50 rounded-lg text-blue-400 hover:text-blue-300 text-sm font-medium transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.subProjects && item.subProjects.length > 0 ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                      {activeItem === item.id ? 'Hide Project Details' : `View ${item.subProjects.length} Key Projects`}
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {activeItem === item.id ? 'Show Less' : 'Learn More'}
                    </>
                  )}
                </motion.button>

                {/* Expanded Content */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: activeItem === item.id ? 'auto' : 0,
                    opacity: activeItem === item.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {activeItem === item.id && (
                    <div className="mt-4 pt-4 border-t border-gray-600/30">
                      {item.subProjects && item.subProjects.length > 0 ? (
                        <div className="space-y-6">
                          <h4 className="text-lg font-semibold text-blue-400 mb-4">Key Projects:</h4>
                          {item.subProjects.map((subProject) => (
                            <div key={subProject.id} className="bg-gray-700/30 rounded-xl p-5 border border-gray-600/20">
                              <div className="mb-3">
                                <h5 className="text-lg font-semibold text-white mb-1">{subProject.title}</h5>
                                <p className="text-blue-400 font-medium text-sm mb-1">{subProject.subtitle}</p>
                                <p className="text-gray-400 text-xs">{subProject.duration}</p>
                              </div>
                              
                              <div className="mb-4">
                                <ul className="space-y-2 text-gray-300">
                                  {subProject.description.map((desc, i) => (
                                    <li key={i} className="flex items-start">
                                      <span className="text-cyan-400 mr-2 mt-1.5 text-xs">▸</span>
                                      <span className="text-sm leading-relaxed">{desc}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h6 className="text-sm font-medium text-gray-400 mb-2">Technologies & Skills:</h6>
                                <div className="flex flex-wrap gap-2">
                                  {subProject.technologies.map((tech, i) => (
                                    <span
                                      key={i}
                                      className="px-2 py-1 bg-cyan-600/20 text-cyan-300 text-xs rounded-full border border-cyan-600/30"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-300 text-sm leading-relaxed">
                          Additional details about achievements, key projects, and impact would go here.
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
} 