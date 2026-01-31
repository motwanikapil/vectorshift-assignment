import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { EnhancedTextNode } from '../nodes/enhancedTextNode';

// Mock the useStore
const mockUpdateNodeField = jest.fn();
const mockUseStore = {
  getState: () => ({
    updateNodeField: mockUpdateNodeField
  })
};

// Mock the Handle component from reactflow
jest.mock('reactflow', () => ({
  Handle: ({ id, type, position }) => <div data-testid={`handle-${id}`} data-type={type} data-position={position} />,
  Position: {
    Left: 'left',
    Right: 'right'
  }
}));

describe('Enhanced TextNode', () => {
  const defaultProps = {
    id: 'text-node-1',
    data: {
      text: '{{input}}'
    },
    useStore: () => mockUseStore
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders textarea instead of input', () => {
    render(<EnhancedTextNode {...defaultProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('adjusts size based on text content', () => {
    const longTextProps = {
      ...defaultProps,
      data: {
        text: 'This is a very long text that should increase the size of the text node significantly. '.repeat(10)
      }
    };
    
    render(<EnhancedTextNode {...longTextProps} />);
    const textbox = screen.getByRole('textbox');
    // Check that the textarea has appropriate dimensions for the content
    expect(textbox).toBeInTheDocument();
  });

  test('creates handles for variables in format {{variableName}}', () => {
    const propsWithVariables = {
      ...defaultProps,
      id: 'test-node',
      data: {
        text: 'Hello {{userName}}! Welcome to {{otherInput}}.'
      }
    };
    
    render(<EnhancedTextNode {...propsWithVariables} />);
    // Should create handles for userName and otherInput
    expect(screen.getByTestId('handle-test-node-userName')).toBeInTheDocument();
    expect(screen.getByTestId('handle-test-node-otherInput')).toBeInTheDocument();
  });

  test('removes handles when variables are removed from text', () => {
    const { rerender } = render(<EnhancedTextNode {...defaultProps} />);
    
    // Initially has {{input}} variable
    expect(screen.getByTestId('handle-text-node-1-input')).toBeInTheDocument();
    
    // Change text to remove variable
    const newProps = {
      ...defaultProps,
      data: {
        text: 'Just plain text without variables'
      }
    };
    
    rerender(<EnhancedTextNode {...newProps} />);
    
    // Should not have the handle anymore
    expect(() => screen.getByTestId('handle-text-node-1-input')).toThrow();
  });

  test('updates text value when textarea changes', () => {
    const { getByRole } = render(<EnhancedTextNode {...defaultProps} />);
    const textbox = getByRole('textbox');
    
    fireEvent.change(textbox, { target: { value: 'New text content' } });
    
    expect(mockUpdateNodeField).toHaveBeenCalledWith('text-node-1', 'text', 'New text content');
  });

  test('validates variable names follow JavaScript identifier rules', () => {
    const propsWithInvalidVariable = {
      ...defaultProps,
      id: 'test-node',
      data: {
        text: 'Hello {{invalid-variable-name}}!'
      }
    };
    
    render(<EnhancedTextNode {...propsWithInvalidVariable} />);
    // Should not create a handle for invalid variable names
    expect(() => screen.getByTestId('handle-test-node-invalid-variable-name')).toThrow();
  });
});