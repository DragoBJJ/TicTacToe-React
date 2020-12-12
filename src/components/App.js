import react from "react";
import GameBoard from "./GameBoard";
import "../style/App.css";

class App extends react.Component {
  state = {
    history: [{ squares: Array(9).fill(null) }],
    xIsNext: true,
    nextStep: 0
  };

  handleStatus = i => {
    let { history, nextStep } = this.state;
    history = history.slice(0, nextStep + 1);

    const current = history[nextStep];
    const squares = current.squares.slice();
    if (squares[i] || this.checkWinner(squares)) return;
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat({ squares }),
      xIsNext: !this.state.xIsNext,
      nextStep: history.length
    });
  };

  changeStep = index => {
    this.setState({
      nextStep: index,
      xIsNext: index % 2 === 0
    });
  };

  checkWinner = squares => {
    const winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (const index in winCombinations) {
      const [a, b, c] = winCombinations[index];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line: winCombinations[index] };
      }
    }

    return null;
  };

  render() {
    const { history, nextStep } = this.state;
    const current = history[nextStep];
    const result = this.checkWinner(current.squares);
    let nextPlayer;
    if (result) {
      nextPlayer = `Winner is ${result.winner}`;
    } else if (!current.squares.includes(null)) {
      nextPlayer = `Remis`;
    } else {
      nextPlayer = `Next player is:${this.state.xIsNext ? "X" : "O"}`;
    }

    const historyofMovements = history.map((step, index) => {
      const activeClass = index === this.state.nextStep ? "active" : "";
      const move = index ? `step #${index}` : "start game";
      return (
        <li className="game-info__li" key={index}>
          <button
            className={activeClass}
            onClick={() => this.changeStep(index)}
          >
            {move}
          </button>
        </li>
      );
    });

    return (
      <div className="game">
        <GameBoard
          squares={current.squares}
          onClick={i => this.handleStatus(i)}
          isWinner={result ? result.line : []}
        />
        <div className="game-info">
          <div className="status">{nextPlayer}</div>
          <ul>{historyofMovements}</ul>
        </div>
      </div>
    );
  }
}

export default App;
