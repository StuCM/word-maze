import { v4 as uuidv4 } from 'uuid';
import { useEffect, useMemo } from 'react';

function Line({ startX, startY, endX, endY, hue, isGameOver }) {
	let startColor = useMemo(() => isGameOver ? 'red' : `hsl(${hue - 15}, 63%, 62%)`, []);
	let endColor = useMemo(() => isGameOver ? 'red' : `hsl(${(hue) % 357}, 63%, 62%)`, []);
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
