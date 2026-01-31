// submit.js

import { useStore } from "./store";
import { motion } from 'framer-motion';

export const SubmitButton = () => {
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      // Display the result in an alert
      alert(
        `Pipeline Analysis:\nNodes: ${result.num_nodes}\nEdges: ${result.num_edges}\nIs DAG: ${result.is_dag}`,
      );
    } catch (error) {
      console.error("Error submitting pipeline:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <motion.button
      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium rounded-xl shadow-lg hover:from-blue-500 hover:to-violet-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200"
      type="button"
      onClick={handleSubmit}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Analyze Pipeline
    </motion.button>
  );
};
