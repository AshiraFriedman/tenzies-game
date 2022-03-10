import { useState, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  function allNewDice() {
    return Array(10)
      .fill()
      .map(() => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      }));
  }

  const [dice, setDice] = useState(allNewDice());
  const [won, setWon] = useState(false);

  useEffect(() => {
    const sameNum = dice[0].value;
    if (dice.every((die) => die.isHeld && die.value === sameNum)) {
      console.log("you won");
      setWon(true);
    }
  }, [dice]);

  function rollDice() {
    setDice((prevData) =>
      prevData.map((die) =>
        die.isHeld
          ? die
          : {
              value: Math.ceil(Math.random() * 6),
              isHeld: false,
              id: nanoid(),
            }
      )
    );
  }

  function holdDice(id) {
    setDice((prevData) =>
      prevData.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  function newGame() {
    setDice(allNewDice);
    setWon(false);
  }

  const diceElements = dice.map((obj) => (
    <Die
      value={obj.value}
      isHeld={obj.isHeld}
      holdDice={() => holdDice(obj.id)}
      key={obj.id}
    />
  ));

  return (
    <main>
      <h1>Tenzies</h1>
      <h2>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </h2>
      <div className="dice-container">
        {diceElements}

        {won && <Confetti />}
      </div>
      <button
        className="btn btn-warning btn-roll"
        onClick={won ? newGame : rollDice}
      >
        {won ? "New Game" : "Roll Dice"}
      </button>
    </main>
  );
}
