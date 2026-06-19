import { motion } from 'framer-motion';
import { Calendar, Cpu, ArrowRight, ShieldCheck } from 'lucide-react';
import robotIllustration from '../assets/robot-illustration.png';

export default function Hero() {
  const scrollToEnroll = () => {
    const element = document.getElementById('enroll');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Background Decorative Glows */}
      <div className="glow-purple top-10 left-[-10%]" />
      <div className="glow-orange bottom-10 right-[-10%]" />
      <div className="glow-teal top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Heading and copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-6"
          >
            {/* Summer Badge */}
            <div className="inline-flex items-center gap-2 self-start bg-brand-orange/10 border border-brand-orange/30 text-brand-orange px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-pulse" />
              Summer Camp 2026
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-dark tracking-tight leading-tight">
              Build the Future: <br />
              <span className="text-gradient-purple">AI & Robotics</span> <br />
              Summer Workshop
            </h1>

            {/* Short Description */}
            <p className="text-lg text-slate-600 max-w-xl">
              Empower your child (Ages 8–14) to enter the world of coding, computer vision, and hands-on robotics. Learn concepts of Artificial Intelligence from scratch through interactive projects!
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-700">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-5 h-5 text-brand-teal" /> 100% Beginner Friendly</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-5 h-5 text-brand-teal" /> Live Interactive Classes</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-5 h-5 text-brand-teal" /> Hands-on Kit Support</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={scrollToEnroll}
                className="bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-brand-orange/30 transition-all duration-200 flex items-center justify-center gap-2 group hover:scale-105"
              >
                Enroll Now
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={() => document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white border-2 border-slate-200 hover:border-brand-purple hover:text-brand-purple text-slate-700 px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2 hover:bg-slate-50"
              >
                Explore Details
              </button>
            </div>
          </motion.div>

          {/* Right Column: Illustration & Floating Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative flex justify-center items-center lg:pl-10"
          >
            {/* Orbit / Rotating circles behind image */}
            <div className="absolute w-[80%] h-[80%] border-2 border-dashed border-brand-purple/20 rounded-full animate-spin-slow -z-10" />
            <div className="absolute w-[60%] h-[60%] border-2 border-dotted border-brand-teal/20 rounded-full animate-[spin_20s_linear_infinite] -z-10" />

            {/* Main Robot Illustration */}
            <img
              src={robotIllustration}
              alt="AI and Robotics Summer Workshop"
              className="w-full max-w-[450px] object-contain animate-float-slow drop-shadow-2xl"
            />

            {/* Floating Badge 1: Age */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-[10%] left-[-5%] sm:left-[5%] glass-card p-4 rounded-2xl flex items-center gap-3 border border-white/50"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center text-brand-purple">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase">Age Group</p>
                <p className="font-extrabold text-sm text-brand-dark">8–14 Years</p>
              </div>
            </motion.div>

            {/* Floating Badge 2: Starting Date */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-[15%] right-[-5%] sm:right-[5%] glass-card p-4 rounded-2xl flex items-center gap-3 border border-white/50"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase">Starts On</p>
                <p className="font-extrabold text-sm text-brand-dark">15 July 2026</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
