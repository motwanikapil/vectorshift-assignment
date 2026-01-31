// outputNode.js

import BaseNode from './BaseNode';

const OutputNode = ({ id, data, useStore }) => {
  // Define the configuration for this specific node type
  const outputData = {
    ...data,
    label: 'Output',
    inputs: [{ id: `${id}-value`, type: 'target', position: 'left' }],
    outputs: [], // No outputs for an output node
    fields: [
      {
        name: 'outputName',
        label: 'Name',
        type: 'text',
        defaultValue: data?.outputName || id.replace('customOutput-', 'output_')
      },
      {
        name: 'outputType',
        label: 'Type',
        type: 'select',
        defaultValue: data?.outputType || 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'Image' }
        ]
      }
    ],
    width: 200,
    height: 80,
    className: 'output-node',
    type: 'output'
  };

  return <BaseNode id={id} data={outputData} updateNodeField={useStore?.getState().updateNodeField} />;
};

export { OutputNode };
