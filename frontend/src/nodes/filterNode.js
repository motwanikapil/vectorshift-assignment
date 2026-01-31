// filterNode.js

import BaseNode from './BaseNode';

const FilterNode = ({ id, data, useStore }) => {
  // Define the configuration for this specific node type
  const filterData = {
    ...data,
    label: 'Filter',
    inputs: [{ id: `${id}-input`, type: 'target', position: 'left' }],
    outputs: [{ id: `${id}-output`, type: 'source', position: 'right' }],
    fields: [
      {
        name: 'condition',
        label: 'Condition',
        type: 'text',
        defaultValue: data?.condition || 'x > 0'
      },
      {
        name: 'filterType',
        label: 'Type',
        type: 'select',
        defaultValue: data?.filterType || 'numeric',
        options: [
          { value: 'numeric', label: 'Numeric' },
          { value: 'text', label: 'Text' },
          { value: 'date', label: 'Date' }
        ]
      }
    ],
    width: 200,
    height: 100,
    className: 'filter-node',
    type: 'filter'
  };

  return <BaseNode id={id} data={filterData} updateNodeField={useStore?.getState().updateNodeField} />;
};

export { FilterNode };