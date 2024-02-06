import { useState } from 'react';
import './App.css';

const BingoArrayModel = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
]

const Text = "B I N G O"
const TextSplit = Text.split(" ")
const TextArray = []
TextSplit.map(text => {
  TextArray.push({
    text: text,
    active: false
  })
  return TextArray
})

function App() {
  const [bingoArray, setBingoArray] = useState(BingoArrayModel);
  let [count, setCount] = useState(1);
  let [score, setScore] = useState(0);
  const [bingoText, setBingoText] = useState(TextArray);
  const [start, setStart] = useState(false);
  const [undo, setUndo] = useState(false);
  const BoxClassName = document.querySelectorAll('#box')

  // ===== click event handlers =======
  const HandleSetNumber = (row, col, e) => {
    if (count < 26 && start === false && bingoArray[row][col] === 0) {
      bingoArray[row][col] = count;
      setBingoArray([...bingoArray]);
      setCount(count + 1)
    }

    if (start && count === 26) {
      setUndo(false)
      e.target.classList.add("active");
    }

    if (undo && count === 26) {
      e.target.classList.remove("active");
    }
  }

  const StartTheGame = () => {
    if (count === 26) {
      setStart(true);
    }
  }

  const BingoTextActive = (data) => {
    if (count === 26) {
      data.active = true
      setBingoText([...bingoText])
    }
  }

  // ======= Reset =========== 
  const HandleReset = () => {
    const newBingo = [];
    for (var i = 0; i < 5; i++) {
      newBingo[i] = [];
      for (var j = 0; j < 5; j++) {
        newBingo[i][j] = 0
      }
    }
    setBingoArray(newBingo);
    TextArray.map(data=>{
       return data.active = false
    })
    setBingoText(TextArray);
    setCount(1);
    setStart(false);
    BoxClassName.forEach(element => {
      element.classList.remove('active');
    });
  }

  // =========== Undo ===========
  const handleUndo = () => {
    if (count === 26) {
      setUndo(true);
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <h2>BINGO GAME</h2>
          <table>
            <tbody>
              {
                [...Array(5)].map((row, rindex) => (
                  <tr key={rindex}>
                    {
                      [...Array(5)].map((col, cindex) => (
                        <td key={cindex} >
                          <div className='box' id='box' onClick={(e) => HandleSetNumber(rindex, cindex, e)}>
                            {
                              bingoArray[rindex][cindex] === 0 ? "" : bingoArray[rindex][cindex]
                            }
                          </div>
                        </td>
                      ))
                    }
                  </tr>
                ))
              }
            </tbody>
          </table>
          <div className="bingo">
            {bingoText.map((data, index) => (
              <div className={`Bingo__Text ${data?.active === true ? "active" : ""}`}
                key={index}
                onClick={() => BingoTextActive(data)}
              >{data.text}</div>
            ))}
          </div>
          <div className='controls'>
            <button className="btn" onClick={StartTheGame}>Start</button>
            <button className="btn" onClick={HandleReset}>Reset</button>
            <button className="btn" onClick={handleUndo}>Undo</button>
          </div>
          <div className="score">
            <h2>SCORE : {score}</h2>
            <button className="btn" onClick={() => setScore(score + 1)}>Add Score</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
