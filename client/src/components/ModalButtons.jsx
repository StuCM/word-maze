import { GlobalState } from '../App';
import { useContext } from 'react';
import { GAME_STATES } from '../constants/gameState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function ModalButtons({handleModalClose}) {
	const { gameState } = useContext(GlobalState);
    
	return (
		<>
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
		</>
	);
}

export default ModalButtons;
