import { useState } from 'react';

function Letter({ text, currentHue, setCurrentHue }) {
	const [letterColor, setLetterColor] = useState('#E3E3E3');
    const [selected, setSelected] = useState(false)

	text = text.toUpperCase();

	const handleClick = () => {
        changeColor();
        setSelected(true);
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
    }

	return (
		<div className='letter' style={{ background: letterColor }} onClick={!selected ? handleClick: null}>
			{text}
		</div>
	);
}

export default Letter;
