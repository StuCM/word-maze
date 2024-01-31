import Letter from "./Letter";
import { useState } from "react";

function Gameboard({ board }) {
    const [currentHue, setCurrentHue] = useState(null);

    const updateCurrentHue = () => {
        let hue = 0;
        if(!currentHue){
            hue = Math.floor(Math.random() * 357);
        } else {
            hue = (currentHue + 15) % 357;
            if (hue === 0) hue = 1;
        }
        setCurrentHue(hue)
        return hue;
    }

    const gridStyle = {
        gridTemplateColumns: `repeat(${board[0].length}, 1fr)`,
        gridTemplateRows: `repeat(${board[0].length}, 1fr)`,
    }
    return (
        <section className="board-container mt-10" style={ gridStyle } aria-label="gameboard">
            { board.map((row) => {
                return row.map((letter) => {
                    return <Letter text={ letter } handleHue={ updateCurrentHue }  />
                })
            })}
        </section>
    )
}

export default Gameboard;