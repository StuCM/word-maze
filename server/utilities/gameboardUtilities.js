async function getRandomWord(letters) {
    try {
        // const response = await fetch(`http://localhost:3000/words`)
        // const data = await response.json();
    
        // const words = data[letters]
        // const randomWord = words[Math.floor(Math.random() * words.length)]
        return 'hello' 
    } catch (error) {
        console.error(error)
        return null;
    }
}

async function generateBoard(size, wordLength) {
	const word = await getRandomWord(wordLength);
	if (!word) return null;
	let board = createEmptyBoard(size);
	board = fillBoard(word, board);
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

function createWordPath(letters, board) {
	const randomIndex = (maxNumber) => {
		return Math.floor(Math.random() * maxNumber);
	};
	let nextDirection = 'vertical';
	let row = randomIndex(letters.length);
	let column = randomIndex(letters.length);
	board[row][column] = letters[0];
	letters.slice(1).forEach((letter) => {
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

function fillBoard(word, board) {
	const letters = word.split('');
	board = createWordPath(letters, board);
	board.forEach((row) => {
		row.forEach((_, index) => {
			if (row[index] !== '') return;
			const randomIndex = Math.floor(Math.random() * letters.length);
			row[index] = letters[randomIndex];
		});
	});
	return board;
}

module.exports = generateBoard;
