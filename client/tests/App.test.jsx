import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';

vi.mock('../src/components/Modal', () => ({
	default: () => <div>Test</div>,
}));

function createFetchResponse(data) {
	return { json: () => new Promise((resolve) => resolve(data)) };
}

describe('App test', () => {
	it('renders title', () => {
		render(<App />);
		expect(screen.getByText(/Muddle/i)).toBeDefined();
	});
	it('renders the score', () => {
		render(<App />);
		const score = screen.getByText(/Score/i);
		expect(score).toBeInTheDocument();
	});
	it('renders the attempts', () => {
		render(<App />);
		const attempt = screen.getByText(/Attempt/i);
		expect(attempt).toBeInTheDocument();
	});
});
