import { motion } from 'framer-motion';
import { CalendarDays, Clock, Globe, CreditCard, Users2 } from 'lucide-react';

export default function StatsGrid() {
  const details = [
    {
      icon: <Users2 className="w-6 h-6" />,
      label: 'Age Group',
      value: '8–14 Years',
      description: 'Curriculum designed for young minds',
      color: 'text-brand-purple bg-brand-purple/10 border-brand-purple/20'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: 'Duration',
      value: '4 Weeks',
      description: '8 Live Interactive Modules',
      color: 'text-brand-orange bg-brand-orange/10 border-brand-orange/20'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      label: 'Mode',
      value: 'Online',
      description: 'Live coding & mentorship from home',
      color: 'text-brand-teal bg-brand-teal/10 border-brand-teal/20'
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      label: 'Course Fee',
      value: '₹2,999',
      description: 'All-inclusive, no hidden charges',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100'
    },
    {
      icon: <CalendarDays className="w-6 h-6" />,
      label: 'Start Date',
      value: '15 July 2026',
      description: 'Registrations closing soon!',
      color: 'text-amber-600 bg-amber-50 border-amber-100'
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  } as const;

  return (
    <section id="details" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">
            Workshop Quick Details
          </h2>
          <div className="h-1.5 w-20 bg-brand-purple rounded-full mx-auto mt-4" />
          <p className="mt-4 text-slate-600">
            Everything you need to know about the AI & Robotics Summer Camp at a glance.
          </p>
        </div>

        {/* Details Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {details.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg shadow-slate-100/50 flex flex-col items-center text-center justify-between"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border ${item.color}`}>
                {item.icon}
              </div>
              <div className="flex-grow">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-xl font-extrabold text-brand-dark mb-2">{item.value}</p>
                <p className="text-xs text-slate-500">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Small Notice */}
        <div className="mt-12 text-center text-xs text-slate-400 font-semibold">
          💡 Certificate of accomplishment and virtual robotics toolkit access are included in the course fee.
        </div>
      </div>
    </section>
  );
}
