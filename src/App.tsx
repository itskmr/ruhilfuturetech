import { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
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
      setToast({ message: 'Welcome to Ruhil Future Technology!', icon: <CheckCircle2 className="text-green-500" /> });
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
        {/* Floating Help Button */}
        <button
          className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center border-4 border-white focus:outline-none"
          onClick={() => setShowChat(true)}
          aria-label="Open Help Chat"
        >
          <MessageSquareDot size={36} />
        </button>
        {/* Chat Modal */}
        {showChat && (
          <div className="fixed inset-0 z-50 flex items-end justify-end bg-black bg-opacity-0">
            <div className="bg-white rounded-xl shadow-2xl p-4 max-w-xs w-full m-8 relative flex flex-col h-[420px]">
              <button className="absolute top-2 right-2 text-2xl text-gray-400 hover:text-red-500" onClick={() => setShowChat(false)}>&times;</button>
              <h2 className="text-lg font-bold mb-2 text-blue-700">Chat with us</h2>
              <div className="flex-1 overflow-y-auto mb-2 space-y-2 pr-2">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`px-3 py-2 rounded-lg text-sm max-w-[80%] ${msg.from === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-700'}`}>{msg.text}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSend}
                  className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  aria-label="Send message"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;