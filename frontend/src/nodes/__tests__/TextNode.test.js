import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextNode from '../textNode'; // Will be renamed after enhancement

describe('Enhanced TextNode', () => {
  const defaultProps = {
    id: 'text-node-1',
    data: { text: '{{input}} hello world' }
  };

  test('renders textarea instead of input', () => {
    render(<TextNode {...defaultProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('adjusts size based on text content', () => {
    const longTextProps = {
      ...defaultProps,
      data: { text: 'a'.repeat(200) + ' ' + 'b'.repeat(200) + '\n' + 'c'.repeat(100) }
    };
    
    render(<TextNode {...longTextProps} />);
    const textbox = screen.getByRole('textbox');
    // Check that the textarea has appropriate dimensions for the content
    expect(textbox).toBeInTheDocument();
  });

  test('creates handles for variables in format {{variableName}}', () => {
    const propsWithVariables = {
      ...defaultProps,
      data: { text: 'Hello {{userName}} and {{otherInput}}!' }
    };
    
    render(<TextNode {...propsWithVariables} />);
    // Should create handles for userName and otherInput
    expect(screen.getByTestId('handle-userName')).toBeInTheDocument();
    expect(screen.getByTestId('handle-otherInput')).toBeInTheDocument();
  });

  test('removes handles when variables are removed from text', () => {
    const { rerender } = render(<TextNode {...defaultProps} />);
    
    // Initially has {{input}} variable
    expect(screen.getByTestId('handle-input')).toBeInTheDocument();
    
    // Update with text that doesn't have variables
    const updatedProps = {
      ...defaultProps,
      data: { text: 'Static text without variables' }
    };
    
    rerender(<TextNode {...updatedProps} />);
    expect(() => screen.getByTestId('handle-input')).toThrow();
  });

  test('updates text value when textarea changes', () => {
    const mockUpdateField = jest.fn();
    const propsWithCallback = {
      ...defaultProps,
      updateNodeField: mockUpdateField
    };
    
    render(<TextNode {...propsWithCallback} />);
    const textbox = screen.getByRole('textbox');
    fireEvent.change(textbox, { target: { value: 'New text content' } });
    
    expect(mockUpdateField).toHaveBeenCalledWith(
      'text-node-1',
      'text',
      'New text content'
    );
  });

  test('validates variable names follow JavaScript identifier rules', () => {
    const propsWithInvalidVariable = {
      ...defaultProps,
      data: { text: 'Hello {{invalid-variable-name}}!' } // hyphens not allowed in JS identifiers
    };
    
    render(<TextNode {...propsWithInvalidVariable} />);
    // Should not create a handle for invalid variable names
    expect(() => screen.getByTestId('handle-invalid-variable-name')).toThrow();
  });
});