function Line({ startX, startY, endX, endY }) {
	return (
		<svg className='absolute top-0 left-0 w-full h-full pointer-events-none'>
			<line x1={startX} y1={startY} x2={endX} y2={endY} stroke='black' strokeWidth='10' />;
		</svg>
	);
}

export default Line;
