import { useEffect, useState, useRef, useContext } from 'react';
import { GAME_STATES, LETTER_STATES } from '../constants/gameState';
import { GlobalState} from '../App'

function Letter({ text, letterScore, currentHue, setCurrentHue, selectedLetter, handleSelectLetter, prevSelected, row, column, clicks, gameState }) {
	//state
	const { setScore } = useContext(GlobalState);

	const primaryColor = '#FFFFF2'
	const secondaryText = '#005E79'
	const incorrectColor = '#F07167'
	const correctColor = '#67ef6b'

	const [letterColor, setLetterColor] = useState(primaryColor);
	const [textColor, setTextColor] = useState(secondaryText)
	const [canSelect, setCanSelect] = useState(true)
	const [isDisabled, setIsDisabled] = useState(false)
	const [position, setPosition] = useState({
		x: null,
		y: null,
		height: null
	});

	//hooks
	const letterRef = useRef(null);

	//gets position for the lines
	useEffect(() => {
		if(!letterRef) return;
		const x = letterRef.current.offsetLeft
		const y = letterRef.current.offsetTop
		const height = letterRef.current.offsetHeight
		setPosition({x, y, height})
	},[letterRef]);

	useEffect(() => {
        deactivateLetter();	
		isSelectable();	
    }, [selectedLetter]);

	useEffect(() => {
		if(letterColor !== primaryColor && gameState === GAME_STATES.WIN){
			setLetterColor(correctColor)
		}
		else if(letterColor !== primaryColor && gameState !== GAME_STATES.RUNNING){
			setLetterColor(incorrectColor)
		} 
	}, [gameState])

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
			setIsDisabled(true);
			setScore(prevScore => prevScore + letterScore)
		}
	};

	const handleClick = () => {
		if(!canSelect || isDisabled || clicks === 0) return;
		changeColor();
		handleSelectLetter(row, column, position.x, position.y, position.height, text);
	};

	//allow selection when row or column matches prev selected
	const isSelectable = () => {
		if (isDisabled) return;
		if(prevSelected.row === null) {
			setCanSelect(true) 
			return;
		}
		if(prevSelected.row === selectedLetter.row) {
			if(column === selectedLetter.column) {
				setCanSelect(true);
			} else {
				setCanSelect(false);
			}
		}
		// If the last move was across a column, then only the row is selectable
		else if(prevSelected.column === selectedLetter.column) {
			if(row === selectedLetter.row) {
				setCanSelect(true);
			} else {
				setCanSelect(false);
			}
		}
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
		setLetterColor(`hsl(${hue}, 82%, 67%)`);
	};

	return (
		<div className='letter relative' ref={letterRef} style={{ background: letterColor, color: textColor }} onClick={canSelect ? handleClick : null}>
			{text}
			<span className='absolute text-xs right-0 bottom-0 mr-1 mb-1'>{letterScore}</span>
		</div>
	);
}

export default Letter;
