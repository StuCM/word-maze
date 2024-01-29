const express = require('express');
const generateBoard = require('./utilities/gameboardUtilities');
const app = express();

app.get('/api/getGameboard', async (req, res) => {
    const wordSize = parseInt(req.query.wordSize);
    const boardSize = parseInt(req.query.boardSize);

    if(isNaN(wordSize) || isNaN(boardSize)) {
        res.status(400).send('Invalid parameters');
        return;
    }

    const gameboard = await generateBoard(boardSize, wordSize);

    if(gameboard) {
        res.json(gameboard);
    } else {
        res.status(404).json({ message: 'Game board not found' });
    }
})

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});