import { useState } from 'react';

function HighScores() {
	const [showDailyScores, setShowDailyScores] = useState(true);

	let storedScores = window.localStorage.getItem('topScores');
	let dailyTopScores = window.localStorage.getItem('dailyTopScores');
	storedScores = storedScores ? JSON.parse(storedScores) : [];
	dailyTopScores = dailyTopScores ? JSON.parse(dailyTopScores) : [];

	const scoresToDisplay = showDailyScores ? dailyTopScores : storedScores;
	const emptyRows = Math.max(0, 5 - storedScores.length);

	const capitaliseWord = (word) => {
		return word.charAt(0).toUpperCase() + word.slice(1);
	};

	return (
		<section className='flex flex-col justify-center items-center bg-primary border-4 rounded-xl border-primary'>
			<div className='flex justify-around items-center w-full font-semibold'>
				<button
					className={`w-full font-semibold text-textPrim ${!showDailyScores ? '' : 'bg-primaryDarker'}`}
					onClick={() => setShowDailyScores(true)}
				>
					Daily High Scores
				</button>
				<button
					className={`w-full font-semibold text-textPrim ${!showDailyScores ? 'bg-primaryDarker' : ''}`}
					onClick={() => setShowDailyScores(false)}
				>
					Practice High Scores
				</button>
			</div>
			<table id='scores' className='flex-3 rounded-lg overflow-hidden w-full'>
				<tbody>
					<tr className='bg-primary text-letterBg border-b-2 border-primary'>
						<th className='py-1.5 px-2 text-xl text-center'>Word</th>
						<th className='py-1.5 px-2.5 text-xl'>Score</th>
					</tr>
					{scoresToDisplay.map((item, index) => (
						<tr className={'text-textSec font-bold bg-letterBg border-b border-primary'} key={index}>
							<td className=' text-sm text-center'>{capitaliseWord(item.word)}</td>
							<td className='text-lg py-0.5 text-center align-middle'>{item.score}</td>
						</tr>
					))}
					{Array(emptyRows)
						.fill()
						.map((_, index) => (
							<tr className={'text-textSec font-bold bg-letterBg'} key={index + storedScores.length}>
								<td className='text-center'>&nbsp;</td>
								<td className='text-center align-middle'>&nbsp;</td>
							</tr>
						))}
				</tbody>
			</table>
		</section>
	);
}

export default HighScores;
