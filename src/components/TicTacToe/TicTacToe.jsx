import { useRef, useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../../assets/circle.png';
import cross_icon from '../../assets/cross.png';

const initialData = ['', '', '', '', '', '', '', '', ''];

// all winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const TicTacToe = () => {
  const [data, setData] = useState(initialData);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);

  const handleClick = index => {
    // if the box is already filled or the game is locked
    if (lock || data[index] !== '') return;

    const newData = [...data];
    newData[index] = count % 2 === 0 ? 'X' : 'O';
    setData(newData);
    setCount(count + 1);
    checkWin(newData);
  };

  const resetGame = () => {
    setData(initialData);
    setCount(0);
    setLock(false);
    titleRef.current.innerHTML = `Tic Tac Toe Game In <span>React</span>`;
  };

  const checkWin = newData => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;

      if (newData[a] && newData[a] === newData[b] && newData[a] === newData[c]) {
        won(newData[a]);
        return;
      }
    }
  };

  const won = winner => {
    setLock(true);
    titleRef.current.innerHTML = `Congratulations: "<img src="${
      winner === 'X' ? cross_icon : circle_icon
    }" alt="${winner}" />" Wins!`;
  };

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>
        Tic Tac Toe Game In <span>React</span>
      </h1>
      <div className="board">
        {data.map((value, index) => (
          <div key={index} className="boxes" onClick={() => handleClick(index)}>
            {value === 'X' && <img src={cross_icon} alt="cross" />}
            {value === 'O' && <img src={circle_icon} alt="circle" />}
          </div>
        ))}
      </div>
      <button className="reset" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
