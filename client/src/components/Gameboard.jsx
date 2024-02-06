import Letter from './Letter';
import Line from './Line';
import React, { useState, useRef, useEffect } from 'react';

function Gameboard({ board }) {
	//state
	const [currentHue, setCurrentHue] = useState(null);
	const [selectedLetter, setSelectedLetter] = useState({ row: null, column: null, x: null, y: null, height: null });
	const [prevSelected, setPrevSelected] = useState({ row: null, column: null, x: null, y: null, height: null });
	const [lines, setLines] = useState([]);
	const gameboard = useRef();

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
			if (prevState) {
				setPrevSelected(prevState);
			}
			return { row, column, x, y, height };
		});
	};

	const createLine = () => {
		// Return on first selection
		if (prevSelected.x === null) return;

		const gameboardPos = gameboard.current.getBoundingClientRect();
		const viewBoxSize = 100; // Size of the viewBox

		// Convert prevSelected and selectedLetter to the viewBox coordinate system
		const prevSelectedXInViewBox = (prevSelected.x / gameboardPos.width) * viewBoxSize;
		const prevSelectedYInViewBox = (prevSelected.y / gameboardPos.height) * viewBoxSize;
		const selectedLetterXInViewBox = (selectedLetter.x / gameboardPos.width) * viewBoxSize;
		const selectedLetterYInViewBox = (selectedLetter.y / gameboardPos.height) * viewBoxSize;
		const heightInViewBox = (prevSelected.height / gameboardPos.height) * viewBoxSize;

		let startX, startY, endX, endY;

		if (prevSelected.column === selectedLetter.column) {
			//check direction of the next letter
			const distance = selectedLetterYInViewBox - prevSelectedYInViewBox;
			startX = prevSelectedXInViewBox + heightInViewBox / 2;
			startY = prevSelectedYInViewBox + (distance > 0 ? heightInViewBox : 0);
			endX = startX;
			endY = selectedLetterYInViewBox + (distance > 0 ? 0 : heightInViewBox);
		} else {
			const distance = selectedLetterXInViewBox - prevSelectedXInViewBox;
			startY = prevSelectedYInViewBox + heightInViewBox / 2;
			startX = prevSelectedXInViewBox + (distance > 0 ? heightInViewBox : 0);
			endY = startY;
			endX = selectedLetterXInViewBox + (distance > 0 ? 0 : heightInViewBox);
		}

		return { startX, startY, endX, endY };
	};

	const gridStyle = {
		gridTemplateColumns: `repeat(${board[0].length}, 1fr)`,
		gridTemplateRows: `repeat(${board[0].length}, 1fr)`,
	};
	return (
		<>
			<section ref={gameboard} className='board-container mt-10' style={gridStyle} aria-label='gameboard'>
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
				<svg viewBox="0 0 100 100" className='absolute top-0 left-0 pointer-events-none ma'>
				{lines.length > 0 &&
					lines.map((line, index) => {
						return (
							<Line
								startX={line.startX}
								startY={line.startY}
								endX={line.endX}
								endY={line.endY}
								key={index}
								hue={currentHue}
							/>
						);
					})}
					</svg>
			</section>
		</>
	);
}

export default Gameboard;
