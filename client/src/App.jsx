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
import loadingGIF from './assets/loading.gif'

export const GlobalState = createContext();

function App() {
	const [gameState, setGameState] = useState(GAME_STATES.RUNNING);
	const [board, setBoard] = useState();
	const [word, setWord] = useState();
	const [definition, setDefinition] = useState();
	const [key, setKey] = useState(0);
	const [remainingAttempts, setRemainingAttempts] = useState(3);
	const [score, setScore] = useState(0);
	const [dailyScore, setDailyScore] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const description = 'this is a description placeholder';

	useEffect(() => {
		const fetchBoard = async () => {
			setIsLoading(true);
			try {
				const url = new URL(import.meta.env.VITE_API_URL)
				const params = {
					wordSize: 6,
					boardSize: 6
				}
				url.search = new URLSearchParams(params)
				const response = await fetch(url);
				console.log("response",response)
				const data = await response.json();
				setBoard(data.board);
				setWord(data.word);
				setDefinition(data.definition);
				setIsLoading(false);
			} catch (error) {
				console.error(error);
			}
		};

		fetchBoard();
	}, []);

	useEffect(() =>{
		console.log(board)
	},[board])

	useEffect(() => {
		switch (gameState) {
			case GAME_STATES.WIN:
				setDailyScore([...dailyScore, { attempt: 3 - remainingAttempts + 1, score: score }]);
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

	const reduceAttempts = () => {
		remainingAttempts > 0 ? setRemainingAttempts(remainingAttempts - 1) : 0;
		if (remainingAttempts > 1 && gameState !== GAME_STATES.WIN) {
			setDailyScore([...dailyScore, { attempt: 3 - remainingAttempts + 1, score: 0 }]);
			setKey((prevKey) => prevKey + 1);
			setScore(0);
			setGameState(GAME_STATES.RUNNING);
		}
	};

	const handleModalClose = () => {
		if (remainingAttempts > 0) {
			setKey((prevKey) => prevKey + 1);
			setGameState(GAME_STATES.RUNNING);
			setScore(0);
		}
		setIsModalOpen(false);
	};

	const capitaliseWord = (word) => {
		if(!word) return;
		return word.toUpperCase();
	}

	return (
		<GlobalState.Provider value={{ score, setScore, setIsModalOpen }}>
			<main className='flex flex-col h-full'>
				<Header openModal={setIsModalOpen} />
				{isLoading && <div className='flex items-center justify-center w-full loading'>
					<div className='flex flex-col items-center'>
						<p>Generating maze...</p>
						<img src={loadingGIF} alt="loading" className='w-20 h-20' />
					</div>
				</div>}
				<div className='mt-5'>
					<p className='text-lg'>Todays Word:</p>
					<p className='text-3xl mt-1 font-bold tracking-wider'>{capitaliseWord(word)}</p>
				</div>
				{word && board && <Gameboard key={key} board={board} word={word} gameState={gameState} setGameState={setGameState} />}
				<ScoreUI attempts={remainingAttempts} score={score}>
					<button
						className='bg-seconday rounded-full p-2.5 flex justify-center items-center mt-5 shadow-lg'
						onClick={reduceAttempts}
						data-testid='resetButton'
					>
						<FontAwesomeIcon icon={faRotateLeft} className='text-2xl' />
					</button>
				</ScoreUI>
				<Modal isModalOpen={isModalOpen}>
					{board && word && <ScoreContent dailyScore={dailyScore} word={capitaliseWord(word)} definition={definition} />}
					<button className='py-2 px-3.5 bg-seconday m-4 rounded-full shadow-lg' onClick={handleModalClose}>
						<FontAwesomeIcon icon={faX} className='text-lg text-textPrim' />
					</button>
				</Modal>
			</main>
		</GlobalState.Provider>
	);
}

export default App;
