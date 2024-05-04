import { AnimatePresence, motion } from "framer-motion";
import useToast from "../hooks/useToast";

import Toast from "@/components/dialouge/Toast";

const ToastContainer = () => {
  const toast = useToast().toast;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="w-11/12 max-w-[600px] h-full mx-auto pb-28 flex items-end">
        <AnimatePresence>
          {
            toast && toast.access === 'user' &&
            (<motion.div 
              className="w-full"
              initial={{
                y: 20,
                opacity: 0
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: 20,
                opacity: 0,
              }}
            >
              <Toast msg={toast.message} type={toast.type} />
            </motion.div>)
          }
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ToastContainer;