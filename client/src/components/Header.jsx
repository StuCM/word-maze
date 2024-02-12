import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChartSimple } from '@fortawesome/free-solid-svg-icons';

function Header({openModal}) {
	const openMenu = () => {
		console.log('menu clicked!');
	};

	return (
		<header className='flex justify-center items-center w-full p-3'>
			<button className='absolute left-0 text-lg sm:text-2xl mr-1' onClick={() => openModal(true)}>
				<FontAwesomeIcon icon={faChartSimple} />
			</button>
			<h1 className='text-3xl font-semibold sm:text-4xl'>Word-Maze</h1>
			<button className='absolute right-0 text-lg sm:text-2xl mr-1' onClick={openMenu}>
				<FontAwesomeIcon icon={faBars} />
			</button>
		</header>
	);
}

export default Header;
