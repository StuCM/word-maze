import './App.css';
import Header from './components/Header';
import Gameboard from './components/Gameboard';

function App() {
  const board = [
    ['w','o','d','r','o','w'],
    ['o','s','d','d','w','s'],
    ['s','o','w','r','o','r'],
    ['r','s','d','o','w','s'],
    ['o','w','s','s','d','r'],
    ['w','d','s','o','r','d']
]
  const board2 = [
    ['w','o','d','r','o'],
    ['o','s','d','d','w'],
    ['s','o','w','r','o'],
    ['r','s','d','o','w'],
    ['o','w','s','s','d'],
]
const word = 'WORDS'
  return (
    <main className='flex flex-col h-full'>

      <Header />
      <div className='mt-10'>
      <p className='text-lg'>Todays Word:</p>
      <p className='text-3xl mt-1'>{ word }</p>
      </div>
      <Gameboard board={ board } />
      <div></div>
    </main>
  )
}

export default App
