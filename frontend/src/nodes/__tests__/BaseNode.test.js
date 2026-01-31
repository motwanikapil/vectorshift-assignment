import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BaseNode from '../BaseNode';

describe('BaseNode', () => {
  const defaultProps = {
    id: 'test-node-1',
    data: {
      label: 'Test Node',
      inputs: [{ id: 'input1', type: 'source', position: 'left' }],
      outputs: [{ id: 'output1', type: 'target', position: 'right' }],
      fields: [
        { name: 'name', label: 'Name', type: 'text', defaultValue: 'test' }
      ]
    }
  };

  test('renders node with correct label', () => {
    render(<BaseNode {...defaultProps} />);
    expect(screen.getByText('Test Node')).toBeInTheDocument();
  });

  test('renders input handles', () => {
    render(<BaseNode {...defaultProps} />);
    expect(screen.getByTestId('handle-input1')).toBeInTheDocument();
  });

  test('renders output handles', () => {
    render(<BaseNode {...defaultProps} />);
    expect(screen.getByTestId('handle-output1')).toBeInTheDocument();
  });

  test('renders form fields', () => {
    render(<BaseNode {...defaultProps} />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });

  test('updates field value when input changes', () => {
    render(<BaseNode {...defaultProps} />);
    const input = screen.getByLabelText('Name');
    fireEvent.change(input, { target: { value: 'new name' } });
    expect(input.value).toBe('new name');
  });

  test('renders with custom dimensions', () => {
    const propsWithDimensions = {
      ...defaultProps,
      data: {
        ...defaultProps.data,
        width: 300,
        height: 150
      }
    };

    render(<BaseNode {...propsWithDimensions} />);
    const nodeContainer = screen.getByText('Test Node').closest('div');
    expect(nodeContainer).toHaveStyle({ width: '300px', height: '150px' });
  });

  test('renders with custom styling', () => {
    const propsWithStyling = {
      ...defaultProps,
      data: {
        ...defaultProps.data,
        className: 'custom-node-class',
        style: { backgroundColor: 'blue' }
      }
    };

    render(<BaseNode {...propsWithStyling} />);
    const nodeContainer = screen.getByText('Test Node').closest('div');
    expect(nodeContainer).toHaveClass('custom-node-class');
    expect(nodeContainer).toHaveStyle({ backgroundColor: 'blue' });
  });
});