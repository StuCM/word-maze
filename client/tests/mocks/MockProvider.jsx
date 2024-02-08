import { GlobalState } from '../../src/App';

function MockProvider({ children }) {
	const mockScore = 0;
	const mockSetScore = vi.fn();
	const mockSetIsModalOpen = vi.fn();

	return (
		<GlobalState.Provider value={{ score: mockScore, setScore: mockSetScore, setIsModalOpen: mockSetIsModalOpen }}>
			{children}
		</GlobalState.Provider>
	);
}

export default MockProvider;
