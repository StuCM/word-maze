const express = require('express');
const cors = require('cors');
const generateBoard = require('./utilities/gameboardUtilities');
const app = express();

app.use(cors());

const cache = {
    daily: null,
    gameObject: null
}

app.get('/api/getGameboard', async (req, res) => {
    const wordSize = parseInt(req.query.wordSize);
    const boardSize = parseInt(req.query.boardSize);

    if(isNaN(wordSize) || isNaN(boardSize)) {
        res.status(400).send('Invalid parameters');
        return;
    }

    if(!cache.gameObject){
        cache.gameObject = await generateBoard(boardSize, wordSize);
    }

    const gameObjectToSend = cache.gameObject;

    res.json(gameObjectToSend);

    cache.gameObject = await generateBoard(boardSize, wordSize);
})

app.listen(3000, async () => {
    console.log('Server listening on port 3000');
    if(!cache.gameObject){
        const boardSize = 6
        const wordSize = 6
        cache.gameObject = await generateBoard(boardSize, wordSize);
        console.log("board made")
    }
});