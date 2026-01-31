// llmNode.js

import BaseNode from './BaseNode';

const LLMNode = ({ id, data, useStore }) => {
  // Define the configuration for this specific node type
  const llmData = {
    ...data,
    label: 'LLM',
    inputs: [
      { id: `${id}-system`, type: 'target', position: 'left', style: { top: `${100/3}%` } },
      { id: `${id}-prompt`, type: 'target', position: 'left', style: { top: `${200/3}%` } }
    ],
    outputs: [{ id: `${id}-response`, type: 'source', position: 'right' }],
    fields: [
      {
        name: 'model',
        label: 'Model',
        type: 'select',
        defaultValue: data?.model || 'gpt-3.5-turbo',
        options: [
          { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
          { value: 'gpt-4', label: 'GPT-4' },
          { value: 'claude-2', label: 'Claude 2' },
          { value: 'llama-2', label: 'Llama 2' }
        ]
      },
      {
        name: 'temperature',
        label: 'Temperature',
        type: 'text',
        defaultValue: data?.temperature || '0.7'
      }
    ],
    width: 200,
    height: 80,
    className: 'llm-node',
    type: 'llm'
  };

  return <BaseNode id={id} data={llmData} updateNodeField={useStore?.getState().updateNodeField} />;
};

export { LLMNode };
