import { motion, AnimatePresence } from 'framer-motion';

export default function Toast({ message, isVisible, onClose }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          className="fixed bottom-6 left-1/2 z-[100] px-4 py-3 rounded-xl bg-dark-2/90 border border-emerald-500/30 text-emerald-400 text-sm font-medium shadow-xl shadow-emerald-900/20 backdrop-blur-md flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
