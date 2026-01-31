// analyticsNode.js

import BaseNode from './BaseNode';

const AnalyticsNode = ({ id, data, useStore }) => {
  // Define the configuration for this specific node type
  const analyticsData = {
    ...data,
    label: 'Analytics',
    inputs: [{ id: `${id}-data`, type: 'target', position: 'left' }],
    outputs: [
      { id: `${id}-processed`, type: 'source', position: 'right' },
      { id: `${id}-metrics`, type: 'source', position: 'right' }
    ],
    fields: [
      {
        name: 'metricType',
        label: 'Metric Type',
        type: 'select',
        defaultValue: data?.metricType || 'count',
        options: [
          { value: 'count', label: 'Count' },
          { value: 'sum', label: 'Sum' },
          { value: 'avg', label: 'Average' },
          { value: 'median', label: 'Median' },
          { value: 'percentile', label: 'Percentile' }
        ]
      },
      {
        name: 'filters',
        label: 'Filters (JSON)',
        type: 'textarea',
        defaultValue: data?.filters || '{\n  "status": "active"\n}',
        rows: 4
      },
      {
        name: 'groupBy',
        label: 'Group By',
        type: 'text',
        defaultValue: data?.groupBy || 'category'
      }
    ],
    width: 300,
    height: 240,
    className: 'analytics-node',
    type: 'analytics'
  };

  return <BaseNode id={id} data={analyticsData} updateNodeField={useStore?.getState().updateNodeField} />;
};

export { AnalyticsNode };