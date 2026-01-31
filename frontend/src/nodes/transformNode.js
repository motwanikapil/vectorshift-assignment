// transformNode.js

import BaseNode from './BaseNode';

const TransformNode = ({ id, data, useStore }) => {
  // Define the configuration for this specific node type
  const transformData = {
    ...data,
    label: 'Transform',
    inputs: [{ id: `${id}-input`, type: 'target', position: 'left' }],
    outputs: [{ id: `${id}-output`, type: 'source', position: 'right' }],
    fields: [
      {
        name: 'operation',
        label: 'Operation',
        type: 'select',
        defaultValue: data?.operation || 'uppercase',
        options: [
          { value: 'uppercase', label: 'Uppercase' },
          { value: 'lowercase', label: 'Lowercase' },
          { value: 'trim', label: 'Trim' },
          { value: 'reverse', label: 'Reverse' },
          { value: 'custom', label: 'Custom Function' }
        ]
      },
      {
        name: 'customFunction',
        label: 'Function',
        type: 'textarea',
        defaultValue: data?.customFunction || 'return value;',
        rows: 3
      }
    ],
    width: 250,
    height: 120,
    className: 'transform-node',
    type: 'transform'
  };

  return <BaseNode id={id} data={transformData} updateNodeField={useStore?.getState().updateNodeField} />;
};

export { TransformNode };