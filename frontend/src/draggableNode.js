// draggableNode.js

import styles from './App.module.css';

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    return (
      <div
        className={styles.draggableNode}
        onDragStart={(event) => onDragStart(event, type)}
        draggable
      >
          <span>{label}</span>
      </div>
    );
  };
  