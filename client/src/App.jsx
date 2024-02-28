import './App.css';
import { useEffect, useState, createContext, useReducer } from 'react';
import Header from './components/Header';
import Gameboard from './components/Gameboard';
import ScoreUI from './components/ScoreUI';
import Modal from './components/Modal';
import ScoreContent from './components/ScoreContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { GAME_STATES } from './constants/gameState';
import loadingGIF from './assets/loading.gif';
import HowToContent from './components/HowToContent';
import HighScores from './components/HighScores';
import { fetchBoard, fetchDailyBoard } from './services/fetchRequests';
import { initialState, modalReducer } from './reducer/modalReducer';
import ModalNav from './components/ModalNav';
import ModalButtons from './components/ModalButtons';

export const GlobalState = createContext();

function App() {
	const [gameState, setGameState] = useState(GAME_STATES.START);
	const [board, setBoard] = useState();
	const [word, setWord] = useState();
	const [definition, setDefinition] = useState();
	const [key, setKey] = useState(0);
	const [remainingAttempts, setRemainingAttempts] = useState(3);
	const [score, setScore] = useState(0);
	const [dailyScore, setDailyScore] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [dailyChallenge, setDailyChallenge] = useState();

	const [modalState, dispatch] = useReducer(modalReducer, initialState);

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchBoard();
			const dailyData = await fetchDailyBoard();
			setDailyChallenge(dailyData);
			setBoard(data.board);
			setWord(data.word);
			setDefinition(data.definition);
			setIsLoading(false);
		};
		fetchData();
	}, []);

	useEffect(() => {
		switch (gameState) {
			case GAME_STATES.WIN:
				setDailyScore([...dailyScore, { attempt: 3 - remainingAttempts + 1, score: score }]);
				pushScore(word, score);
				dispatch({ type: 'OPEN_MODAL', payload: 'score' });
				reduceAttempts();
				break;
			case GAME_STATES.INCORRECT:
				setTimeout(() => {
					setDailyScore([...dailyScore, { attempt: 3 - remainingAttempts + 1, score: 0 }]);
					reduceAttempts();
					setScore(0);
				}, 1000);
		}
	}, [gameState]);

	useEffect(() => {
		if (remainingAttempts === 0) {
			setGameState(GAME_STATES.GAMEOVER);
			dispatch({ type: 'OPEN_MODAL', payload: 'score' });
		}
	}, [remainingAttempts]);

	const restartGame = () => {
		setGameState(GAME_STATES.START);
		fetchBoard();
		setKey((prevKey) => prevKey + 1);
		setDailyScore([]);
		setRemainingAttempts(3);
		dispatch({ type: 'CLOSE_MODAL' });
	};

	const reduceAttempts = () => {
		remainingAttempts > 0 ? setRemainingAttempts(remainingAttempts - 1) : 0;
		if (remainingAttempts >= 1 && gameState !== GAME_STATES.WIN) {
			setDailyScore([...dailyScore, { attempt: 3 - remainingAttempts + 1, score: 0 }]);
			setKey((prevKey) => prevKey + 1);
			setScore(0);
			setGameState(GAME_STATES.START);
		}
	};

	const handleModalClose = () => {
		if (gameState === GAME_STATES.GAMEOVER) {
			restartGame();
		} else if (gameState === GAME_STATES.WIN) {
			setKey((prevKey) => prevKey + 1);
			setGameState(GAME_STATES.START);
			setScore(0);
		}
		dispatch({ type: 'CLOSE_MODAL' });
	};

	const capitaliseWord = (word) => {
		if (!word) return;
		return word.toUpperCase();
	};

	const getTopScores = () => {
		const storedScores = window.localStorage.getItem('topScores');
		return storedScores ? JSON.parse(storedScores) : [];
	};

	const pushScore = (word, score) => {
		let topScores = getTopScores();
		const entry = { word, score };
		//add new score
		topScores.push(entry);
		//sort scores in order and top 10
		topScores.sort((a, b) => b.score - a.score);
		topScores = topScores.slice(0, 10);

		window.localStorage.setItem('topScores', JSON.stringify(topScores));
	};

	return (
		<GlobalState.Provider value={{ score, setScore, modalState, dispatch }}>
			<main className='flex flex-col h-full'>
				<Header />
				{isLoading && (
					<div className='flex items-center justify-center w-full loading'>
						<div className='flex flex-col items-center'>
							<p>Generating maze...</p>
							<img src={loadingGIF} alt='loading' className='w-20 h-20' />
						</div>
					</div>
				)}
				<div className='mt-5'>
					<p className='text-lg'>Todays Word:</p>
					<p className='text-3xl mt-1 font-bold tracking-wider'>{capitaliseWord(word)}</p>
				</div>
				{word && board && !isLoading && (
					<Gameboard
						key={key}
						board={board}
						word={word}
						gameState={gameState}
						setGameState={setGameState}
						aria-label='gameboard'
					/>
				)}
				<ScoreUI attempts={remainingAttempts} score={score}>
					<button
						className='bg-seconday rounded-full p-2.5 flex justify-center items-center mt-5 shadow-lg disabled:opacity-60'
						onClick={reduceAttempts}
						disabled={gameState === GAME_STATES.START}
						data-testid='resetButton'
					>
						<FontAwesomeIcon icon={faRotateLeft} className='text-2xl' />
					</button>
				</ScoreUI>
				<Modal>
					{board && word && (
						<>
							{modalState.content !== 'help' && <ModalNav />}
							{modalState.content === 'highScore' && <HighScores />}
							{modalState.content === 'score' && (
								<ScoreContent
									dailyScore={dailyScore}
									word={capitaliseWord(word)}
									definition={definition}
								>
								</ScoreContent>
							)}
							{modalState.content === 'help' && <HowToContent />}
						</>
					)}
					<ModalButtons handleModalClose={handleModalClose} />
				</Modal>
			</main>
		</GlobalState.Provider>
	);
}

export default App;
