const letterScores = require("./letterScores");
const axios = require('axios')
require('dotenv').config();

const apiKey = process.env.API_KEY

async function getRandomWord(wordLength) {
	const url = new URL('http://api.wordnik.com/v4/words.json/randomWord')
	const params = {
		hasDictionaryDef: true,
		includePartOfSpeech: 'noun,adjective,verb',
		excludePartOfSpeech: 'adverb,interjection,pronoun,preposition,abbreviation,affix,article,auxiliary-verb,conjunction,definite-article,family-name,given-name,idiom,imperative,noun-plural,noun-posessive,past-participle,phrasal-prefix,proper-noun,proper-noun-plural,proper-noun-posessive,suffix,verb-intransitive,verb-transitive',
		maxCorpusCount: -1,
		minDictionaryCount: 5,
		maxDictionaryCount: -1,
		minLength: wordLength,
		maxLength: wordLength,
		limit: 1,
		api_key: apiKey
	}
	url.search = new URLSearchParams(params);
	
	try {
		const response = await axios.get(url.toString())
		return response.data;
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function getDefinition(word) {
	word = word.toLowerCase();
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
		const response = await axios.get(url.toString())
		const strWithoutHtml = response.data[0].text.replace(/<\/?[^>]+(>|$)/g, "")
		return strWithoutHtml
	} catch (error) {
		console.error('definition not found')
	}
	
}

function addScores(word){
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
		let letterCount = {
			0: 0,
			1: 0,
			2: 0,
			3: 0,
			4: 0,
			5: 0
		}
		row.forEach((_, index) => {
			if (row[index] !== '') return;
			let randomIndex = Math.floor(Math.random() * letterArray.length);
			//controls amount of each letter per line
			while(letterCount[randomIndex] >= 2){
				randomIndex = Math.floor(Math.random() * letterArray.length);
			}
			row[index] = letterArray[randomIndex];
			letterCount[randomIndex] += 1
		});
	});
	return board;
}

module.exports = generateBoard;
