import React, { Component } from "react";
import "./TicTacToe.css";

class TicTacToe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: Array(9).fill(null),
      currentPlayer: "X",
      winner: null,
    };
  }

  handleClick(index) {
    const { board, currentPlayer, winner } = this.state;
    if (!board[index] && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      this.setState(
        {
          board: newBoard,
          currentPlayer: currentPlayer === "X" ? "O" : "X",
        },
        () => {
          this.checkWinner();
        }
      );
    }
  }

  checkWinner() {
    const { board } = this.state;
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        this.setState({ winner: board[a] });
        return;
      }
    }

    if (!board.includes(null)) {
      this.setState({ winner: "Draw" });
    }
  }

  renderSquare(index) {
    const { board } = this.state;
    return (
      <button className="square" onClick={() => this.handleClick(index)}>
        {board[index]}
      </button>
    );
  }

  render() {
    const { currentPlayer, winner } = this.state;
    let status;
    if (winner) {
      status = winner === "Draw" ? "It's a draw!" : `Player ${winner} wins!`;
    } else {
      status = `Next player: ${currentPlayer}`;
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board">
          <div className="row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      </div>
    );
  }
}

export default TicTacToe;
