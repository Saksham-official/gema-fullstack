import { motion } from 'framer-motion';
import { ArrowRight, Video } from 'lucide-react';

export default function ProjectShowcase() {
  const projects = [
    {
      title: 'AI Gesture Control Car',
      type: 'Module 2 Project',
      difficulty: 'Easy',
      desc: 'Kids train an AI object recognition model using webcam frames, and write code to control a virtual robot car through hand gestures.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=400',
      badgeColor: 'bg-brand-purple/10 text-brand-purple'
    },
    {
      title: 'Smart Maze Solver',
      type: 'Module 3 Project',
      difficulty: 'Medium',
      desc: 'Using proximity sensors and logical switches, kids program a virtual mouse to find the quickest exit route inside randomized mazes.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=400',
      badgeColor: 'bg-brand-teal/10 text-brand-teal'
    },
    {
      title: 'Robotic Trash Sorter',
      type: 'Module 4 Capstone',
      difficulty: 'Advanced',
      desc: 'Combine computer vision with robot actuation. Train the camera to sort waste into paper, plastic, or metal, triggering mechanical sorting.',
      image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80&w=400',
      badgeColor: 'bg-brand-orange/10 text-brand-orange'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">
            Cool Projects Kids Will Build
          </h2>
          <div className="h-1.5 w-20 bg-brand-teal rounded-full mx-auto mt-4" />
          <p className="mt-4 text-slate-600">
            Real, working projects combining software logic and virtual hardware simulation.
          </p>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col h-full"
            >
              {/* Card Image */}
              <div className="relative h-48 overflow-hidden group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full text-brand-purple shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Video className="w-6 h-6" />
                  </button>
                </div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm">
                  {project.type}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-extrabold text-brand-dark">
                      {project.title}
                    </h3>
                    <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full ${project.badgeColor}`}>
                      {project.difficulty}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {project.desc}
                  </p>
                </div>
                <div className="flex justify-between items-center border-t border-slate-50 pt-4">
                  <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                    💻 Live simulated project
                  </span>
                  <button className="text-sm font-bold text-brand-purple flex items-center gap-1 hover:gap-2 transition-all">
                    View Demo <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
