// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap, BaseEdge } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { EnhancedTextNode } from './nodes/enhancedTextNode';
import { FilterNode } from './nodes/filterNode';
import { ApiNode } from './nodes/apiNode';
import { TransformNode } from './nodes/transformNode';
import { DatabaseNode } from './nodes/databaseNode';
import { ConditionalNode } from './nodes/conditionalNode';
import { EmailNode } from './nodes/emailNode';
import { WebhookNode } from './nodes/webhookNode';
import { AnalyticsNode } from './nodes/analyticsNode';
import { NotificationNode } from './nodes/notificationNode';
import { SchedulerNode } from './nodes/schedulerNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

// Define custom edge type
const edgeTypes = {
  default: ({ ...rest }) => (
    <BaseEdge
      {...rest}
      style={{
        strokeWidth: 2,
        stroke: 'url(#gradient)',
      }}
    />
  ),
};

// Enhanced node types to pass the store to each node
const nodeTypes = {
  customInput: (props) => <InputNode {...props} useStore={useStore} />,
  llm: (props) => <LLMNode {...props} useStore={useStore} />,
  customOutput: (props) => <OutputNode {...props} useStore={useStore} />,
  text: (props) => <EnhancedTextNode {...props} useStore={useStore} />,
  filter: (props) => <FilterNode {...props} useStore={useStore} />,
  api: (props) => <ApiNode {...props} useStore={useStore} />,
  transform: (props) => <TransformNode {...props} useStore={useStore} />,
  database: (props) => <DatabaseNode {...props} useStore={useStore} />,
  conditional: (props) => <ConditionalNode {...props} useStore={useStore} />,
  email: (props) => <EmailNode {...props} useStore={useStore} />,
  webhook: (props) => <WebhookNode {...props} useStore={useStore} />,
  analytics: (props) => <AnalyticsNode {...props} useStore={useStore} />,
  notification: (props) => <NotificationNode {...props} useStore={useStore} />,
  scheduler: (props) => <SchedulerNode {...props} useStore={useStore} />,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();

          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }

            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };

            addNode(newNode);
          }
        },
        [reactFlowInstance]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
        <div ref={reactFlowWrapper} style={{width: '100wv', height: '70vh'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                elementsSelectable={true}
                nodesConnectable={true}
                edgesUpdatable={true}
                className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
            >
                <Background
                  gap={gridSize}
                  size={1}
                  color="#334155"
                  className="opacity-20"
                />
                <Controls
                  className="bg-glass-bg border border-glass-border rounded-xl backdrop-blur-md p-1"
                  style={{
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                  }}
                />
                <MiniMap
                  className="bg-glass-bg border border-glass-border rounded-xl backdrop-blur-md"
                  style={{
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                  }}
                  nodeColor={'#4f46e5'}
                  maskColor={'rgba(15, 23, 42, 0.8)'}
                />
                <svg>
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
            </ReactFlow>
        </div>
        </>
    )
}
