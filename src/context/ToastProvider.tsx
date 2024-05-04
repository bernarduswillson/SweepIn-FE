import { createContext, useState } from 'react';

interface Toast {
  message: string;
  type: 'error' | 'info';
}

interface ToastContextProps {
  showToast: (toast: Toast) => void;
  toast?: Toast;
}

const ToastContext = createContext<ToastContextProps>({
  showToast: () => {},
  toast: undefined,
});

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<Toast>();

  const showToast = (toast: Toast) => {
    setToast(toast);
    setTimeout(() => {
      setToast(undefined);
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ showToast: showToast, toast }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
