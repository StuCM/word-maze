import './App.css';
import { useEffect, useState, createContext, useRef, forwardRef } from 'react';
import Header from './components/Header';
import Gameboard from './components/Gameboard';
import ScoreUI from './components/ScoreUI';
import Modal from './components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { GAME_STATES } from './constants/gameState';

export const GlobalState = createContext();

function App() {
	const [gameState, setGameState] = useState(GAME_STATES.RUNNING);
	const [key, setKey] = useState(0);
	const [remainingAttempts, setRemainingAttempts] = useState(3);
	const [score, setScore] = useState(0);
	const [dailyScore, setDailyScore] = useState([]);

	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		if (gameState === GAME_STATES.INCORRECT) {
			setTimeout(() => {
				setDailyScore([...dailyScore, { attempt: 3 - remainingAttempts + 1, score: score }]);
				reduceAttempts();
				setScore(0);
			}, 1000);
		} else if (gameState === GAME_STATES.WIN) {
			setDailyScore([...dailyScore, { attempt: 3 - remainingAttempts + 1, score: score }]);
		}
	}, [gameState]);

	const reduceAttempts = () => {
		setIsModalOpen(false)
		remainingAttempts > 0 ? setRemainingAttempts(remainingAttempts - 1) : 0;
		if (remainingAttempts > 1) {
			setKey((prevKey) => prevKey + 1);
			setGameState(GAME_STATES.RUNNING);
		} else {
			setGameState(GAME_STATES.GAMEOVER);
		}
	};

	const board = [
		[
			{ text: 'w', score: 4 },
			{ text: 'o', score: 1 },
			{ text: 'd', score: 2 },
			{ text: 'r', score: 1 },
			{ text: 'o', score: 1 },
			{ text: 'w', score: 4 },
		],
		[
			{ text: 'o', score: 1 },
			{ text: 's', score: 1 },
			{ text: 'd', score: 2 },
			{ text: 'd', score: 2 },
			{ text: 'w', score: 4 },
			{ text: 's', score: 1 },
		],
		[
			{ text: 's', score: 1 },
			{ text: 'o', score: 1 },
			{ text: 'w', score: 4 },
			{ text: 'r', score: 1 },
			{ text: 'o', score: 1 },
			{ text: 'r', score: 1 },
		],
		[
			{ text: 'r', score: 1 },
			{ text: 's', score: 1 },
			{ text: 'd', score: 2 },
			{ text: 'o', score: 1 },
			{ text: 'w', score: 4 },
			{ text: 's', score: 1 },
		],
		[
			{ text: 'o', score: 1 },
			{ text: 'w', score: 4 },
			{ text: 's', score: 1 },
			{ text: 's', score: 1 },
			{ text: 'd', score: 2 },
			{ text: 'r', score: 1 },
		],
		[
			{ text: 'w', score: 4 },
			{ text: 'd', score: 2 },
			{ text: 's', score: 1 },
			{ text: 'o', score: 1 },
			{ text: 'r', score: 1 },
			{ text: 'd', score: 2 },
		],
	];
	const board2 = [
		['w', 'o', 'd', 'r', 'o'],
		['o', 's', 'd', 'd', 'w'],
		['s', 'o', 'w', 'r', 'o'],
		['r', 's', 'd', 'o', 'w'],
		['o', 'w', 's', 's', 'd'],
	];
	const word = 'WORDS';
	return (
		<GlobalState.Provider value={{ score, setScore, setIsModalOpen }}>
			<main className='flex flex-col h-full'>
				<Header />
				<div className='mt-5'>
					<p className='text-lg'>Todays Word:</p>
					<p className='text-3xl mt-1 font-bold tracking-wider'>{word}</p>
				</div>
				<Gameboard key={key} board={board} word={word} gameState={gameState} setGameState={setGameState} />
				<ScoreUI onReset={reduceAttempts} attempts={remainingAttempts} score={score}>
					<button className='bg-seconday rounded-full p-2.5 flex justify-center items-center mt-5 shadow-lg' onClick={reduceAttempts}>
						<FontAwesomeIcon icon={faRotateLeft} className='text-2xl' />
					</button>
				</ScoreUI>
				<Modal isModalOpen={isModalOpen}>
					<div className='mt-4 mb-2'>
						<h2 className='mb-2 text-2xl'>Top Score</h2>
						<span className='text-2xl'>{Math.max(...dailyScore.map((item) => item.score))}</span>
					</div>
					{gameState === GAME_STATES.WIN ? (
						<div className='mb-2'>
							<p>You did it! See your scores:</p>
							<ul className='mb-3'>
								{dailyScore.map((score) => {
									return (
										<li className='mb-1'>
											Attempt: {score.attempt} Score: {score.score}
										</li>
									);
								})}
							</ul>
							{dailyScore.length < 3 && (
								<div>
									<p>Try again for a higher score?</p>
									<button onClick={reduceAttempts}>
										<FontAwesomeIcon icon={faRotateLeft} className='text-lg' />
									</button>
								</div>
							)}
						</div>
					) : (
						<p className='p-4 mb-4'>Unlucky, try again tomorrow</p>
					)}
				</Modal>
				<button onClick={() => setIsModalOpen(true)}>show modal</button>
			</main>
		</GlobalState.Provider>
	);
}

export default App;
