import Letter from './Letter';
import { useState, useRef, useEffect } from 'react';

function Gameboard({ board }) {
	const [currentHue, setCurrentHue] = useState(null);
	const [selectedLetter, setSelectedLetter] = useState({ row: null, column: null });
	const [prevSelected, setPrevSelected] = useState({ row: null, column: null });

    useEffect(() => {
        console.log("prev", prevSelected, "current", selectedLetter)
    },[selectedLetter])

	const handleSelectLetter = (row, column) => {
		setSelectedLetter((prevState) => {
            if(!prevState) return;
			setPrevSelected(prevState);
            return { row, column };
		});
		
	};

	const gridStyle = {
		gridTemplateColumns: `repeat(${board[0].length}, 1fr)`,
		gridTemplateRows: `repeat(${board[0].length}, 1fr)`,
	};
	return (
		<section className='board-container mt-10' style={gridStyle} aria-label='gameboard'>
			{board.map((row, rowIndex) => {
				return row.map((letter, columnIndex) => {
					return (
						<Letter
							text={letter}
							currentHue={currentHue}
							setCurrentHue={setCurrentHue}
							selectedLetter={selectedLetter}
							handleSelectLetter={handleSelectLetter}
                            prevSelected={prevSelected}
							row={rowIndex}
							column={columnIndex}
						/>
					);
				});
			})}
		</section>
	);
}

export default Gameboard;
