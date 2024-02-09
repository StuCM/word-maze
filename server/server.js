const express = require('express');
const cors = require('cors');
const generateBoard = require('./utilities/gameboardUtilities');
const app = express();

app.use(cors());

app.get('/api/getGameboard', async (req, res) => {
    const wordSize = parseInt(req.query.wordSize);
    const boardSize = parseInt(req.query.boardSize);

    if(isNaN(wordSize) || isNaN(boardSize)) {
        res.status(400).send('Invalid parameters');
        return;
    }

    const gameObject = await generateBoard(boardSize, wordSize);

    if(gameObject) {
        res.json(gameObject);
    } else {
        res.status(404).json({ message: 'Game board not found' });
    }
})

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});