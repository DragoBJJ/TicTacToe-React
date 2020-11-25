import React from "react";

const Square = props => {
  const activeClass = props.isWinner ? "active" : null;

  return (
    <>
      <button className={`square ${activeClass}`} onClick={props.onClick}>
        {props.value}
      </button>
    </>
  );
};

export default Square;
