import { useEffect, useState, useRef, useContext } from 'react';
import { GAME_STATES, LETTER_STATES } from '../constants/gameState';
import { GlobalState} from '../App'

function Letter({ text, letterScore, currentHue, setCurrentHue, selectedLetter, handleSelectLetter, prevSelected, row, column, clicks, gameState }) {
	//state
	const { score, setScore } = useContext(GlobalState);

	const [letterColor, setLetterColor] = useState('#E3E3E3');
	const [textColor, setTextColor] = useState('#505050')
	const [select, setSelect] = useState(LETTER_STATES.CAN_SELECT)
	const [position, setPosition] = useState({
		x: null,
		y: null,
		height: null
	});

	//hooks
	const letterRef = useRef(null);

	useEffect(() => {
		if(!letterRef) return;
		const x = letterRef.current.offsetLeft
		const y = letterRef.current.offsetTop
		const height = letterRef.current.offsetHeight
		setPosition({x, y, height})
	},[letterRef]);

	useEffect(() => {
        deactivateLetter();
		setSelect(isSelectable())
    }, [selectedLetter]);

	useEffect(() => {
		if(letterColor !== "#E3E3E3" && gameState === GAME_STATES.WIN){
			setLetterColor('green')
		}
		else if(letterColor !== "#E3E3E3" && gameState !== GAME_STATES.RUNNING){
			setLetterColor('red')
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
			setSelect(LETTER_STATES.DISABLED);
			setScore(prevScore => prevScore + letterScore)
		}
	};

	const handleClick = () => {
		if(select !== LETTER_STATES.CAN_SELECT || clicks === 0) return;
		changeColor();
		setSelect(LETTER_STATES.CAN_SELECT);
		handleSelectLetter(row, column, position.x, position.y, position.height, text);
	};

	//allow selection when row or column matches prev selected
	const isSelectable = () => {
		if(selectedLetter.row === null) return LETTER_STATES.CAN_SELECT;
		if(row === selectedLetter.row || column === selectedLetter.column) return LETTER_STATES.CAN_SELECT;
		else { return LETTER_STATES.UNSELECTABLE }
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
		<div className='letter relative' ref={letterRef} style={{ background: letterColor, color: textColor }} onClick={select === LETTER_STATES.CAN_SELECT ? handleClick : null}>
			{text}
			<span className='absolute text-xs right-0 bottom-0 mr-1 mb-1'>{letterScore}</span>
		</div>
	);
}

export default Letter;
