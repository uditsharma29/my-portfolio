'use client';

import { motion } from 'framer-motion';

interface TechStack {
  name: string;
  category: string;
  description?: string;
}

interface ExpertiseArea {
  title: string;
  description: string;
  technologies: TechStack[];
  icon: string;
  color: string;
}

const expertiseAreas: ExpertiseArea[] = [
  {
    title: "Programming & Data Manipulation",
    description: "Strong proficiency in Python for machine learning and data analysis, with expertise in building robust data pipelines and manipulation workflows.",
    technologies: [
      { name: "Python", category: "core" },
      { name: "Pandas", category: "data" },
      { name: "NumPy", category: "data" },
      { name: "SQL", category: "database" },
      { name: "GoLang", category: "backend" },
      { name: "R", category: "analytics" }
    ],
    icon: "💻",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "Machine Learning & Deep Learning",
    description: "Extensive hands-on experience with cutting-edge frameworks for developing, training, and deploying deep learning models across various architectures.",
    technologies: [
      { name: "PyTorch", category: "framework" },
      { name: "TensorFlow", category: "framework" },
      { name: "Keras", category: "framework" },
      { name: "scikit-learn", category: "ml" },
      { name: "CNNs", category: "architecture" },
      { name: "Deep Neural Networks", category: "architecture" },
      { name: "Recommendation Systems", category: "application" }
    ],
    icon: "🧠",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    title: "Generative AI & LLMs",
    description: "Advanced expertise in leveraging Large Language Models for complex tasks including RAG systems, prompt engineering, and building agentic AI solutions.",
    technologies: [
      { name: "OpenAI APIs", category: "llm" },
      { name: "Gemma-3", category: "llm" },
      { name: "Gemini-2.0-Flash", category: "llm" },
      { name: "RAG", category: "technique" },
      { name: "Prompt Engineering", category: "technique" },
      { name: "Vector Databases", category: "storage" },
      { name: "LangChain", category: "framework" },
      { name: "LangGraph", category: "framework" }
    ],
    icon: "🤖",
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    title: "MLOps & Cloud Infrastructure",
    description: "Production-focused engineering expertise in deploying models, building ETL pipelines, and leveraging cloud platforms for scalable ML solutions.",
    technologies: [
      { name: "Google Cloud Platform", category: "cloud" },
      { name: "Vertex AI", category: "ml-platform" },
      { name: "BigQuery", category: "data-warehouse" },
      { name: "Docker", category: "containerization" },
      { name: "Kubernetes", category: "orchestration" },
      { name: "TensorFlow Serving", category: "deployment" },
      { name: "Cloud Functions", category: "serverless" }
    ],
    icon: "☁️",
    color: "from-orange-500/20 to-red-500/20"
  },
  {
    title: "Data Visualization & Applications",
    description: "Experience building user-facing applications and comprehensive reporting solutions for model monitoring and business insights.",
    technologies: [
      { name: "Streamlit", category: "app-framework" },
      { name: "Flask", category: "web-framework" },
      { name: "Looker Studio", category: "visualization" },
      { name: "Git", category: "version-control" }
    ],
    icon: "📊",
    color: "from-indigo-500/20 to-blue-500/20"
  }
];

const allTechnologies = expertiseAreas.flatMap(area => area.technologies);

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const areaVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  const techVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
  };

  return (
    <motion.section 
      className="w-full max-w-6xl py-12 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <motion.div variants={areaVariants} className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          Technical Expertise
        </h2>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
          Comprehensive skill set spanning end-to-end development of AI-driven solutions, 
          from research to production deployment.
        </p>
      </motion.div>

      {/* Expertise Areas */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12"
        variants={containerVariants}
      >
        {expertiseAreas.map((area) => (
          <motion.div
            key={area.title}
            variants={areaVariants}
            className="group relative bg-gradient-to-br from-gray-800/60 to-gray-900/40 backdrop-blur-xl border border-gray-700/50 p-6 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:border-blue-400/50"
            whileHover={{ 
              y: -3,
              transition: { duration: 0.2 }
            }}
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
            
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start mb-4">
                <span className="text-3xl mr-3 group-hover:scale-110 transition-transform duration-300">
                  {area.icon}
                </span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                    {area.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </div>

              {/* Technologies - Always visible, compact */}
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {area.technologies.map((tech) => (
                    <motion.span
                      key={tech.name}
                      variants={techVariants}
                      className="px-3 py-1 text-xs font-medium bg-gray-700/50 border border-gray-600/50 rounded-full text-gray-300 backdrop-blur-sm hover:bg-blue-500/20 hover:border-blue-400/50 hover:text-blue-300 transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                    >
                      {tech.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Technology Cloud */}
      <motion.div 
        variants={areaVariants}
        className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6"
      >
        <h3 className="text-xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          Technology Stack
        </h3>
        <div className="flex flex-wrap justify-center gap-2">
          {allTechnologies.map((tech, index) => (
            <motion.span
              key={`${tech.name}-${index}`}
              variants={techVariants}
              className="px-3 py-1 text-sm font-medium bg-gradient-to-r from-gray-700/40 to-gray-800/40 border border-gray-600/30 rounded-xl text-gray-300 backdrop-blur-sm hover:from-blue-500/20 hover:to-purple-500/20 hover:border-blue-400/40 hover:text-white transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
            >
              {tech.name}
            </motion.span>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm italic">
            &ldquo;Always learning and exploring new technologies to solve complex problems&rdquo;
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
} 