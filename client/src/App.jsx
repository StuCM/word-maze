import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Gameboard from './components/Gameboard';
import ScoreUI from './components/ScoreUI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { GAME_STATES } from './constants/gameState';

function App() {
	const [gameState, setGameState] = useState(GAME_STATES.RUNNING);
	const [key, setKey] = useState(0);
	const [remainingAttempts, setRemainingAttempts] = useState(3);

	useEffect(() => {
		if(gameState === GAME_STATES.INCORRECT) {
			setTimeout(() => { 
				reduceAttempts();
			 }, 1000)
		}
	}, [gameState])

	const reduceAttempts = () => { 
		remainingAttempts > 0 ? setRemainingAttempts(remainingAttempts - 1) : 0;
		if(remainingAttempts > 1) {
			setKey((prevKey) => prevKey + 1)
			setGameState(GAME_STATES.RUNNING);
		}
		else { setGameState(GAME_STATES.GAMEOVER) }
	}

	const board = [
		['w', 'o', 'd', 'r', 'o', 'w'],
		['o', 's', 'd', 'd', 'w', 's'],
		['s', 'o', 'w', 'r', 'o', 'r'],
		['r', 's', 'd', 'o', 'w', 's'],
		['o', 'w', 's', 's', 'd', 'r'],
		['w', 'd', 's', 'o', 'r', 'd'],
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
		<main className='flex flex-col h-full'>
			<Header />
			<div className='mt-10'>
				<p className='text-lg'>Todays Word:</p>
				<p className='text-3xl mt-1'>{word}</p>
			</div>
			<Gameboard key={key} board={board} word={word} gameState={gameState} setGameState={setGameState} />
			<ScoreUI onReset={ reduceAttempts } attempts={ remainingAttempts } >
				<button onClick={reduceAttempts}>
					<FontAwesomeIcon icon={faRotateLeft} className='text-3xl' />
				</button>
			</ScoreUI>
		</main>
	);
}

export default App;
