import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ScoreContent from '../src/components/ScoreContent';

describe('ScoreContent', () => {
	const score = 100;
	const dailyScore = [
		{ attempt: 1, score: 50 },
		{ attempt: 2, score: 75 },
		{ attempt: 3, score: 100 },
	];
	const word = 'Test';
	const description = 'Test description';

	it('renders without crashing', () => {
		render(<ScoreContent score={score} dailyScore={dailyScore} word={word} description={description} />);
	});

	it('displays the correct top score', () => {
		render(<ScoreContent score={score} dailyScore={dailyScore} word={word} description={description} />);
		const topScoreElement = screen.getByLabelText('topScore');
		expect(topScoreElement.textContent).toBe('100');
	});

	it('displays the correct daily scores', () => {
		render(<ScoreContent score={score} dailyScore={dailyScore} word={word} description={description} />);

		const scoreElement = screen.getAllByLabelText('dailyScore');
		expect(scoreElement.length).toBe(dailyScore.length);
	});
});
