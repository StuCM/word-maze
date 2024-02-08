import { GlobalState } from '../../src/App';

function MockProvider({ children }) {
	const mockScore = 0;
	const mockSetScore = vi.fn();
	const mockSetIsModalOpen = vi.fn();
	const mockRemainingAttempts = 3;
	const mockSetRemainingAttempts = vi.fn();

	return (
		<GlobalState.Provider
			value={{
				score: mockScore,
				setScore: mockSetScore,
				setIsModalOpen: mockSetIsModalOpen,
				remainingAttempts: mockRemainingAttempts,
				setRemainingAttempts: mockSetRemainingAttempts,
			}}
		>
			{children}
		</GlobalState.Provider>
	);
}

export default MockProvider;
