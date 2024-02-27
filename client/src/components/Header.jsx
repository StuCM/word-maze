import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/Logo.png'

function Header({openModal, setShowScore}) {

	const openHelp = () => {
		setShowScore(false);
		openModal(true);
	}

	const openScore = () => {
		setShowScore(true);
		openModal(true);
	}

	return (
		<header className='flex justify-center items-center w-full p-3'>
			<button className='absolute left-0 text-lg sm:text-2xl mr-1' onClick={openScore}>
				<FontAwesomeIcon icon={faChartSimple} />
			</button>
			<img src={logo} alt="Logo" className="mr-2 h-8"/>
			<h1 className='text-3xl font-semibold sm:text-4xl'>Muddle</h1>
			<button className='absolute right-0 text-lg sm:text-2xl mr-1' onClick={openHelp}>
				<FontAwesomeIcon icon={faCircleQuestion} />
			</button>
		</header>
	);
}

export default Header;
