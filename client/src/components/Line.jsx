import { v4 as uuidv4 } from 'uuid';
import { useEffect, useMemo } from 'react';
import { GAME_STATES } from '../constants/gameState';

function Line({ startX, startY, endX, endY, hue, gameState }) {
	const incorrectColor = '#F07167'
	const correctColor = '#67ef6b'

	let startColor = useMemo(() => {
		switch(gameState) {
			case GAME_STATES.GAMEOVER:
				return incorrectColor;
			case GAME_STATES.INCORRECT:
				return incorrectColor;
			case GAME_STATES.WIN:
				return correctColor;
			case GAME_STATES.RUNNING:
				return `hsl(${(hue) % 357}, 63%, 62%)`;
		}
	}, [gameState]);

	let endColor = useMemo(() => {
		switch(gameState) {
			case GAME_STATES.GAMEOVER:
				return incorrectColor;
			case GAME_STATES.INCORRECT:
				return incorrectColor;
			case GAME_STATES.WIN:
				return correctColor;
			case GAME_STATES.RUNNING:
				return `hsl(${(hue) % 357}, 63%, 62%)`;
		}
	}, [gameState]);

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
