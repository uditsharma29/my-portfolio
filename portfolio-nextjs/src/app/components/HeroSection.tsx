'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Machine Learning Engineer & AI Innovator';
  const [currentIndex, setCurrentIndex] = useState(0);

  // Typing animation effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100); // Adjust speed here
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const ctaVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 1.5
      }
    }
  };

  return (
    <motion.section 
      className="relative w-full min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
      variants={heroVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(6, 182, 212, 0.1))",
              "linear-gradient(225deg, rgba(147, 51, 234, 0.1), rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))",
              "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(6, 182, 212, 0.1))"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating Geometric Shapes */}
      <motion.div
        className="absolute top-20 left-10 w-4 h-4 bg-blue-400/30 rounded-full blur-sm"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute top-40 right-20 w-6 h-6 bg-purple-400/30 rounded-full blur-sm"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '1s' }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-8 h-8 bg-cyan-400/30 rounded-full blur-sm"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-5 h-5 bg-indigo-400/30 rounded-full blur-sm"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '0.5s' }}
      />

      {/* Particle Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-12 gap-4 h-full w-full p-8">
          {Array.from({ length: 48 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 bg-blue-400/40 rounded-full"
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Main Heading */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
              Udit Sharma
            </span>
          </h1>
          
          {/* Typing Animation */}
          <div className="h-12 sm:h-16 flex items-center justify-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-300 min-h-fit">
              {displayedText}
              <motion.span
                className="inline-block w-0.5 h-6 sm:h-8 bg-blue-400 ml-1"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </h2>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p 
          variants={itemVariants}
          className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          Transforming complex data into intelligent solutions through
          <span className="text-blue-400 font-semibold"> cutting-edge AI</span> and
          <span className="text-purple-400 font-semibold"> machine learning</span> technologies
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          variants={ctaVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <motion.a
            href="#projects-container"
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300 overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects-container')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
          >
            <span className="relative z-10">Explore My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>

          <motion.div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact">
              <motion.div
                className="group px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(34, 197, 94, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  Get In Touch
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
              </motion.div>
            </Link>

            <motion.a
              href="https://www.linkedin.com/in/uditsharma29/"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 border-2 border-gray-600 hover:border-blue-400 rounded-full text-gray-300 hover:text-white font-semibold text-lg transition-all duration-300 backdrop-blur-sm"
              whileHover={{ 
                scale: 1.05,
                borderColor: "#60a5fa"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                Connect with Me
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center text-gray-400 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
            onClick={() => {
              window.scrollTo({ 
                top: window.innerHeight, 
                behavior: 'smooth' 
              });
            }}
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent" />
    </motion.section>
  );
} 