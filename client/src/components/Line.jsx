import { v4 as uuidv4 } from 'uuid';
import { useMemo } from 'react';

function Line({ startX, startY, endX, endY, hue }) {
	const startColor = useMemo(() => `hsl(${hue}, 63%, 62%)`, []);
	const endColor = useMemo(() => `hsl(${(hue + 15) % 357}, 63%, 62%)`, []);
	const id = useMemo(() => uuidv4(), []);

	return (
		<>
			<defs>
				<linearGradient id={id} x1={startX} y1={startY} x2={endX} y2={endY} gradientUnits='userSpaceOnUse'>
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
			/>
		</>
	);
}

export default Line;
