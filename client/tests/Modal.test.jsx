import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Modal from '../src/components/Modal';

describe('Modal Test', () => {
	it('renders the child component', () => {
		render(
			<Modal isModalOpen={true}>
				<div data-testid='child'>Rendered Child</div>
			</Modal>
		);

		const child = screen.getByTestId('child');
		const dialog = screen.getByTestId('dialog');
		expect(child).toBeInTheDocument();
		expect(dialog).toBeInTheDocument();
	});
});
