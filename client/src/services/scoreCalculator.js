export function calculateScoreMultiplier(board){
    const boardTotal = board.reduce((acc, row) => {
        row.reduce((acc, letter) => {
            acc += letter.score
            return acc
        }, 0)
        return acc
    })
    //100 is used as a constant to match scores between boards
    return 100 / boardTotal

}