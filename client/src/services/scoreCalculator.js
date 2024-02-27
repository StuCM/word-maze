export function calculateScoreMultiplier(board){
    const boardTotal = board.flat().reduce((acc, letter) => {
        return acc += parseInt(letter.score);
    }, 0);
    //100 is used as a constant to match scores between boards
    console.log("boardTotal", 100/boardTotal)
    return (100 / boardTotal).toFixed(2);
}