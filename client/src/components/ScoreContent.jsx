import { useContext, useEffect, useState } from "react";
import { GlobalState } from "../App";

function ScoreContent({ children }) {

	const {gameState} = useContext(GlobalState)

	const emptyRows = 3 - gameState.dailyScore.length;
    const word = gameState.word.charAt(0).toUpperCase() + gameState.word.slice(1).toLowerCase();

	const [topScore, setTopScore] = useState(0);

	

	useEffect(() => {
		if(gameState.dailyScore.length > 0){
			setTopScore(Math.max(...gameState.dailyScore.map(obj => obj.score)));
		}
		else { setTopScore(0)}
		
	},[gameState.dailyScore])

	return (
		<section className='bg-textPrim border-4 rounded-2xl border-primary'>
			<div id='scores' className='flex justify-center items-center p-3 bg-primary'>
				<div id='topScore' className='flex flex-1 flex-col mr-5 mt-2 items-center justify-center h-full'>
					<div className='bg-letterBg rounded-xl py-1 px-5 innerShadow'>
						<h3 className='text-2xl font-bold text-textSec'>Top Score</h3>
					</div>
					<p className='text-4xl font-bold m-2 text-letterBg' aria-label="topScore">{topScore}</p>
				</div>
				<table id='attempts' className='flex-3 mr-1 rounded-lg overflow-hidden'>
					<tbody>
						<tr className='bg-letterBg text-textSec innerShadow'>
							<th className='py-1.5 px-2 text-sm text-center'>Attempt</th>
							<th className='py-1.5 px-2.5 text-sm'>Score</th>
						</tr>
						{gameState.dailyScore.map((item, index) => (
							<tr
								className={`text-textSec font-bold ${index % 2 !== 0 ? 'bg-letterBg' : 'bg-seconday'}`}
								key={index}
								aria-label="dailyScore"
							>
								<td className=' text-sm text-center'>0{item.attempt}</td>
								<td className='text-lg py-0.5 text-center align-middle'>{item.score}</td>
							</tr>
						))}
						{Array(emptyRows)
							.fill()
							.map((_, index) => (
								<tr
									className={`text-textSec font-bold ${(index + gameState.dailyScore.length) % 2 !== 0 ? 'bg-letterBg' : 'bg-seconday'}`}
									key={index + gameState.dailyScore.length}
								>
									<td className='text-center'>&nbsp;</td>
									<td className='text-center align-middle'>&nbsp;</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
			<div className='p-3 font-bold text-lg mb-2 text-textSec'>
				{children}
				<p className='text-2xl mb-2'>{word}</p>
				<p className='font-semibold text-sm italic'>{gameState.definition}</p>
			</div>
		</section>
	);
}

export default ScoreContent;
