const express = require('express');
const cors = require('cors');
const generateBoard = require('./utilities/gameboardUtilities');
const app = express();
const fs = require('fs');

app.use(cors());
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const host = '0.0.0.0';

const cache = {
	daily: { board: null, time: null },
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
		const currentTime = new Date();
		const currentDay = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());

		// If the timestamp is more than a day old, generate a new game board
		if (!cache.daily.time || currentDay > cache.daily.time) {
			cache.daily.board = await generateBoard(boardSize, wordSize);
			cache.daily.time = currentDay;
			fs.writeFileSync('dailyBoard.json', JSON.stringify(cache.daily));
		}

		res.json(cache.daily.board);
	} catch (error) {
		console.error('No gameboard available', error);
	}
});

const boardSize = 6;
const wordSize = 6;

app.listen(PORT, host, async () => {
	console.log(`Server listening on port ${host}:${PORT}`);
	if (!cache.gameObject) {
		cache.gameObject = await generateBoard(boardSize, wordSize);
	}
	if (!cache.daily.board) {
		try {
			const data = fs.readFileSync('dailyBoard.json', 'utf8');
			cache.daily = JSON.parse(data);
			console.log(cache.daily)
		} catch (err) {
			console.error(`Error reading file from disk: ${err}`);
			cache.daily.board = await generateBoard(boardSize, wordSize);
			const currentTime = newDate();
			cache.daily.time = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());
			fs.writeFileSync('dailyBoard.json', JSON.stringify(cache.daily));
		}
	}
});
