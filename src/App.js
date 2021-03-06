// Imports
import React from 'react';

import Square from './components/Square';

// Need to add some css
import './App.css';

/**
 * The base component of the application
 */
class App extends React.Component {
  constructor(props) {
    // Call super constructor
    super(props);

    // This is the state of the whole application
    this.state = {
      board: Array(9).fill(''),
      xTurn: false,
      finished: false
    };
  }

  /**
   * 
   * @param {number} n The index of the tile
   */
  onSquareClick(n) {
    const {xTurn} = this.state;
    let board = this.state.board.slice();

    if (!this.state.finished && board[n] === '') {
      board[n] = xTurn ? 'X' : 'O';

      let winner = this.getWinner(board);
      let draw = this.checkDraw(board);

      this.setState({ 
        board, 
        xTurn: !xTurn,
        finished: (winner || draw)
      });
    }
  }

  /**
   * 
   * @param {string[][]} board The current board state
   */
  getWinner(board) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] === board[b] && board[a] === board[c] && board[b] === board[c]) {
        return board[a];
      }
    }

    return null;
  }

  checkDraw(board) {
    return board.every(val => val !== '');
  }

  renderBoard() {
    let {board} = this.state;

    let htmlBoard = [];
    // width = 3
    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        let index = i * 3 + j;
        row.push(
          <Square 
            key={`${i} ${j}`}
            val={board[index]}
            onClick={() => this.onSquareClick(index)}
          />
        );
      }

      htmlBoard.push(<div key={`${i}`} className="row">{row}</div>);
    }

    return <div className="board">{htmlBoard}</div>;
  }

  render() {
    // Change to a no break space \u00A0 = &nbsp;
    let status = '\u00A0';
    if (this.state.finished) {
      let winner = this.getWinner(this.state.board);
      if (winner) {
        status = `${winner} has won!`;
      } else {
        status = "It's a draw!";
      }
    }

    return (
      <div className="app">
        <div className="game">
          {this.renderBoard()}
          <div className="status">{status}</div>
        </div>
      </div>
    );
  }
}

// Exports
export default App;
