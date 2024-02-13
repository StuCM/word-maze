import example from '../assets/Example.png'

function HowToContent() {
	return (
		<section className='bg-textPrim rounded-2xl border-4 border-primary p-4 howToStyle'>
			<h2 className='text-2xl font-bold text-textSec'>How to Play</h2>
			<ul className='text-left text-md my-4 ml-4 text-textSec'>
				<li>Find the word in 3 tries.</li>
				<li>Score points by the number of letters in between your selections</li>
				<li>You can only pick a letter in the same row or column</li>
				<li>
					You must alternate your direction. If your pick was in the same column it must be in the same row
					next
				</li>
			</ul>

			<h3 className='text-xl font-bold text-textSec'>Examples</h3>
			<ul className='text-left text-md my-4 ml-4 text-textSec'>
				<li>In the below example A was picked first, then L in the same row</li>
				<li>The direction changed and M was picked and so on. The next choice will be from the third row</li>
				<li>All the letters that have been crossed out will be added together for the score</li>
			</ul>

			<img src={example} alt='grid of letters' />
		</section>
	);
}

export default HowToContent;
