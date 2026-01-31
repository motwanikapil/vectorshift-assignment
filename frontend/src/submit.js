// submit.js

import { useStore } from "./store";
import styles from "./App.module.css";

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
    <button
      className={styles.submitButton}
      type="button"
      onClick={handleSubmit}
    >
      Submit
    </button>
  );
};
