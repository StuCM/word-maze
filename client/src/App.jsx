import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import Gameboard from './components/Gameboard';
import ScoreUI from './components/ScoreUI';

function App() {
  const [key, setKey] = useState(0);
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
			<Gameboard key={key} board={board} />
			<ScoreUI onReset={() => setKey(prevKey => prevKey + 1)} />
		</main>
	);
}

export default App;
