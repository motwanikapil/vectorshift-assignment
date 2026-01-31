import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SubmitButton } from '../submit';

// Mock the fetch API
global.fetch = jest.fn();

// Mock the store
jest.mock('../store', () => ({
  useStore: () => ({
    nodes: [
      { id: 'node1', type: 'input', position: { x: 0, y: 0 } },
      { id: 'node2', type: 'output', position: { x: 100, y: 100 } }
    ],
    edges: [
      { id: 'edge1', source: 'node1', target: 'node2' }
    ]
  })
}));

describe('Backend Integration', () => {
  beforeEach(() => {
    fetch.mockClear();
    window.alert = jest.fn();
  });

  test('sends pipeline data to backend when submit button is clicked', async () => {
    const mockResponse = {
      num_nodes: 2,
      num_edges: 1,
      is_dag: true
    };
    
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
      ok: true
    });
    
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
          nodes: [
            { id: 'node1', type: 'input', position: { x: 0, y: 0 } },
            { id: 'node2', type: 'output', position: { x: 100, y: 100 } }
          ],
          edges: [
            { id: 'edge1', source: 'node1', target: 'node2' }
          ]
        })
      });
    });
  });

  test('displays backend response in alert', async () => {
    const mockResponse = {
      num_nodes: 3,
      num_edges: 2,
      is_dag: true
    };
    
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
      ok: true
    });
    
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
    
    render(<SubmitButton />);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Error: Network error');
    });
  });

  test('handles HTTP error responses', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error'
    });
    
    render(<SubmitButton />);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('HTTP error! Status: 500');
    });
  });
});