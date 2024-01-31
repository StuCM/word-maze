import { useState } from "react";

function Letter({ text, handleHue }){
    const [ letterColor, setLetterColor] = useState('#E3E3E3')
    text = text.toUpperCase();
    const handleClick = () => {
        const hue = handleHue();
        setLetterColor(`hsl(${hue}, 63%, 62%)`);
    }

    return (
        <div className="letter" style={{background: letterColor}} onClick={ handleClick }>
            { text }
        </div>
    )
}

export default Letter;