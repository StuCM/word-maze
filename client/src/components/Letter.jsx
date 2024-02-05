import { useEffect, useState, useRef } from 'react';

function Letter({ text, currentHue, setCurrentHue, selectedLetter, handleSelectLetter, prevSelected, row, column }) {
	//state
	const [letterColor, setLetterColor] = useState('#E3E3E3');
	const [selected, setSelected] = useState(false);
    const [textColor, setTextColor] = useState('#505050')
	const [canSelect, setCanSelect] = useState(true);
	const [position, setPosition] = useState({
		x: null,
		y: null,
		height: null
	});

	//hooks
	const screenPosition = useRef(null);

	useEffect(() => {
		if(!screenPosition) return;
		const rect = screenPosition.current.getBoundingClientRect();
		setPosition({x: rect.x, y: rect.y, height: rect.height})
	},[screenPosition]);

	useEffect(() => {
        deactivateLetter();
		setCanSelect(isSelectable())
    }, [selectedLetter]);

	useEffect(() => {
		
	}, [prevSelected])

	//variables
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
		if(!canSelect) return;
		changeColor();
		setSelected(true);
		handleSelectLetter(row, column, position.x, position.y, position.height);
	};

	const isSelectable = () => {
		if(selectedLetter.row === null) return true;
		if(row === selectedLetter.row || column === selectedLetter.column) return true;
		else { return false }
	}

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
		<div className='letter' ref={screenPosition} style={{ background: letterColor, color: textColor }} onClick={!selected ? handleClick : null}>
			{text}
		</div>
	);
}

export default Letter;
