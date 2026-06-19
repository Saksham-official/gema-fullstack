import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <div className="border border-slate-100 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
      >
        <span className="font-extrabold text-slate-800 pr-4 flex items-center gap-3">
          <HelpCircle className="w-5 h-5 text-brand-purple flex-shrink-0" />
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
        )}
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-6 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-50">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Who is this workshop for? Do we need prior coding experience?',
      answer: 'This workshop is carefully designed for children aged 8 to 14. No prior experience with programming or robotics is required. We start from absolute fundamentals using visual block programming interfaces, making it highly intuitive for beginners to build logic.'
    },
    {
      question: 'What computer setup or hardware materials are required?',
      answer: 'All your child needs is a desktop or laptop (Windows, Mac, or Chromebook) with a working webcam, microphrone, and a stable internet connection. All programming, robotics simulation, and machine learning model training occur directly inside the web browser. No special software installations are needed.'
    },
    {
      question: 'What is the schedule of the live classes and the duration?',
      answer: 'The workshop spans 4 weeks starting on 15 July 2026. Live interactive sessions are conducted twice a week (1.5 hours per session) on weekends. We offer flexible batch timings (morning/evening) which you can finalize after submitting the registration form.'
    },
    {
      question: 'Will my child receive a certificate and support after the course?',
      answer: 'Yes! Upon successful completion of the weekly tasks and the final capstone project, students are awarded a verifiable digital certificate from Kidrove. In addition, students receive 3 months of access to our online community to keep building and sharing projects.'
    }
  ];

  return (
    <section id="faqs" className="py-20 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">
            Frequently Asked Questions
          </h2>
          <div className="h-1.5 w-20 bg-brand-purple rounded-full mx-auto mt-4" />
          <p className="mt-4 text-slate-600">
            Got queries? Find instant answers to the most common questions from parents here.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
