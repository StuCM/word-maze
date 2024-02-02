import Letter from './Letter';
import Line from './Line';
import React, { useState, useRef, useEffect } from 'react';

function Gameboard({ board }) {
	//state
	const [currentHue, setCurrentHue] = useState(null);
	const [selectedLetter, setSelectedLetter] = useState({ row: null, column: null, x: null, y: null, height: null });
	const [prevSelected, setPrevSelected] = useState({ row: null, column: null, x: null, y: null, height: null });
	const [lines, setLines] = useState([]);

	//hooks
	useEffect(() => {
		const newLine = createLine();
		if (newLine) {
			setLines([...lines, newLine]);
		}
	}, [selectedLetter]);

	//variables
	const handleSelectLetter = (row, column, x, y, height) => {
		setSelectedLetter((prevState) => {
			if (!prevState) return;
			setPrevSelected(prevState);
			return { row, column, x, y, height };
		});
	};

	const calculateLinePoint = (axis, distance, isStart = false) => {
		if (isStart) {
			return distance < 0 ? prevSelected[axis] + prevSelected.height : prevSelected[axis];
		} else {
			return distance < 0 ? selectedLetter[axis] : selectedLetter[axis] + prevSelected.height;
		}
	};

	const createLine = () => {
		//return on first selection
		if (!prevSelected.x) return;

		let startX;
		let startY;
		let endX;
		let endY;

		if (prevSelected.column === selectedLetter.column) {
			startX = selectedLetter.x + selectedLetter.height / 2;
			const distance = prevSelected.y - selectedLetter.y;

			startY = calculateLinePoint('y', distance, true);
			endX = startX;
			endY = calculateLinePoint('y', distance);
		} else {
			startY = selectedLetter.y + selectedLetter.height / 2;
			const distance = prevSelected.x - selectedLetter.x;
			startX = calculateLinePoint('x', distance, true);
			endY = startY;
			endX = calculateLinePoint('x', distance);
		}
		return { startX, startY, endX, endY };
	};

	const gridStyle = {
		gridTemplateColumns: `repeat(${board[0].length}, 1fr)`,
		gridTemplateRows: `repeat(${board[0].length}, 1fr)`,
	};
	return (
		<>
			<section className='board-container mt-10' style={gridStyle} aria-label='gameboard'>
				{board.map((row, rowIndex) => {
					return (
						<React.Fragment key={rowIndex}>
							{row.map((letter, columnIndex) => {
								return (
									<Letter
										text={letter}
										row={rowIndex}
										column={columnIndex}
										handleSelectLetter={handleSelectLetter}
										selectedLetter={selectedLetter}
										prevSelected={prevSelected}
										currentHue={currentHue}
										setCurrentHue={setCurrentHue}
										key={`${rowIndex}-${columnIndex}`}
									/>
								);
							})}
						</React.Fragment>
					);
				})}

				{lines.length > 0 &&
					lines.map((line, index) => {
						return (
							<Line
								startX={line.startX}
								startY={line.startY}
								endX={line.endX}
								endY={line.endY}
								key={index}
							/>
						);
					})}
			</section>
		</>
	);
}

export default Gameboard;
