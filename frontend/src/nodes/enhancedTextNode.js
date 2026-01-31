// enhancedTextNode.js

import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { motion } from 'framer-motion';
import './nodeStyles.css';

const EnhancedTextNode = ({ id, data, useStore }) => {
  const [dynamicInputs, setDynamicInputs] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 300, height: 120 });

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

  // Update dynamic inputs and dimensions when text changes
  useEffect(() => {
    const text = data?.text || '{{input}}';
    const variables = extractVariables(text);
    const newDimensions = calculateDimensions(text);

    const newDynamicInputs = variables.map((variable, index) => ({
      id: `${id}-${variable}`,
      type: 'target',
      position: 'left',
      style: { top: `${30 + index * 30}px` }
    }));

    setDynamicInputs(newDynamicInputs);
    setDimensions(newDimensions);
  }, [data?.text, id]);

  // Handle text change
  const handleTextChange = (e) => {
    const newText = e.target.value;
    useStore.getState().updateNodeField(id, 'text', newText);
  };

  return (
    <motion.div
      className="relative rounded-2xl shadow-lg text-node"
      style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px` }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Top accent bar with gradient */}
      <div className="h-2 bg-gradient-to-r from-yellow-500 via-yellow-400 to-orange-300 rounded-t-2xl"></div>

      {/* Dynamic input handles */}
      {dynamicInputs.map((input) => (
        <Handle
          key={input.id}
          type="target"
          position={input.position}
          id={input.id}
          style={input.style}
          className="w-6 h-6 bg-blue-400 border-2 border-white z-10 !rounded-full pointer-events-all"
        />
      ))}

      {/* Node content */}
      <div className="glass-card border border-glass-border rounded-2xl p-4 overflow-visible">
        <div className="font-bold text-white text-sm mb-3 flex items-center gap-2">
          <span className="node-accent-text">Text</span>
        </div>

        <div className="mb-3">
          <label className="block text-xs font-medium text-gray-300 mb-1">
            Text:
          </label>
          <textarea
            value={data?.text || '{{input}}'}
            onChange={handleTextChange}
            rows={Math.min(Math.max((data?.text || '').split('\n').length, 3), 10)}
            className="w-full bg-dark-800/50 border border-dark-600 rounded-lg py-1.5 px-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-y"
          />
        </div>
      </div>

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="w-6 h-6 bg-cyan-400 border-2 border-white z-10 !rounded-full pointer-events-all"
      />
    </motion.div>
  );
};

export { EnhancedTextNode };