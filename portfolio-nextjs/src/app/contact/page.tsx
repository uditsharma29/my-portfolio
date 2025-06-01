'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject || 'Contact from Portfolio');
    const body = encodeURIComponent(
      `Hi Udit,\n\n${formData.message}\n\nBest regards,\n${formData.name}\n${formData.email}`
    );
    const mailtoLink = `mailto:uditsharma0529@gmail.com?subject=${subject}&body=${body}`;
    
    // Open default email client
    window.location.href = mailtoLink;
    
    // Reset form after a delay
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
      setSubmitStatus('success');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 1000);
  };

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
                Get In Touch
              </h1>
              <p className="text-gray-300 mt-2">Let&apos;s discuss opportunities and ideas</p>
            </div>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-blue-400 mb-4">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-600/20 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-300">Email</p>
                    <a 
                      href="mailto:uditsharma0529@gmail.com" 
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      uditsharma0529@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-blue-600/20 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-300">LinkedIn</p>
                    <a 
                      href="https://www.linkedin.com/in/uditsharma29/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      /in/uditsharma29
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-600/30">
                <h3 className="text-lg font-medium text-white mb-3">Preferred Contact Methods</h3>
                <div className="space-y-2 text-gray-300 text-sm">
                  <p>• Email for detailed discussions and formal inquiries</p>
                  <p>• LinkedIn for quick questions and networking</p>
                  <p>• Response time: Usually within 24-48 hours</p>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="space-y-3">
              <motion.a
                href="mailto:uditsharma0529@gmail.com"
                className="flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Email Directly
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/uditsharma29/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full px-6 py-4 border-2 border-blue-600 hover:border-blue-500 hover:bg-blue-600/10 rounded-lg text-blue-400 hover:text-blue-300 font-medium transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Connect on LinkedIn
              </motion.a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-blue-400 mb-4">Send a Message</h2>
              <p className="text-gray-300 text-sm mb-6">
                Fill out the form below and I&apos;ll get back to you as soon as possible.
              </p>

              {submitStatus === 'success' && (
                <div className="mb-4 p-3 bg-green-600/20 border border-green-600/30 rounded-lg text-green-400 text-sm">
                  Your email client should have opened. If not, please email me directly at uditsharma0529@gmail.com
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                    placeholder="What would you like to discuss?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 resize-vertical"
                    placeholder="Tell me about your project, opportunity, or what you'd like to collaborate on..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? 'Opening Email Client...' : 'Send Message'}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* What I'm Looking For Section */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-blue-400 mb-4">What I&apos;m Looking For</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
              <div>
                <h4 className="font-medium text-white mb-2">🚀 Career Opportunities</h4>
                <p className="text-sm">Full-time or contract roles in Machine Learning, AI Engineering, or Data Science</p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">🤝 Collaboration</h4>
                <p className="text-sm">Open source projects, research partnerships, or interesting ML/AI challenges</p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">💡 Consulting</h4>
                <p className="text-sm">AI/ML strategy, implementation guidance, or technical advisory roles</p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">🌟 Networking</h4>
                <p className="text-sm">Connecting with fellow engineers, researchers, and industry professionals</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 