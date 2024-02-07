import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import Gameboard from './components/Gameboard';
import ScoreUI from './components/ScoreUI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';

function App() {
	const [isGameOver, setIsGameOver] = useState(false);
	const [key, setKey] = useState(0);
	const [remainingAttempts, setRemainingAttempts] = useState(3);

	const reduceAttempts = () => { 
		setKey((prevKey) => prevKey + 1) 
		return remainingAttempts > 0 ? setRemainingAttempts(remainingAttempts - 1) : 0;
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
			<Gameboard key={key} board={board} word={word} isGameOver={isGameOver} setIsGameOver={setIsGameOver} />
			<ScoreUI onReset={ reduceAttempts } attempts={ remainingAttempts } >
				<button onClick={reduceAttempts}>
					<FontAwesomeIcon icon={faRotateLeft} className='text-3xl' />
				</button>
			</ScoreUI>
		</main>
	);
}

export default App;
