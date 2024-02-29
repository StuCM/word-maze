import { GlobalState } from '../App';
import { useContext, useEffect } from 'react';
import { GAME_STATES } from '../constants/gameState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function ModalButtons({ handleModalClose, restartGame, showMenu }) {
	const { gameState } = useContext(GlobalState);

	return (
		<>
			{gameState.gameMode === 'daily' ? (
				<>
					{gameState.gameState !== GAME_STATES.GAMEOVER && <button
						className='px-3.5 bg-seconday m-4 rounded-full shadow-lg'
						onClick={() => {
							handleModalClose();
						}}
					>
						{gameState.gameState === GAME_STATES.WIN && gameState.gameState !== GAME_STATES.GAMEOVER ? (
							<p className='text-textPrim font-semibold min-w-20'>Try again?</p>
						) : (
							<FontAwesomeIcon icon={faX} className='text-md text-textPrim' />
						)}
					</button>}
					{(gameState.gameState === GAME_STATES.WIN || gameState.gameState === GAME_STATES.GAMEOVER) && (
						<button className='px-3.5 bg-seconday m-4 rounded-full shadow-lg' onClick={showMenu}>
							<p className='text-textPrim font-semibold min-w-20'>Menu</p>
						</button>
					)}
				</>
			) : (
				<>
					<button
						className='flex items-center justify-center mx-auto px-3 bg-seconday m-4 rounded-full shadow-lg sticky bottom-0'
						onClick={() => handleModalClose()}
					>
						{gameState.gameState === GAME_STATES.GAMEOVER ? (
							<p className='text-textPrim font-semibold min-w-20'>New Word</p>
						) : gameState.gameState === GAME_STATES.WIN ? (
							<p className='text-textPrim font-semibold min-w-20'>Try again?</p>
						) : (
							<FontAwesomeIcon icon={faX} className='text-md text-textPrim' />
						)}
					</button>
					{gameState === GAME_STATES.WIN && (
						<button className='px-3.5 bg-seconday m-4 rounded-full shadow-lg' onClick={restartGame}>
							<p className='text-textPrim font-semibold min-w-20'>New Word</p>
						</button>
					)}
				</>
			)}
		</>
	);
}

export default ModalButtons;
