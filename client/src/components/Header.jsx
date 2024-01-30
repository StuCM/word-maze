import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Header() {
	const openMenu = () => {
		console.log('menu clicked!');
	};

	return (
		<header className='relative flex justify-between w-full'>
			<div className='w-full p-3 flex justify-center'>
                <h1 className='m-auto text-3xl sm:text-4xl'>Word-Maze</h1>
			</div>
			<div className='absolute top-3 right-0 flex justify-end'>
				<button className='ml-auto text-sm sm:text' onClick={openMenu}>
					<FontAwesomeIcon icon={faBars} />
				</button>
			</div>
		</header>
	);
}

export default Header;
