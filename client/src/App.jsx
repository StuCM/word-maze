import './App.css';
import { useEffect, useState, createContext, useRef, forwardRef } from 'react';
import Header from './components/Header';
import Gameboard from './components/Gameboard';
import ScoreUI from './components/ScoreUI';
import Modal from './components/Modal';
import ScoreContent from './components/ScoreContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft, faX } from '@fortawesome/free-solid-svg-icons';
import { GAME_STATES } from './constants/gameState';
import loadingGIF from './assets/loading.gif';
import HowToContent from './components/HowToContent';
import HighScores from './components/HighScores';

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
	const [isLoading, setIsLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showScore, setShowScore] = useState(true);
	const [showHighScore, setShowHighScore] = useState(false);

	const fetchBoard = async () => {
		setIsLoading(true);
		try {
			const url = new URL(import.meta.env.VITE_API_URL);
			const params = {
				wordSize: 6,
				boardSize: 6,
			};
			url.search = new URLSearchParams(params);
			const response = await fetch(url);
			const data = await response.json();
			setBoard(data.board);
			setWord(data.word);
			setDefinition(data.definition);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchBoard();
	}, []);

	useEffect(() => {
		console.log(board);
	}, [board]);

	useEffect(() => {
		switch (gameState) {
			case GAME_STATES.WIN:
				setDailyScore([...dailyScore, { attempt: 3 - remainingAttempts + 1, score: score }]);
				pushScore(word, score);
				setIsModalOpen(true);
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
			setIsModalOpen(true);
		}
	}, [remainingAttempts]);

	const restartGame = () => {
		setGameState(GAME_STATES.START);
		fetchBoard();
		setKey((prevKey) => prevKey + 1);
		setDailyScore([]);
		setRemainingAttempts(3);
		setIsModalOpen(false);
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
		setIsModalOpen(false);
		setShowScore(true);
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
		<GlobalState.Provider value={{ score, setScore, setIsModalOpen }}>
			<main className='flex flex-col h-full'>
				<Header openModal={setIsModalOpen} setShowScore={setShowScore} />
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
				<Modal isModalOpen={isModalOpen}>
					{showScore && board && word ? (
						<>
							<div className='flex items-center justify-center mx-auto px-3'>
								<button onClick={() => setShowHighScore(false)} className='flex items-center justify-center mx-auto px-3 min-w-36 text-textPrim font-semibold bg-seconday m-4 rounded-full shadow-lg'>
									Current Score
								</button>
								<button onClick={() => setShowHighScore(true)} className='flex items-center justify-center mx-auto px-3 min-w-36 text-textPrim font-semibold bg-seconday m-4 rounded-full shadow-lg'>
									High Scores
								</button>
							</div>
							{showHighScore ? (
								<HighScores />
							):
								<ScoreContent dailyScore={dailyScore} word={capitaliseWord(word)} definition={definition}>
								{gameState === GAME_STATES.WIN && (
									<>
										<h2 className='text-2xl font-bold'>Winner!</h2>
										<p className='text-sm font-medium my-2'>
											{remainingAttempts >= 1
												? 'You still have attempts left, try and beat your score?'
												: 'Try a new word?'}
										</p>
										<hr className='my-3 w-5/6 mx-auto border-t-2 border-primary ' />
									</>
								)}
								{gameState === GAME_STATES.GAMEOVER && (
									<>
										<h2 className='text-2xl font-bold'>Game Over</h2>
										<p className='text-sm font-medium my-2'>Try a new word?</p>
										<hr className='my-3 w-5/6 mx-auto border-t-2 border-primary ' />
									</>
								)}
							</ScoreContent>
							
							}
							
						</>
					) : (
						<HowToContent />
					)}
					<button
						className='flex items-center justify-center mx-auto px-3 bg-seconday m-4 rounded-full shadow-lg sticky bottom-0'
						onClick={handleModalClose}
					>
						{gameState === GAME_STATES.GAMEOVER && showScore ? (
							<p className='text-textPrim font-semibold min-w-20'>New Word</p>
						) : gameState === GAME_STATES.WIN && showScore ? (
							<p className='text-textPrim font-semibold min-w-20'>Try again?</p>
						) : (
							<FontAwesomeIcon icon={faX} className='text-md text-textPrim' />
						)}
					</button>
					{gameState === GAME_STATES.WIN && showScore && (
						<button className='px-3.5 bg-seconday m-4 rounded-full shadow-lg' onClick={restartGame}>
							<p className='text-textPrim font-semibold min-w-20'>New Word</p>
						</button>
					)}
				</Modal>
			</main>
		</GlobalState.Provider>
	);
}

export default App;
