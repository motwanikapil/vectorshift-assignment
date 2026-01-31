// apiNode.js

import BaseNode from './BaseNode';

const ApiNode = ({ id, data, useStore }) => {
  // Define the configuration for this specific node type
  const apiData = {
    ...data,
    label: 'API Call',
    inputs: [
      { id: `${id}-params`, type: 'target', position: 'left' },
      { id: `${id}-headers`, type: 'target', position: 'left' }
    ],
    outputs: [
      { id: `${id}-response`, type: 'source', position: 'right' },
      { id: `${id}-error`, type: 'source', position: 'right' }
    ],
    fields: [
      {
        name: 'endpoint',
        label: 'Endpoint',
        type: 'text',
        defaultValue: data?.endpoint || 'https://api.example.com/data'
      },
      {
        name: 'method',
        label: 'Method',
        type: 'select',
        defaultValue: data?.method || 'GET',
        options: [
          { value: 'GET', label: 'GET' },
          { value: 'POST', label: 'POST' },
          { value: 'PUT', label: 'PUT' },
          { value: 'DELETE', label: 'DELETE' }
        ]
      },
      {
        name: 'authType',
        label: 'Auth',
        type: 'select',
        defaultValue: data?.authType || 'none',
        options: [
          { value: 'none', label: 'None' },
          { value: 'apiKey', label: 'API Key' },
          { value: 'oauth', label: 'OAuth' }
        ]
      }
    ],
    width: 250,
    height: 120,
    className: 'api-node'
  };

  return <BaseNode id={id} data={apiData} updateNodeField={useStore?.getState().updateNodeField} />;
};

export { ApiNode };