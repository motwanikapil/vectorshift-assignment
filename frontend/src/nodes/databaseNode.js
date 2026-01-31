// databaseNode.js

import BaseNode from './BaseNode';

const DatabaseNode = ({ id, data, useStore }) => {
  // Define the configuration for this specific node type
  const dbData = {
    ...data,
    label: 'Database',
    inputs: [
      { id: `${id}-query`, type: 'target', position: 'left' },
      { id: `${id}-params`, type: 'target', position: 'left' }
    ],
    outputs: [
      { id: `${id}-results`, type: 'source', position: 'right' },
      { id: `${id}-error`, type: 'source', position: 'right' }
    ],
    fields: [
      {
        name: 'connectionString',
        label: 'Connection',
        type: 'text',
        defaultValue: data?.connectionString || 'postgresql://localhost:5432/mydb'
      },
      {
        name: 'queryType',
        label: 'Query Type',
        type: 'select',
        defaultValue: data?.queryType || 'SELECT',
        options: [
          { value: 'SELECT', label: 'SELECT' },
          { value: 'INSERT', label: 'INSERT' },
          { value: 'UPDATE', label: 'UPDATE' },
          { value: 'DELETE', label: 'DELETE' }
        ]
      },
      {
        name: 'databaseType',
        label: 'DB Type',
        type: 'select',
        defaultValue: data?.databaseType || 'PostgreSQL',
        options: [
          { value: 'PostgreSQL', label: 'PostgreSQL' },
          { value: 'MySQL', label: 'MySQL' },
          { value: 'MongoDB', label: 'MongoDB' },
          { value: 'SQLite', label: 'SQLite' }
        ]
      }
    ],
    width: 300,
    height: 150,
    className: 'database-node'
  };

  return <BaseNode id={id} data={dbData} updateNodeField={useStore?.getState().updateNodeField} />;
};

export { DatabaseNode };