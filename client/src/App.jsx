import './App.css';
import { useEffect, useState, createContext, useRef, forwardRef } from 'react';
import Header from './components/Header';
import Gameboard from './components/Gameboard';
import ScoreUI from './components/ScoreUI';
import Modal from './components/Modal';
import ScoreContent from './components/ScoreContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { GAME_STATES } from './constants/gameState';

export const GlobalState = createContext();

function App() {
	const [gameState, setGameState] = useState(GAME_STATES.RUNNING);
	const [board, setBoard] = useState();
	const [word, setWord] = useState();
	const [key, setKey] = useState(0);
	const [remainingAttempts, setRemainingAttempts] = useState(3);
	const [score, setScore] = useState(0);
	const [dailyScore, setDailyScore] = useState([]);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const description = 'this is a description placeholder';

	useEffect(() => {
		const fetchBoard = async () => {
			console.log('fetchboard called')
			try {
				const response = await fetch('http://localhost:3000/api/getGameboard?wordSize=6&boardSize=6');
				console.log("response",response)
				const data = await response.json();
				setBoard(data.board);
				setWord(data.word);
				console.log("data",data)
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
				<Header />
				<div className='mt-5'>
					<p className='text-lg'>Todays Word:</p>
					<p className='text-3xl mt-1 font-bold tracking-wider'>{capitaliseWord(word)}</p>
				</div>
				{board && word && <Gameboard key={key} board={board} word={word} gameState={gameState} setGameState={setGameState} />}
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
					{board && word && <ScoreContent dailyScore={dailyScore} word={capitaliseWord(word)} description={description} />}
					<button className='py-2 px-3.5 bg-seconday m-4 rounded-full shadow-lg' onClick={handleModalClose}>
						<FontAwesomeIcon icon={faX} className='text-lg text-textPrim' />
					</button>
				</Modal>
			</main>
		</GlobalState.Provider>
	);
}

export default App;
