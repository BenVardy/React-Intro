// Imports
import React from 'react';

import Square from './components/Square';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      board: Array(9).fill(''),
      xTurn: false,
      finished: false
    };

    this.onSquareClick = this.onSquareClick.bind(this);
  }

  componentDidUpdate() {
    const {board, finished} = this.state;
    if (!finished) {
      let winner = this.getWinner(board);
      let draw = this.checkDraw(board);
      if (winner || draw) this.setState({finished: true});
    }
  }

  /**
   * 
   * @param {number} n The index of the tile
   */
  onSquareClick(n) {
    const {finished, xTurn} = this.state;
    let board = this.state.board.slice();

    if (!finished && board[n] === '') {
      board[n] = xTurn ? 'X' : 'O';

      this.setState({ 
        board, 
        xTurn: !xTurn
      });
    }
  }

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
    const {board, finished} = this.state;

    let status = '';
    if (finished) {
      let winner = this.getWinner(board);
      if (winner) {
        status = `${winner} has won!`;
      } else {
        status = "It's a draw!";
      }
    }

    return (
      <div className="game">
        {this.renderBoard()}
      <div className="status">{status}</div>
      </div>
    );
  }
}

// Exports
export default App;
