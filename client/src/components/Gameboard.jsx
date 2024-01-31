import Letter from "./Letter";
import { useState } from "react";

function Gameboard({ board }) {
    const [currentHue, setCurrentHue] = useState(null);

    const gridStyle = {
        gridTemplateColumns: `repeat(${board[0].length}, 1fr)`,
        gridTemplateRows: `repeat(${board[0].length}, 1fr)`,
    }
    return (
        <section className="board-container mt-10" style={ gridStyle } aria-label="gameboard">
            { board.map((row) => {
                return row.map((letter) => {
                    return <Letter text={ letter } currentHue={ currentHue } setCurrentHue={ setCurrentHue }  />
                })
            })}
        </section>
    )
}

export default Gameboard;