import logo from '../assets/Logo.png'

function MuddleTitle({ color, showLogo }) {
    const colorClass = (() => {
        if(color === 'primary'){
            return 'text-textPrim'
        } else {
            return 'text-textSec'
        }
    })()
	return (
		<>
			{showLogo && <img src={logo} alt='Logo' className='mr-2 h-8' />}
			<h1 className={`text-3xl font-semibold sm:text-4xl ${colorClass}`}>Muddle</h1>
		</>
	);
}

export default MuddleTitle;
