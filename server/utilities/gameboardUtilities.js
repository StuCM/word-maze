const letterScores = require("./letterScores");

async function getRandomWord(wordLength) {
	try {
		const apiKey = 'fgyd5zmp0gea651pdyd3djbmhx5y63meadu6096uxbt7jzbvh';
		const response = await fetch(
			`http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=${wordLength}&maxLength=${wordLength}&limit=1&api_key=${apiKey}`
		);
		const data = await response.json();
		console.log(data);
		return data[0];
	} catch (error) {
		console.error(error);
		return null;
	}
}

function addScores(word){
	const letters = word.split('');
	return letters.map((letter) => {
		const score = letterScores[letter.toLowerCase()];
		return {text:letter, score}
	})
}

async function generateBoard(size, wordLength) {
	const word = await getRandomWord(wordLength);
	if (!word) return null;
	let board = createEmptyBoard(size);
	const letterArray = addScores(word.word)
	board = fillBoard(letterArray, board);
	return board;
}

function createEmptyBoard(size) {
	const board = [];
	for (let i = 0; i < size; i++) {
		board.push([]);
		for (let j = 0; j < size; j++) {
			board[i].push('');
		}
	}
	return board;
}

function createWordPath(letterArray, board) {
	const randomIndex = (maxNumber) => {
		return Math.floor(Math.random() * maxNumber);
	};
	let nextDirection = 'vertical';
	let row = randomIndex(letterArray.length);
	let column = randomIndex(letterArray.length);
	board[row][column] = letterArray[0];
	letterArray.slice(1).forEach((letter) => {
		if (nextDirection === 'vertical') {
			do {
				row = randomIndex(board.length);
			} while (board[row][column] !== '');
			board[row][column] = letter;
			nextDirection = 'horizontal';
		} else {
			do {
				column = randomIndex(board.length);
			} while (board[row][column] !== '');
			board[row][column] = letter;
			nextDirection = 'vertical';
		}
	});
	return board;
}

function fillBoard(letterArray, board) {
	board = createWordPath(letterArray, board);
	board.forEach((row) => {
		row.forEach((_, index) => {
			if (row[index] !== '') return;
			const randomIndex = Math.floor(Math.random() * letterArray.length);
			row[index] = letterArray[randomIndex];
		});
	});
	return board;
}

module.exports = generateBoard;
