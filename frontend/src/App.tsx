import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsGrid from './components/StatsGrid';
import LearningOutcomes from './components/LearningOutcomes';
import ProjectShowcase from './components/ProjectShowcase';
import FAQs from './components/FAQs';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-light">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <StatsGrid />
        <LearningOutcomes />
        <ProjectShowcase />
        <FAQs />
        <RegistrationForm />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
