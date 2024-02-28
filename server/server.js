const express = require('express');
const cors = require('cors');
const generateBoard = require('./utilities/gameboardUtilities');
const app = express();
const cron = require('node-cron');
const fs = require('fs');

app.use(cors());
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const host = '0.0.0.0';

const cache = {
	daily: null,
	gameObject: null,
};

app.get('/api/getGameboard', async (req, res) => {
	const wordSize = parseInt(req.query.wordSize);
	const boardSize = parseInt(req.query.boardSize);

	if (isNaN(wordSize) || isNaN(boardSize)) {
		res.status(400).send('Invalid parameters');
		return;
	}

	if (!cache.gameObject) {
		cache.gameObject = await generateBoard(boardSize, wordSize);
	}

	const gameObjectToSend = cache.gameObject;

	res.json(gameObjectToSend);

	cache.gameObject = await generateBoard(boardSize, wordSize);
});

app.get('/api/getDaily', async (req, res) => {
	try {
		res.json(cache.daily);
	} catch (error) {
        console.error("No gameboard available", error)
    }
});

const boardSize = 6;
const wordSize = 6;

cron.schedule('0 0 * * *', async () => {
	cache.daily = await generateBoard(boardSize, wordSize);
	fs.writeFileSync('dailyBoard.json', JSON.stringify(cache.daily));
});

app.listen(PORT, host, async () => {
	console.log(`Server listening on port ${host}:${PORT}`);
	if (!cache.gameObject) {
		cache.gameObject = await generateBoard(boardSize, wordSize);
	}
	if (!cache.daily) {
		try {
			const data = fs.readFileSync('dailyBoard.json', 'utf8');
			cache.daily = JSON.parse(data);
		} catch (err) {
			console.error(`Error reading file from disk: ${err}`);
			cache.daily = await generateBoard(boardSize, wordSize);
			fs.writeFileSync('dailyBoard.json', JSON.stringify(cache.daily));
		}
	}
});
