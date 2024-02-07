import { useState } from 'react';

function ScoreUI({ score, attempts, children }) {

	return (
		<section>
			<div className='flex w-full justify-center'>
				<div className='text-center m-4 mr-14'>
					<p className='text-2xl'>Attempts</p>
					<p className='text-3xl mt-2'>{attempts}</p>
				</div>
				<div className='text-center m-4'>
					<p className='text-2xl'>Score</p>
					<p className='text-3xl mt-2'>{score}</p>
				</div>
			</div>
			{children}
		</section>
	);
}

export default ScoreUI;
