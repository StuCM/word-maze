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
  return (
    <>
      <Header />
      <Gameboard board={ board } />
    </>
  )
}

export default App
