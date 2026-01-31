// textNode.js

import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import BaseNode from './BaseNode';

const TextNode = ({ id, data, useStore }) => {
  const [dynamicInputs, setDynamicInputs] = useState([]);

  // Extract variables from text (double curly braces)
  const extractVariables = (text) => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
      const variableName = match[1];
      if (!matches.includes(variableName)) {
        matches.push(variableName);
      }
    }

    return matches;
  };

  // Update dynamic inputs when text changes
  useEffect(() => {
    const variables = extractVariables(data?.text || '');
    const newDynamicInputs = variables.map((variable, index) => ({
      id: `${id}-${variable}`,
      type: 'target',
      position: 'left',
      style: { top: `${30 + index * 30}px` }
    }));
    setDynamicInputs(newDynamicInputs);
  }, [data?.text]);

  // Calculate dynamic dimensions based on text content
  const calculateDimensions = (text) => {
    const lines = text ? text.split('\n').length : 1;
    const maxLineWidth = Math.max(...text.split('\n').map(line => line.length));
    const calculatedHeight = Math.max(120, lines * 25 + 60); // Base height + estimated line height
    const calculatedWidth = Math.max(300, maxLineWidth * 8 + 40); // Estimate based on character count

    return {
      width: Math.min(calculatedWidth, 600), // Max width of 600px
      height: Math.min(calculatedHeight, 400) // Max height of 400px
    };
  };

  const { width, height } = calculateDimensions(data?.text || '');

  // Define the configuration for this specific node type
  const textData = {
    ...data,
    label: 'Text',
    inputs: [], // Static inputs - dynamic inputs will be passed separately
    outputs: [{ id: `${id}-output`, type: 'source', position: 'right' }],
    fields: [
      {
        name: 'text',
        label: 'Text',
        type: 'textarea',
        defaultValue: data?.text || '{{input}}',
        rows: Math.min(Math.max((data?.text || '').split('\n').length, 3), 10)
      }
    ],
    width,
    height,
    className: 'text-node'
  };

  return (
    <BaseNode
      id={id}
      data={textData}
      updateNodeField={useStore?.getState().updateNodeField}
      dynamicInputs={dynamicInputs}
    />
  );
};

export { TextNode };
