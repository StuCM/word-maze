import Letter from "./Letter";

function Gameboard({ board }) {
    const gridStyle = {
        gridTemplateColumns: `repeat(${board[0].length}, 1fr)`,
        gridTemplateRows: `repeat(${board[0].length}, 1fr)`,
    }
    return (
        <section className="board-container mt-10" style={ gridStyle }>
            { board.map((row) => {
                return row.map((letter) => {
                    return <Letter text={ letter } />
                })
            })}
        </section>
    )
}

export default Gameboard;