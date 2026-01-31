// inputNode.js

import BaseNode from './BaseNode';

const InputNode = ({ id, data, useStore }) => {
  // Define the configuration for this specific node type
  const inputData = {
    ...data,
    label: 'Input',
    inputs: [], // No inputs for an input node
    outputs: [{ id: `${id}-value`, type: 'source', position: 'right' }],
    fields: [
      {
        name: 'inputName',
        label: 'Name',
        type: 'text',
        defaultValue: data?.inputName || id.replace('customInput-', 'input_')
      },
      {
        name: 'inputType',
        label: 'Type',
        type: 'select',
        defaultValue: data?.inputType || 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' }
        ]
      }
    ],
    width: 200,
    height: 80,
    className: 'input-node',
    type: 'input'
  };

  return <BaseNode id={id} data={inputData} updateNodeField={useStore?.getState().updateNodeField} />;
};

export { InputNode };
