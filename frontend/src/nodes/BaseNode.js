// BaseNode.js
// Base node component to be extended by specific node types
import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
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
            <div key={field.name} className="field">
              <label>
                {field.label}:
                <select
                  value={currentValue}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                >
                  {field.options?.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          );
        case 'textarea':
          return (
            <div key={field.name} className="field">
              <label>
                {field.label}:
                <textarea
                  value={currentValue}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  rows={field.rows || 3}
                />
              </label>
            </div>
          );
        default: // Default to text input
          return (
            <div key={field.name} className="field">
              <label>
                {field.label}:
                <input
                  type={field.type || 'text'}
                  value={currentValue}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                />
              </label>
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
    <div
      className={`abstract-node ${className}`}
      style={nodeStyle}
    >
      {/* Input handles */}
      {allInputs.map((input) => (
        <Handle
          key={input.id}
          type="target"
          position={input.position || Position.Left}
          id={input.id}
          data-testid={`handle-${input.id}`}
          style={input.style}
        />
      ))}

      {/* Node content */}
      <div className="node-header">
        <span>{label}</span>
      </div>

      <div className="node-body">
        {renderFields()}
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
        />
      ))}
    </div>
  );
};

export default BaseNode;