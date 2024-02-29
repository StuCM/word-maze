import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect, useMemo, useState } from 'react';
import { GAME_STATES } from '../constants/gameState';
import { GlobalState } from '../App';

function Line({ startX, startY, endX, endY, hue }) {
	const {gameState} = useContext(GlobalState)
	const incorrectColor = '#F07167'
	const correctColor = '#67ef6b'

	let [color,setEndColor] = useState(incorrectColor);

	useEffect(() => {
		if (gameState.gameState === GAME_STATES.WIN) {
			setEndColor(correctColor);
		} else if (gameState.gameState === GAME_STATES.INCORRECT) {
			setEndColor(incorrectColor);
		}
	}, [gameState.gameState]);

	let startColor = useMemo(() => {
		switch(gameState.gameState) {
			case GAME_STATES.GAMEOVER:
				return color;
			case GAME_STATES.INCORRECT:
				return incorrectColor;
			case GAME_STATES.WIN:
				return correctColor;
			case GAME_STATES.RUNNING:
				return `hsl(${(hue - 15) % 357}, 82%, 67%)`;
		}
	}, [gameState.gameState, color]);

	let endColor = useMemo(() => {
		switch(gameState.gameState) {
			case GAME_STATES.GAMEOVER:
				return color;
			case GAME_STATES.INCORRECT:
				return incorrectColor;
			case GAME_STATES.WIN:
				return correctColor;
			case GAME_STATES.RUNNING:
				return `hsl(${(hue) % 357}, 82%, 67%)`;
		}
	}, [gameState.gameState, color]);

	const id = useMemo(() => uuidv4(), []);
	
	return (
		<>
			<defs>
				<linearGradient id={id} x1={startX} y1={startY} x2={endX} y2={endY} gradientUnits='userSpaceOnUse' >
					<stop offset='0%' stopColor={startColor} />
					<stop offset='100%' stopColor={endColor} />
				</linearGradient>
			</defs>
			<line
				x1={startX}
				y1={startY}
				x2={endX}
				y2={endY}
				stroke={`url(#${id})`}
				strokeWidth='3'
				data-testid="line"
			/>
		</>
	);
}

export default Line;
