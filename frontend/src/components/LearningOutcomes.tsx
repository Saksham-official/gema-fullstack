import { motion } from 'framer-motion';
import { Cpu, Eye, Code2, Sparkles, Share2, Lightbulb } from 'lucide-react';

export default function LearningOutcomes() {
  const outcomes = [
    {
      icon: <Cpu className="w-6 h-6 text-brand-purple" />,
      title: 'Robotics Engineering Basics',
      description: 'Understand the building blocks of robots: microcontrollers, motors, sensors, and actuators.',
      bg: 'bg-brand-purple/5'
    },
    {
      icon: <Eye className="w-6 h-6 text-brand-teal" />,
      title: 'AI & Computer Vision',
      description: 'Train machine learning models to detect objects, gestures, and facial expressions in real-time.',
      bg: 'bg-brand-teal/5'
    },
    {
      icon: <Code2 className="w-6 h-6 text-brand-orange" />,
      title: 'Computational Logic',
      description: 'Develop structured thinking and coding logic using visual block-based programming interfaces.',
      bg: 'bg-brand-orange/5'
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-amber-500" />,
      title: 'Autonomous Navigation',
      description: 'Program virtual smart robots to solve complex mazes and execute obstacle avoidance routines.',
      bg: 'bg-amber-500/5'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-emerald-500" />,
      title: '4 Capstone Projects',
      description: 'Build 4 real-world projects during the course to apply all theoretical concepts hands-on.',
      bg: 'bg-emerald-500/5'
    },
    {
      icon: <Share2 className="w-6 h-6 text-blue-500" />,
      title: 'Presentation Skills',
      description: 'Present your creations in a virtual exhibition, improving confidence and pitching skills.',
      bg: 'bg-blue-500/5'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 80 } }
  } as const;

  return (
    <section id="outcomes" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">
            What Your Child Will Achieve
          </h2>
          <div className="h-1.5 w-20 bg-brand-orange rounded-full mx-auto mt-4" />
          <p className="mt-4 text-slate-600">
            A comprehensive, project-driven curriculum that makes coding, logic, and hardware engineering highly accessible.
          </p>
        </div>

        {/* Outcomes Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {outcomes.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-100/30 flex flex-col justify-between"
            >
              <div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${item.bg}`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-extrabold text-brand-dark mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="mt-6 flex items-center text-xs font-bold text-brand-purple hover:underline cursor-pointer">
                Learn more about this module &rarr;
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
