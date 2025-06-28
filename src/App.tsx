import { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ContactPage from './pages/ContactPage';
import Insights from './pages/Insights';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import type {} from 'react-router-dom';
import { MessageSquareDot, Send, CheckCircle2 } from 'lucide-react';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { from: 'bot', text: '👋 Hello! How can I help you today?' }
  ]);
  const [toast, setToast] = useState<{ message: string; icon?: JSX.Element } | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setToast({ message: 'Welcome to Ruhil Future Technologies!', icon: <CheckCircle2 className="text-green-500" /> });
    }, 1000);
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleSend = () => {
    if (chatInput.trim() === '') return;
    setChatMessages([...chatMessages, { from: 'user', text: chatInput }]);
    setToast({ message: 'Message sent!', icon: <CheckCircle2 className="text-green-500" /> });
    // Simulate bot response
    setTimeout(() => {
      setChatMessages(msgs => ([...msgs, { from: 'bot', text: 'Thank you for your message! Our team will get back to you soon.' }]));
    }, 800);
    setChatInput('');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <Router>
        <Header isScrolled={isScrolled} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/enquiry" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />

        {/* Toast Notification */}
        {toast && (
          <div className="fixed bottom-6 right-6 z-[100] bg-white border border-blue-200 shadow-lg rounded-lg px-5 py-3 flex items-center gap-3 animate-fadeIn">
            {toast.icon}
            <span className="text-blue-900 font-medium">{toast.message}</span>
          </div>
        )}

        {/* Floating Logo Button */}
        <a
          href="https://www.gyansetu.ai/"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-8 z-50 flex flex-col items-center focus:outline-none hover:scale-105 transition-transform"
          aria-label="Go to uatweb.gyansetu.ai"
        >
          <img
            src="/gyan.png"
            alt="Gyansetu Logo"
            className="w-40 h-50 object-contain"
          />
          <span className="font-extrabold text-2xl text-black drop-shadow-lg animate-pulse -mt-2 p-0" style={{letterSpacing: '2px'}}>GyanSetu</span>
        </a>

      </Router>
    </div>
  );
}

export default App;
