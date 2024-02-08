function ScoreContent({ score, dailyScore }) {
	const emptyRows = 3 - dailyScore.length;

	return (
		<section>
			<div id='scores' className='flex justify-center items-center p-3 bg-primary'>
				<div id='topScore' className='flex flex-1 flex-col mr-5 mt-2 items-center justify-center h-full'>
					<div className='bg-letterBg rounded-xl py-1 px-5 innerShadow'>
						<h3 className='text-2xl font-bold text-textSec'>Top Score</h3>
					</div>
					<p className='text-4xl font-bold m-2 text-letterBg'>{score}</p>
				</div>
				<table id='attempts' className='flex-3 mr-1 rounded-lg overflow-hidden'>
					<tbody>
						<tr className='bg-letterBg text-textSec innerShadow'>
							<th className='py-1.5 px-3 text-xs text-center'>Attempt</th>
							<th className='py-1.5 px-3 text-xs'>Score</th>
						</tr>
						{dailyScore.map((item, index) => (
							<tr
								className={`text-textSec font-bold ${index % 2 !== 0 ? 'bg-letterBg' : 'bg-seconday'}`}
								key={index}
							>
								<td className=' text-sm text-center'>0{item.attempt}</td>
								<td className='text-lg py-0.5 text-center align-middle'>{item.score}</td>
							</tr>
						))}
						{Array(emptyRows)
							.fill()
							.map((_, index) => (
								<tr
									className={`text-textSec font-bold ${(index + dailyScore.length) % 2 !== 0 ? 'bg-letterBg' : 'bg-seconday'}`}
									key={index + dailyScore.length}
								>
									<td className='text-center'>&nbsp;</td>
									<td className='text-center align-middle'>&nbsp;</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</section>
	);
}

export default ScoreContent;
