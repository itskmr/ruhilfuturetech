import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface Toast {
  message: string;
  icon: ReactNode;
}

interface ToastContextType {
  toast: Toast | null;
  setToast: (toast: Toast | null) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500); // Auto-hide after 3.5 seconds
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      {children}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[100] bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 shadow-lg dark:shadow-gray-900/50 rounded-lg px-5 py-3 flex items-center gap-3 animate-fadeIn transition-colors duration-300">
          {toast.icon}
          <span className="text-blue-900 dark:text-blue-100 font-medium">{toast.message}</span>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export { ToastProvider };