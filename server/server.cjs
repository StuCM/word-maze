const express = require('express');
const cors = require('cors');
import generateBoard from './utilities/gameboardUtilities.mjs';
const app = express();

app.use(cors());
require('dotenv').config()

const PORT = process.env.PORT;
const host = '0.0.0.0';

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

app.listen(PORT, host, async () => {
    console.log(`Server listening on port ${host}:${PORT}`);
    if(!cache.gameObject){
        const boardSize = 6
        const wordSize = 6
        cache.gameObject = await generateBoard(boardSize, wordSize);
    }
});