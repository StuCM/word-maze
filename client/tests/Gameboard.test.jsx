import { render, screen, waitFor } from '@testing-library/react';
import Gameboard from '../src/components/Gameboard';
import MockProvider from './mocks/MockProvider';
import { expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

const boardArray = [
	[
		{ text: 'A', score: 2 },
		{ text: 'B', score: 2 },
		{ text: 'C', score: 2 },
		{ text: 'D', score: 2 },
	],
	[
		{ text: 'E', score: 2 },
		{ text: 'F', score: 2 },
		{ text: 'G', score: 2 },
		{ text: 'H', score: 2 },
	],
	[
		{ text: 'I', score: 2 },
		{ text: 'J', score: 2 },
		{ text: 'K', score: 2 },
		{ text: 'L', score: 2 },
	],
	[
		{ text: 'M', score: 2 },
		{ text: 'N', score: 2 },
		{ text: 'O', score: 2 },
		{ text: 'P', score: 2 },
	],
];
describe('Gameboard', () => {
	it('renders 6x6 grid when a 6x6 array is passed', () => {
		const boardArray = Array(6).fill(Array(6).fill({ text: 'Z', score: 5 }));
		const word = 'Test';
		const gameState = 'running';
		const setGameState = vi.fn();

		render(
			<MockProvider>
				<Gameboard board={boardArray} word={word} gameState={gameState} setGameState={setGameState} />
			</MockProvider>
		);

		const letterComponents = screen.getAllByText('Z');
		expect(letterComponents.length).toBe(36);
	});
	it('renders 4x4 grid when a 4x4 array is passed', () => {
		const boardArray = Array(4).fill(Array(4).fill({ text: 'Z', score: 5 }));
		const word = 'Test';
		const gameState = 'running';
		const setGameState = vi.fn();

		render(
			<MockProvider>
				<Gameboard board={boardArray} word={word} gameState={gameState} setGameState={setGameState} />
			</MockProvider>
		);

		const letterComponents = screen.getAllByText('Z');
		expect(letterComponents.length).toBe(16);
	});
	it('draws a line between letters when selected', async () => {
		const boardArray = Array(6).fill(Array(6).fill({ text: 'Z', score: 5 }));
		const word = 'Test';
		const gameState = 'running';
		const setGameState = vi.fn();
		const user = userEvent.setup();

		render(
			<MockProvider>
				<Gameboard board={boardArray} word={word} gameState={gameState} setGameState={setGameState} />
			</MockProvider>
		);

		const letters = screen.getAllByText('Z');
		user.click(letters[1]);
		user.click(letters[2]);

		const lineElement = await waitFor(() => screen.getByTestId('line'));
		expect(lineElement).toBeInTheDocument();
	});
	it("doesn't draw a line between letters when not in the same row or column", async () => {
		const word = 'Test';
		const gameState = 'running';
		const setGameState = vi.fn();
		const user = userEvent.setup();

		render(
			<MockProvider>
				<Gameboard board={boardArray} word={word} gameState={gameState} setGameState={setGameState} />
			</MockProvider>
		);

		const letterA = screen.getByText('A');
		const letterF = screen.getByText('F');
		user.click(letterA);
		user.click(letterF);

		const lineElement = await waitFor(() => screen.queryByTestId('line'));
		expect(lineElement).not.toBeInTheDocument();
	});
	it('changes letter colour when clicked', async () => {
		const word = 'Test';
		const gameState = 'running';
		const setGameState = vi.fn();
		const user = userEvent.setup();

		render(
			<MockProvider>
				<Gameboard board={boardArray} word={word} gameState={gameState} setGameState={setGameState} />
			</MockProvider>
		);
		const letterB = screen.getByText('B');
		const letterBColor = window.getComputedStyle(letterB).backgroundColor;

		user.click(letterB);

		const newColor = await waitFor(() => {
			window.getComputedStyle(letterB).backgroundColor;
		});

		expect(newColor).not.toBe(letterBColor);
	});
});
