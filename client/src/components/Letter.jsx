import { useEffect, useState } from 'react';

function Letter({ text, currentHue, setCurrentHue, selectedLetter, handleSelectLetter, prevSelected, row, column }) {
	const [letterColor, setLetterColor] = useState('#E3E3E3');
	const [selected, setSelected] = useState(false);
    const [textColor, setTextColor] = useState('#505050')

	useEffect(() => {
        deactivateLetter();
    }, [selectedLetter]);

	text = text.toUpperCase();

	const isWithinRange = (value, rangeStart, rangeEnd) => {
		return value > Math.min(rangeStart, rangeEnd) && value < Math.max(rangeStart, rangeEnd);
	};

	const deactivateLetter = () => {
        if (prevSelected.row === null) return;
		if (
			(row === selectedLetter.row && isWithinRange(column, prevSelected.column, selectedLetter.column)) ||
			(column === selectedLetter.column && isWithinRange(row, prevSelected.row, selectedLetter.row))
		) {
			setTextColor('#CACACA');
		}
	};

	const handleClick = () => {
		changeColor();
		setSelected(true);
		handleSelectLetter(row, column);
	};

	const changeColor = () => {
		let hue = currentHue;
		if (!currentHue) {
			hue = Math.floor(Math.random() * 357);
		} else {
			hue = (currentHue + 15) % 357;
			if (hue === 0) hue = 1;
		}
		setCurrentHue(hue);
		setLetterColor(`hsl(${hue}, 63%, 62%)`);
	};

	return (
		<div className='letter' style={{ background: letterColor, color: textColor }} onClick={!selected ? handleClick : null}>
			{text}
		</div>
	);
}

export default Letter;
