import { GAME_STATES } from '../constants/gameState';
import { calculateScoreMultiplier } from '../services/scoreCalculator';
import Letter from './Letter';
import Line from './Line';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { GlobalState } from '../App';

function Gameboard() {
	const {gameState, gameDispatch} = useContext(GlobalState);
	//state
	const [currentHue, setCurrentHue] = useState(null);
	const [selectedLetter, setSelectedLetter] = useState({ row: null, column: null, x: null, y: null, height: null, letter:null });
	const [prevSelected, setPrevSelected] = useState({ row: null, column: null, x: null, y: null, height: null });
	const [lines, setLines] = useState([]);
	const [clicks, setClicks] = useState(gameState.word.length)
	const [userWord, setUserWord] = useState([]);
	const gameboard = useRef();
	const [scoreMultiplier, setScoreMultiplier] = useState(1);

	//hooks
	useEffect(() => {
		const multiplier = calculateScoreMultiplier(gameState.board);
		setScoreMultiplier(multiplier);
	}, []);

	useEffect(() => {
		const newLine = createLine();
		if (newLine) {
			setLines([...lines, newLine]);
		}
		//create array of selected word
		if(selectedLetter.letter) {
			setUserWord([...userWord, selectedLetter.letter])
		}
		
	}, [selectedLetter]);

	//check for correct word
	useEffect(()=>{
		if(clicks === 0){	
			const selWord = userWord.join('').toLocaleLowerCase();
			if(selWord === gameState.word.toLowerCase()) {
				gameDispatch({type: 'SET_GAME_STATE', payload: GAME_STATES.WIN})
				return;
			}
			else { 
				gameDispatch({type: 'SET_GAME_STATE', payload: GAME_STATES.INCORRECT})
			}
		}
	},[userWord])

	//variables
	const handleSelectLetter = (row, column, x, y, height, letter) => {
		setClicks(clicks - 1)
		setSelectedLetter((prevState) => {
			if (prevState) {
				setPrevSelected(prevState);
			}
			return { row, column, x, y, height, letter };
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
			startY = prevSelectedYInViewBox + (distance > 0 ? heightInViewBox - 1 : 1);
			endX = startX;
			endY = selectedLetterYInViewBox + (distance > 0 ? 1 : heightInViewBox - 1);
		} else {
			const distance = selectedLetterXInViewBox - prevSelectedXInViewBox;
			startY = prevSelectedYInViewBox + heightInViewBox / 2;
			startX = prevSelectedXInViewBox + (distance > 0 ? heightInViewBox - 1 : 1);
			endY = startY;
			endX = selectedLetterXInViewBox + (distance > 0 ? 1 : heightInViewBox - 1);
			// 1 -1 to create small overlap avoid gap
		}

		return { startX, startY, endX, endY };
	};

	const gridStyle = {
		gridTemplateColumns: `repeat(${gameState.board[0].length}, 1fr)`,
		gridTemplateRows: `repeat(${gameState.board[0].length}, 1fr)`,
	};
	return (
		<>
			<section ref={gameboard} className='board-container mt-8' style={gridStyle} aria-label='gameboard'>
				{gameState.board.map((row, rowIndex) => {
					return (
						<React.Fragment key={rowIndex}>
							{row.map((letter, columnIndex) => {
								return (
									<Letter
										text={letter.text}
										letterScore={letter.score}
										row={rowIndex}
										column={columnIndex}
										handleSelectLetter={handleSelectLetter}
										selectedLetter={selectedLetter}
										prevSelected={prevSelected}
										currentHue={currentHue}
										setCurrentHue={setCurrentHue}
										clicks={clicks}
										multiplier={scoreMultiplier}
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
								key={`${index}-line`}
								hue={currentHue}
								gameState={gameState}
							/>
						);
					})}
					</svg>
			</section>
		</>
	);
}

export default Gameboard;
