import { useContext } from "react";
import { GlobalState } from "../App";

function ModalNav() {
	const {dispatch} = useContext(GlobalState)

	const handleClick = (content) => {
		dispatch({type: 'SET_CONTENT', payload: content})
	}
	return (
		<div className='flex items-center justify-center mx-auto px-3'>
			<button
				onClick={() => handleClick('score')}
				className='flex items-center justify-center mx-auto px-3 min-w-36 text-textPrim font-semibold bg-seconday m-4 rounded-full shadow-lg'
			>
				Current Score
			</button>
			<button
				onClick={() => handleClick('highScore')}
				className='flex items-center justify-center mx-auto px-3 min-w-36 text-textPrim font-semibold bg-seconday m-4 rounded-full shadow-lg'
			>
				High Scores
			</button>
		</div>
	);
}

export default ModalNav;
