'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function ResumePage() {
  const [isLoading, setIsLoading] = useState(true);

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <motion.div
        className="container mx-auto px-4 py-8"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header with Navigation */}
        <motion.header variants={itemVariants} className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <Link 
                href="/"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 mb-4"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Portfolio
              </Link>
              <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Resume
              </h1>
              <p className="text-gray-300 mt-2">Udit Sharma - Machine Learning Engineer</p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.a
                href="/UditSharmaResume2025_v9.pdf"
                download="Udit_Sharma_Resume.pdf"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </motion.a>
              
              <motion.a
                href="/UditSharmaResume2025_v9.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border-2 border-gray-600 hover:border-blue-400 rounded-lg text-gray-300 hover:text-white font-medium transition-all duration-200 backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Open in New Tab
              </motion.a>
            </div>
          </div>
        </motion.header>

        {/* PDF Viewer Container */}
        <motion.div
          variants={itemVariants}
          className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-gray-800/80 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mb-4"></div>
                <p className="text-gray-300">Loading resume...</p>
              </div>
            </div>
          )}

          {/* PDF Embed */}
          <div className="w-full" style={{ height: 'calc(100vh - 200px)', minHeight: '600px' }}>
            <iframe
              src="/UditSharmaResume2025_v9.pdf#toolbar=1&navpanes=0&scrollbar=1&page=1&view=FitH"
              className="w-full h-full border-0 rounded-2xl"
              title="Udit Sharma Resume"
              onLoad={() => setIsLoading(false)}
            />
          </div>

          {/* Mobile-friendly message */}
          <div className="block sm:hidden p-6 bg-gray-700/30 border-t border-gray-600/30">
            <p className="text-sm text-gray-300 text-center">
              Having trouble viewing? 
              <a 
                href="/UditSharmaResume2025_v9.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 ml-1"
              >
                Open in new tab
              </a> or download the PDF directly.
            </p>
          </div>
        </motion.div>

        {/* Additional Information */}
        <motion.div 
          variants={itemVariants}
          className="mt-8 text-center"
        >
          <div className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-blue-400 mb-3">Resume Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
              <div>
                <strong className="text-white">Experience:</strong><br />
                Machine Learning Engineer with production ML systems experience
              </div>
              <div>
                <strong className="text-white">Education:</strong><br />
                Master&apos;s in Computer Engineering
              </div>
              <div>
                <strong className="text-white">Specialization:</strong><br />
                AI/ML, Deep Learning, Generative AI & LLMs
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          variants={itemVariants}
          className="mt-8 text-center"
        >
          <p className="text-gray-400 mb-4">Interested in working together?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.linkedin.com/in/uditsharma29/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Connect on LinkedIn
            </a>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border-2 border-gray-600 hover:border-blue-400 rounded-lg text-gray-300 hover:text-white font-medium transition-all duration-200"
            >
              View My Projects
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 