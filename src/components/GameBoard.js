import React from "react";
import Square from "./Square";

const GameBoard = props => {
  const renderSquare = i => {
    return (
      <Square
        key={i}
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
        isWinner={props.isWinner.includes(i)}
      />
    );
  };

  const renderAllSquare = () => {
    let squares = props.squares;
    return (squares = squares.map((square, index) => {
      return renderSquare(index);
    }));
  };
  return <div className="game-board">{renderAllSquare()}</div>;
};

export default GameBoard;
