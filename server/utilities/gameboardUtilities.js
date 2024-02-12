const letterScores = require("./letterScores");
const fetch = require('node-fetch');
require('dotenv').config();

const apiKey = process.env.API_KEY

async function getRandomWord(wordLength) {
	const url = new URL('http://api.wordnik.com/v4/words.json/randomWord')
	const params = {
		hasDictionaryDef: true,
		includePartOfSpeech: 'noun,adjective,verb',
		maxCorpusCount: -1,
		minDictionaryCount: 1,
		maxDictionaryCount: 1,
		minLength: wordLength,
		maxLength: wordLength,
		limit: 1,
		api_key: apiKey
	}
	url.search = new URLSearchParams(params);
	
	try {
		const response = await fetch(url)
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function getDefinition(word) {
	const url = new URL(`https://api.wordnik.com/v4/word.json/${word}/definitions`)
	const params = {
		limit: 200,
		includeRelated: false,
		sourceDictionaries: 'all',
		useCanonical: true,
		includeTags: false,
		api_key: apiKey
	}
	url.search = new URLSearchParams(params);
	try {
		const response = await fetch(url)
		const data = await response.json()
		const strWithoutHtml = data[0].text.replace(/<\/?[^>]+(>|$)/g, "")
		return strWithoutHtml
	} catch (error) {
		console.error('definition not found')
	}
	
}

function addScores(word){
	console.log(word)
	const letters = word.split('');
	return letters.map((letter) => {
		const score = letterScores[letter.toLowerCase()];
		return {text:letter, score}
	})
}

function randomIndex(maxNumber) {
    return Math.floor(Math.random() * maxNumber);
}

async function generateBoard(size, wordLength) {
	const word = await getRandomWord(wordLength);
	if (!word.word) return null;
	let board = createEmptyBoard(size);
	const letterArray = addScores(word.word)
	board = fillBoard(letterArray, board);
	const definition = await getDefinition(word.word);
	return { word: word.word, board, definition };
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
