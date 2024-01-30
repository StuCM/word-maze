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
  return (
    <main className='flex flex-col justify-between h-full'>
      <Header />
      <Gameboard board={ board } />
      <div></div>
    </main>
  )
}

export default App
