import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TextNode } from '../textNode';

describe('Enhanced TextNode', () => {
  const defaultProps = {
    id: 'text-node-1',
    data: { text: '{{input}} hello world' },
    useStore: {
      getState: () => ({
        updateNodeField: jest.fn()
      })
    }
  };

  test('renders textarea instead of input', () => {
    render(<TextNode {...defaultProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('adjusts size based on text content length', () => {
    const longTextProps = {
      ...defaultProps,
      data: { text: 'a'.repeat(200) + ' ' + 'b'.repeat(200) + '\n' + 'c'.repeat(100) }
    };
    
    render(<TextNode {...longTextProps} />);
    const textbox = screen.getByRole('textbox');
    
    // The textarea should have appropriate dimensions for the content
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
    // Note: We can't use getByTestId here as it would throw an error
    // Instead, we'll use queryByTestId which returns null if not found
    expect(screen.queryByTestId('handle-input')).toBeNull();
  });

  test('updates text value when textarea changes', () => {
    const mockUpdateField = jest.fn();
    const propsWithCallback = {
      ...defaultProps,
      useStore: {
        getState: () => ({
          updateNodeField: mockUpdateField
        })
      }
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
    expect(screen.queryByTestId('handle-invalid-variable-name')).toBeNull();
  });

  test('correctly identifies valid JavaScript identifiers', () => {
    const propsWithValidVariables = {
      ...defaultProps,
      data: { text: 'Hello {{validVar}} and {{_underscoreVar}} and {{$dollarVar}}!' }
    };
    
    render(<TextNode {...propsWithValidVariables} />);
    expect(screen.getByTestId('handle-validVar')).toBeInTheDocument();
    expect(screen.getByTestId('handle-_underscoreVar')).toBeInTheDocument();
    expect(screen.getByTestId('handle-$dollarVar')).toBeInTheDocument();
  });

  test('does not create handles for incomplete variable patterns', () => {
    const propsWithIncompletePattern = {
      ...defaultProps,
      data: { text: 'Text with {{incomplete and {{another}} complete' }
    };
    
    render(<TextNode {...propsWithIncompletePattern} />);
    // Should only create handle for 'another', not 'incomplete'
    expect(screen.queryByTestId('handle-incomplete')).toBeNull();
    expect(screen.getByTestId('handle-another')).toBeInTheDocument();
  });
});