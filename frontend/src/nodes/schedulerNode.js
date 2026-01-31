// schedulerNode.js

import BaseNode from './BaseNode';

const SchedulerNode = ({ id, data, useStore }) => {
  // Define the configuration for this specific node type
  const schedulerData = {
    ...data,
    label: 'Scheduler',
    inputs: [{ id: `${id}-task`, type: 'target', position: 'left' }],
    outputs: [
      { id: `${id}-executed`, type: 'source', position: 'right' },
      { id: `${id}-failed`, type: 'source', position: 'right' }
    ],
    fields: [
      {
        name: 'scheduleType',
        label: 'Schedule Type',
        type: 'select',
        defaultValue: data?.scheduleType || 'interval',
        options: [
          { value: 'interval', label: 'Interval' },
          { value: 'cron', label: 'Cron Expression' },
          { value: 'oneTime', label: 'One-time' },
          { value: 'daily', label: 'Daily' },
          { value: 'weekly', label: 'Weekly' }
        ]
      },
      {
        name: 'scheduleValue',
        label: 'Schedule Value',
        type: 'text',
        defaultValue: data?.scheduleValue || '*/5 * * * *' // Every 5 minutes
      },
      {
        name: 'timezone',
        label: 'Timezone',
        type: 'select',
        defaultValue: data?.timezone || 'UTC',
        options: [
          { value: 'UTC', label: 'UTC' },
          { value: 'EST', label: 'Eastern Standard Time' },
          { value: 'PST', label: 'Pacific Standard Time' },
          { value: 'GMT', label: 'Greenwich Mean Time' },
          { value: 'IST', label: 'Indian Standard Time' }
        ]
      },
      {
        name: 'enabled',
        label: 'Enabled',
        type: 'select',
        defaultValue: data?.enabled !== undefined ? data.enabled.toString() : 'true',
        options: [
          { value: 'true', label: 'Yes' },
          { value: 'false', label: 'No' }
        ]
      }
    ],
    width: 320,
    height: 260,
    className: 'scheduler-node'
  };

  return <BaseNode id={id} data={schedulerData} updateNodeField={useStore?.getState().updateNodeField} />;
};

export { SchedulerNode };