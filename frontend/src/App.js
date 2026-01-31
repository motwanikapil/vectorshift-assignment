import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-100">
      <header className="border-b border-dark-700/50 bg-dark-900/30 backdrop-blur-lg p-4">
        <div className="container mx-auto">
          <motion.h1
            className="text-2xl font-bold flex items-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
              VectorShift
            </span>
            <span className="text-gray-400 text-lg">Pipeline Builder</span>
          </motion.h1>
        </div>
      </header>

      <main className="flex flex-1 h-[calc(100vh-140px)]">
        <motion.aside
          className="p-4 border-r border-dark-700/50 bg-glass-bg backdrop-blur-xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <PipelineToolbar />
        </motion.aside>

        <motion.section
          className="flex-1 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <PipelineUI />
        </motion.section>
      </main>

      <footer className="border-t border-dark-700/50 bg-dark-900/30 backdrop-blur-lg p-4">
        <div className="container mx-auto flex justify-center">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <SubmitButton />
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default App;
