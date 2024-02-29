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
import { initialState as modalInitialState, modalReducer } from './reducer/modalReducer';
import { initialState as gameInitialState, gameReducer } from './reducer/gameReducer';
import ModalNav from './components/ModalNav';
import ModalButtons from './components/ModalButtons';
import Menu from './components/Menu';

export const GlobalState = createContext();

function App() {
	const [key, setKey] = useState(0);
	const [score, setScore] = useState(0);
	const [dailyScore, setDailyScore] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [dailyChallenge, setDailyChallenge] = useState();

	const [modalState, modalDispatch] = useReducer(modalReducer, modalInitialState);
	const [gameState, gameDispatch] = useReducer(gameReducer, gameInitialState);

	useEffect(() => {
		fetchPractice();
		fetchDaily();
	}, []);

	useEffect(() => {
		console.log("this", gameState.gameMode)
		if (gameState.gameMode === 'daily') {
			console.log("running")
			gameDispatch({ type: 'SET_BOARD', payload: dailyChallenge.board})
			gameDispatch({ type: 'SET_WORD', payload: dailyChallenge.word });
			modalDispatch({ type: 'CLOSE_MODAL' });
		} else if (gameState.gameMode === 'practice') {
			fetchPractice();
			modalDispatch({ type: 'CLOSE_MODAL' });
		}
	}, [gameState.gameMode]);

	useEffect(() => {
		switch (gameState.gameState) {
			case GAME_STATES.WIN:
				setDailyScore([...dailyScore, { attempt: 3 - gameState.remainingAttempts + 1, score: score }]);
				pushScore(gameState.word, score);
				modalDispatch({ type: 'OPEN_MODAL', payload: 'score' });
				reduceAttempts();
				break;
			case GAME_STATES.INCORRECT:
				setTimeout(() => {
					setDailyScore([...dailyScore, { attempt: 3 - gameState.remainingAttempts + 1, score: 0 }]);
					reduceAttempts();
					setScore(0);
				}, 1000);
		}
	}, [gameState.gameState]);

	useEffect(() => {
		if (gameState.remainingAttempts === 0) {
			gameDispatch({ type: 'SET_GAME_STATE', payload: GAME_STATES.GAMEOVER})
			modalDispatch({ type: 'OPEN_MODAL', payload: 'score' });
		}
	}, [gameState.remainingAttempts]);

	const fetchPractice = async () => {
		const data = await fetchBoard();
		gameDispatch({ type: 'SET_BOARD', payload: data.board})
		gameDispatch({ type: 'SET_WORD', payload: data.word})
		gameDispatch({ type: 'SET_DEFINITION', payload: data.definition})
		setIsLoading(false);
	};

	const fetchDaily = async () => {
		const dailyData = await fetchDailyBoard();
		setDailyChallenge(dailyData);
	};

	const restartGame = () => {
		gameDispatch({ type: 'SET_GAME_STATE', payload: GAME_STATES.START})
		fetchPractice();
		resetGame();
		modalDispatch({ type: 'CLOSE_MODAL' });
	};

	const showMenu = () => {
		gameDispatch({ type: 'SET_GAME_MODE', payload: 'menu'})
		modalDispatch({ type: 'OPEN_MODAL', payload: 'menu' });
		resetGame();
	};

	const resetGame = () => {
		setKey((prevKey) => prevKey + 1);
		gameDispatch({ type: 'RESET_ATTEMPTS' })
		gameDispatch({ type: 'SET_GAME_STATE', payload: GAME_STATES.START})
		setScore(0);
	};

	const reduceAttempts = () => {
		gameDispatch({ type: 'REDUCE_ATTEMPTS' })
		if (gameState.remainingAttempts >= 1 && gameState.gameState !== GAME_STATES.WIN) {
			setDailyScore([...dailyScore, { attempt: 3 - gameState.remainingAttempts + 1, score: 0 }]);
			setKey((prevKey) => prevKey + 1);
			setScore(0);
			gameDispatch({ type: 'SET_GAME_STATE', payload: GAME_STATES.START})
		}
	};

	const handleWinState = () => {
		setKey((prevKey) => prevKey + 1);
		gameDispatch({ type: 'SET_GAME_STATE', payload: GAME_STATES.START})
		setScore(0);
	};
	
	const handleModalClose = () => {
		if (gameState.gameMode === 'daily') {
			if (gameState.gameState === GAME_STATES.GAMEOVER) {
				gameDispatch({ type: 'SET_GAME_MODE', payload: 'menu'})
				modalDispatch({ type: 'OPEN_MODAL' });
			} else if (gameState.gameState === GAME_STATES.WIN) {
				handleWinState();
			}
		} else {
			if (gameState.gameState === GAME_STATES.GAMEOVER) {
				restartGame();
			} else if (gameState.gameState === GAME_STATES.WIN) {
				handleWinState();
			}
		}
		modalDispatch({ type: 'CLOSE_MODAL' });
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
		<GlobalState.Provider value={{ score, setScore, dispatch: modalDispatch, modalState, gameState, gameDispatch }}>
			<main className='flex flex-col h-full'>
				<Header />
				{gameState.gameMode !== 'menu' && (
					<>
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
							<p className='text-3xl mt-1 font-bold tracking-wider'>{capitaliseWord(gameState.word)}</p>
						</div>
						{gameState.word && gameState.board && !isLoading && (
							<Gameboard
								key={key}
								aria-label='gameboard'
							/>
						)}
						<ScoreUI score={score}>
							<button
								className='bg-seconday rounded-full p-2.5 flex justify-center items-center mt-5 shadow-lg disabled:opacity-60'
								onClick={reduceAttempts}
								disabled={gameState.gameState === GAME_STATES.START}
								data-testid='resetButton'
							>
								<FontAwesomeIcon icon={faRotateLeft} className='text-2xl' />
							</button>
						</ScoreUI>
					</>
				)}
				<Modal>
					{gameState.board && gameState.word && (
						<>
							{modalState.content === 'menu' && <Menu />}
							{modalState.content !== 'help' && modalState.content !== 'menu' && <ModalNav />}
							{modalState.content === 'highScore' && <HighScores />}
							{modalState.content === 'score' && (
								<ScoreContent
									dailyScore={dailyScore}
									word={capitaliseWord(gameState.word)}
									definition={gameState.definition}
								></ScoreContent>
							)}
							{modalState.content === 'help' && <HowToContent />}
						</>
					)}
					{modalState.content !== 'menu' && (
						<ModalButtons
							handleModalClose={handleModalClose}
							restartGame={restartGame}
							showMenu={showMenu}
						/>
					)}
				</Modal>
			</main>
		</GlobalState.Provider>
	);
}

export default App;
