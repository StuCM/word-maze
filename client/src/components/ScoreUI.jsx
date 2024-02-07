import { useState } from 'react';

function ScoreUI({ score, attempts, children }) {

	return (
		<section className='flex flex-col justify-center w-full items-center mt-4'>
			<div className='flex items-center bg-seconday justify-around w-9/12 rounded-lg shadow-lg'>
				<div className='text-center m-2.5'>
					<p className='text-xl font-semibold'>Attempts</p>
					<p className='text-3xl mt-1 font-bold'>{attempts}</p>
				</div>
				<div className='text-center mx-6 my-2.5'>
					<p className='text-xl font-semibold'>Score</p>
					<p className='text-3xl mt-1 font-bold'>{score}</p>
				</div>
			</div>
			{children}
		</section>
	);
}

export default ScoreUI;
