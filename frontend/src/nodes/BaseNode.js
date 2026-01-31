// BaseNode.js
// Base node component to be extended by specific node types
import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { motion } from 'framer-motion';
import './nodeStyles.css';

const BaseNode = ({ id, data, updateNodeField, dynamicInputs = [] }) => {
  // Extract properties from data with defaults
  const {
    label = 'Node',
    inputs = [],
    outputs = [],
    fields = [],
    width = 200,
    height = 80,
    className = '',
    style = {},
  } = data;

  // Initialize state for form fields
  const fieldStates = {};
  fields.forEach(field => {
    fieldStates[field.name] = data[field.name] ?? field.defaultValue ?? '';
  });

  const [fieldValues, setFieldValues] = useState(fieldStates);

  const handleFieldChange = (fieldName, value) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldName]: value
    }));

    // Update the node field in the store
    if (updateNodeField) {
      updateNodeField(id, fieldName, value);
    }
  };

  // Render form fields based on field configuration
  const renderFields = () => {
    return fields.map((field) => {
      const currentValue = fieldValues[field.name];

      switch (field.type) {
        case 'select':
          return (
            <div key={field.name} className="mb-3">
              <label className="block text-xs font-medium text-gray-300 mb-1">
                {field.label}
              </label>
              <select
                value={currentValue}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                className="w-full bg-dark-800/50 border border-dark-600 rounded-lg py-1.5 px-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                {field.options?.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          );
        case 'textarea':
          return (
            <div key={field.name} className="mb-3">
              <label className="block text-xs font-medium text-gray-300 mb-1">
                {field.label}
              </label>
              <textarea
                value={currentValue}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                rows={field.rows || 3}
                className="w-full bg-dark-800/50 border border-dark-600 rounded-lg py-1.5 px-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>
          );
        default: // Default to text input
          return (
            <div key={field.name} className="mb-3">
              <label className="block text-xs font-medium text-gray-300 mb-1">
                {field.label}
              </label>
              <input
                type={field.type || 'text'}
                value={currentValue}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                className="w-full bg-dark-800/50 border border-dark-600 rounded-lg py-1.5 px-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          );
      }
    });
  };

  // Calculate dynamic dimensions if needed
  const nodeStyle = {
    width: width,
    height: height,
    ...style
  };

  // Combine static and dynamic inputs
  const allInputs = [...inputs, ...dynamicInputs];

  return (
    <motion.div
      className={`relative rounded-2xl shadow-lg ${className}`}
      style={nodeStyle}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Top accent bar with gradient */}
      <div className="h-2 bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 rounded-t-2xl"></div>

      {/* Input handles */}
      {allInputs.map((input) => (
        <Handle
          key={input.id}
          type="target"
          position={input.position || Position.Left}
          id={input.id}
          data-testid={`handle-${input.id}`}
          style={input.style}
          className="w-6 h-6 bg-blue-400 border-2 border-white z-10 !rounded-full pointer-events-all"
        />
      ))}

      {/* Node content */}
      <div className="glass-card border border-glass-border rounded-2xl p-4 overflow-visible">
        <div className="font-bold text-white text-sm mb-3 flex items-center gap-2">
          <span className={`node-accent-${data.type || 'default'}`}>{label}</span>
        </div>

        <div className="space-y-2">
          {renderFields()}
        </div>
      </div>

      {/* Output handles */}
      {outputs.map((output) => (
        <Handle
          key={output.id}
          type="source"
          position={output.position || Position.Right}
          id={output.id}
          data-testid={`handle-${output.id}`}
          style={output.style}
          className="w-6 h-6 bg-cyan-400 border-2 border-white z-10 !rounded-full pointer-events-all"
        />
      ))}
    </motion.div>
  );
};

export default BaseNode;