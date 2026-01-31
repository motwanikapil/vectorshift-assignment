// conditionalNode.js

import BaseNode from './BaseNode';

const ConditionalNode = ({ id, data, useStore }) => {
  // Define the configuration for this specific node type
  const conditionalData = {
    ...data,
    label: 'Conditional',
    inputs: [{ id: `${id}-condition`, type: 'target', position: 'left' }],
    outputs: [
      { id: `${id}-true`, type: 'source', position: 'right' },
      { id: `${id}-false`, type: 'source', position: 'right' }
    ],
    fields: [
      {
        name: 'condition',
        label: 'Condition',
        type: 'text',
        defaultValue: data?.condition || 'x > 10'
      },
      {
        name: 'operator',
        label: 'Operator',
        type: 'select',
        defaultValue: data?.operator || '>',
        options: [
          { value: '>', label: '>' },
          { value: '<', label: '<' },
          { value: '>=', label: '>=' },
          { value: '<=', label: '<=' },
          { value: '==', label: '==' },
          { value: '!=', label: '!=' },
          { value: 'includes', label: 'Includes' },
          { value: 'matches', label: 'Matches Regex' }
        ]
      },
      {
        name: 'value',
        label: 'Value',
        type: 'text',
        defaultValue: data?.value || '10'
      }
    ],
    width: 250,
    height: 120,
    className: 'conditional-node'
  };

  return <BaseNode id={id} data={conditionalData} updateNodeField={useStore?.getState().updateNodeField} />;
};

export { ConditionalNode };