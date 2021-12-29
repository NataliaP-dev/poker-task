import React, { useState } from 'react';
import { TextFileReader } from './components/TextFileReader';
import { compareHands } from './helpers/pokerCombination';

import './App.css';

function App() {
  const [player1Win, setPlayer1Win] = useState(0);
  const [player2Win, setPlayer2Win] = useState(0);

  const onCompleteReader = (text: string) => {
    const res = text.split('\n');
    let win1 = 0;
    let win2 = 0;
    res.forEach((hands) => {
      const hand1 = hands.slice(0, 14);
      const hand2 = hands.slice(15);
      const result = compareHands(hand1, hand2);
      if (result > 0) {
        win1++;
      } else if (result < 0) {
        win2++;
      }
    });
    setPlayer1Win(win1);
    setPlayer2Win(win2);
  };

  return (
    <div className="App">
      <TextFileReader onComplete={onCompleteReader}/>
      <div className="Results">
        <div>Results:</div>
        <div>Player 1: {player1Win} hands</div>
        <div>Player 2: {player2Win} hands</div>
      </div>
    </div>
  );
}

export default App;
