function HighScores() {
	let storedScores = window.localStorage.getItem('topScores');
	storedScores = storedScores ? JSON.parse(storedScores) : [];
    const emptyRows = 10 - storedScores.length;

    const capitaliseWord = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

	return (
		<section className='flex justify-center items-center min-h-60 bg-primary border-4 rounded-2xl border-primary'>
			<table id='scores' className='flex-3 mr-1 rounded-lg overflow-hidden w-full'>
				<tbody>
					<tr className='bg-letterBg text-textSec innerShadow border-b-2 border-primary'>
						<th className='py-1.5 px-2 text-xl text-center'>Word</th>
						<th className='py-1.5 px-2.5 text-xl'>Score</th>
					</tr>
					{storedScores.map((item, index) => (
						<tr
							className={'text-textSec font-bold bg-letterBg border-b border-primary'}
							key={index}
						>
							<td className=' text-sm text-center'>{capitaliseWord(item.word)}</td>
							<td className='text-lg py-0.5 text-center align-middle'>{item.score}</td>
						</tr>
					))}
					{Array(emptyRows)
						.fill()
						.map((_, index) => (
							<tr
								className={'text-textSec font-bold bg-letterBg'}
								key={index + storedScores.length}
							>
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
