import { render, screen, waitFor } from '@testing-library/react';
import Gameboard from '../src/components/Gameboard';
import { expect } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('Gameboard', () => {
	it('renders 6x6 grid when a 6x6 array is passed', () => {
		const boardArray = Array(6).fill(Array(6).fill('Z'));

		render(<Gameboard board={boardArray} />);

		const letterComponents = screen.getAllByText('Z');
		expect(letterComponents.length).toBe(36);
	});
	it('renders 4x4 grid when a 4x4 array is passed', () => {
		const boardArray = Array(4).fill(Array(4).fill('Z'));

		render(<Gameboard board={boardArray} />);

		const letterComponents = screen.getAllByText('Z');
		expect(letterComponents.length).toBe(16);
	});
	it('draws a line between letters when selected', async () => {
		const boardArray = Array(6).fill(Array(6).fill('Z'));
		const user = userEvent.setup();

		render(<Gameboard board={boardArray} />);

		const letters = screen.getAllByText('Z');
		user.click(letters[1]);
		user.click(letters[2]);

		const lineElement = await waitFor(() => screen.getByTestId('line'));
		expect(lineElement).toBeInTheDocument();
	});
	it("doesn't draw a line between letters when not in the same row or column", async () => {
		const boardArray = [
			['A', 'B', 'C', 'D'],
			['E', 'F', 'G', 'H'],
			['I', 'J', 'K', 'L'],
			['M', 'N', 'O', 'P'],
		];
		const user = userEvent.setup();

		render(<Gameboard board={boardArray} />);

		const letterA = screen.getByText('A');
		const letterF = screen.getByText('F');
		user.click(letterA);
		user.click(letterF);

		const lineElement = await waitFor(() => screen.queryByTestId('line'));
		expect(lineElement).not.toBeInTheDocument();
	});
	it('changes letter colour when clicked', async () => {
		const boardArray = [
			['A', 'B', 'C', 'D'],
			['E', 'F', 'G', 'H'],
			['I', 'J', 'K', 'L'],
			['M', 'N', 'O', 'P'],
		];
		const user = userEvent.setup();

		render(<Gameboard board={boardArray} />);
		const letterB = screen.getByText('B');
		const letterBColor = window.getComputedStyle(letterB).backgroundColor;

		user.click(letterB);

		const newColor = await waitFor(() => {
			window.getComputedStyle(letterB).backgroundColor;
		});

		expect(newColor).not.toBe(letterBColor);
	});
});
