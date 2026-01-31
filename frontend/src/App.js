import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <h1>VectorShift Pipeline Builder</h1>
      </header>
      <main className={styles.mainContent}>
        <aside className={styles.toolbar}>
          <h2 className={styles.nodePaletteTitle}>Node Palette</h2>
          <PipelineToolbar />
        </aside>
        <section className={styles.pipelineArea}>
          <PipelineUI />
        </section>
      </main>
      <footer className={styles.submitSection}>
        <SubmitButton />
      </footer>
    </div>
  );
}

export default App;
