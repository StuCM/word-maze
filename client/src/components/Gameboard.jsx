import Letter from "./Letter";

function Gameboard({ board }) {
    console.log(board)
    return (
        <section className="board-container">
            { board.map((row) => {
                return row.map((letter) => {
                    return <Letter text={ letter } />
                })
            })}
        </section>
    )
}

export default Gameboard;