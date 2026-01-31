import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock CSS modules
jest.mock('../App.module.css', () => ({
  app: 'app-class',
  header: 'header-class',
  main: 'main-class',
  footer: 'footer-class'
}));

describe('Styling', () => {
  test('applies consistent styling across components', () => {
    render(<App />);
    
    // Check if main app container has styling
    const appContainer = document.querySelector('.app-class');
    expect(appContainer).toBeInTheDocument();
  });

  test('toolbar has proper styling', () => {
    render(<App />);
    
    // Check if toolbar elements have proper classes
    const toolbarElements = document.querySelectorAll('.toolbar-button, .node-type');
    expect(toolbarElements.length).toBeGreaterThan(0);
  });

  test('pipeline UI has visual enhancements', () => {
    render(<App />);
    
    // Check if UI elements have proper styling
    const uiElements = document.querySelectorAll('.pipeline-canvas, .node-container, .connection-line');
    expect(uiElements.length).toBeGreaterThan(0);
  });

  test('nodes have consistent visual design', () => {
    render(<App />);
    
    // Check if nodes have proper styling classes
    const nodeElements = document.querySelectorAll('.abstract-node, .input-node, .llm-node, .output-node, .text-node');
    expect(nodeElements.length).toBeGreaterThan(0);
  });

  test('submit button has enhanced styling', () => {
    render(<App />);
    
    // Check if submit button has proper styling
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toHaveClass('submit-button', 'primary-button');
  });
});