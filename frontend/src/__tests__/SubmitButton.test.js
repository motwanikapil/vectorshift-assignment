import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SubmitButton } from '../submit';

// Mock the fetch API
global.fetch = jest.fn();

describe('SubmitButton', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('makes POST request to /pipelines/parse endpoint when clicked', async () => {
    const mockNodes = [
      { id: 'node1', type: 'input', position: { x: 0, y: 0 } },
      { id: 'node2', type: 'output', position: { x: 100, y: 100 } }
    ];
    
    const mockEdges = [
      { id: 'edge1', source: 'node1', target: 'node2' }
    ];
    
    // Mock the store to provide nodes and edges
    jest.mock('../../store', () => ({
      useStore: () => ({
        nodes: mockNodes,
        edges: mockEdges
      })
    }));
    
    // Re-import SubmitButton after mocking store
    const { SubmitButton } = require('../submit');
    
    render(<SubmitButton />);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nodes: mockNodes,
          edges: mockEdges
        })
      });
    });
  });

  test('shows alert with response data when backend responds', async () => {
    const mockResponse = {
      num_nodes: 3,
      num_edges: 2,
      is_dag: true
    };
    
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse)
    });
    
    // Mock alert function
    window.alert = jest.fn();
    
    render(<SubmitButton />);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        `Pipeline Analysis:\nNodes: 3\nEdges: 2\nIs DAG: true`
      );
    });
  });

  test('handles backend errors gracefully', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));
    
    // Mock alert function
    window.alert = jest.fn();
    
    render(<SubmitButton />);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Error: Network error');
    });
  });
});