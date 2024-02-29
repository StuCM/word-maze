import { useContext, useEffect } from 'react';
import { GlobalState } from '../App';

function Menu() {
	const {gameState, gameDispatch, dispatch} = useContext(GlobalState)
	const buttons = [
		{ text: 'Daily Word', mode: 'daily' },
		{ text: 'Practice', mode: 'practice' },
		{ text: 'How to Play', mode: 'help' },
		{ text: 'High Scores', mode: 'highScore' },
	];	

	const handleClick = (mode) => {
		if (mode === 'help' || mode === 'highScore') {
			dispatch({ type: 'OPEN_MODAL', payload: mode });
		} else {
			gameDispatch({ type: 'SET_GAME_MODE', payload: mode });
			if (mode === 'daily') {
				const data = JSON.parse(window.localStorage.getItem('daily'));
				if (data) {
					gameDispatch({ type: 'SET_ATTEMPTS', payload: data.remainingAttempts });
					gameDispatch({ type: 'SET_DAILY_SCORE', payload: data.dailyScore });
					gameDispatch({ type: 'SET_DEFINITION', payload: data.definition });
				}
			}
		}
	};

	return (
		<section className='max-w-72 mx-auto'>
			<div className='flex flex-col justify-center items-center bg-primary rounded-t-2xl border-primary pt-4 pb-2'>
				<h1 className='text-3xl font-semibold sm:text-4xl text-textPrim'>Muddle</h1>
			</div>
			<div className='flex flex-col justify-center items-center bg-textPrim border-4 rounded-b-2xl border-primary p-6'>
				<p className='text-textSec font-semibold text-md mb-8'>Pick an option below to start playing</p>
				{buttons.map((button, index) => (
					<button
						key={index}
						className={`${index === buttons.length - 1 ? '' : 'mb-6'} min-w-40 rounded-3xl bg-seconday text-textPrim font-semibold hover:bg-secondaryDarker`}
                        onClick={() => handleClick(button.mode)}
					>
						{button.text}
					</button>
				))}
			</div>
		</section>
	);
}

export default Menu;
