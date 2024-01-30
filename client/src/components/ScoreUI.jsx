import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';

function ScoreUI({ score }) {
	const [attempts, setAttempts] = useState(3);
	score = 325;

    const reduceAttempts = () => {
        return attempts > 0 ? setAttempts(attempts - 1) : 0
    }

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
            <button onClick={ reduceAttempts }>
                <FontAwesomeIcon icon={ faRotateLeft }className='text-3xl'/>
            </button>
		</section>
	);
}

export default ScoreUI;