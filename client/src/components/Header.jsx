import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Header() {
	const openMenu = () => {
		console.log('menu clicked!');
	};

	return (
		<header className='flex justify-between w-full'>
			<div className='w-1/3'></div>
			<div className='w-1/3 flex justify-center'>
				<h1 className='m-auto'>Word-Maze</h1>
			</div>
			<div className='w-1/3 flex justify-end'>
				<button className='ml-auto' onClick={openMenu}>
					<FontAwesomeIcon icon={faBars} />
				</button>
			</div>
		</header>
	);
}

export default Header;
