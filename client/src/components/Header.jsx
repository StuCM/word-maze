import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/Logo.png'
import { GlobalState } from '../App';
import { useContext } from 'react';

function Header() {
	const { dispatch } = useContext(GlobalState)

	const openModal = (content) => {
		dispatch({ type: 'OPEN_MODAL', payload: content})
	}

	return (
		<header className='flex justify-center items-center w-full p-3'>
			<button className='absolute left-0 text-lg sm:text-2xl mr-1' onClick={() => openModal('score')}>
				<FontAwesomeIcon icon={faChartSimple} />
			</button>
			<img src={logo} alt="Logo" className="mr-2 h-8"/>
			<h1 className='text-3xl font-semibold sm:text-4xl'>Muddle</h1>
			<button className='absolute right-0 text-lg sm:text-2xl mr-1' onClick={() => openModal('menu')}>
				<FontAwesomeIcon icon={faBars} />
			</button>
		</header>
	);
}

export default Header;
