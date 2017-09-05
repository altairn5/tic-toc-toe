import React, {Component} from 'react';
import './App.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import Game from './Game';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gameState: 'initial',
            game: null,
        };
    }

    render() {

        var topBarContent;
        var appSquareContent;

        if (this.state.gameState === 'initial') {

            topBarContent = <div/>

            appSquareContent =
                <div className="App-game-lobby">
                    <button onClick={this.start.bind(this)}>
                        START
                    </button>
                </div>

        } else if (this.state.gameState === 'playing') {

            topBarContent =
                <button onClick={this.restart.bind(this)}>
                    RESTART
                </button>;

            var rows = [];

            for (var i = 0; i < this.state.game.boardSize; ++i) {

                var cols = [];

                for (var j = 0; j < this.state.game.boardSize; ++j) {

                    var state = this.state.game.board[i][j];
                    var iconContent;

                    if (state === 'O') {
                        iconContent = <i className="fa fa-circle-o fa-5x" aria-hidden="true"></i>;
                    } else if (state === 'X') {
                        iconContent = <i className="fa fa-times fa-5x" aria-hidden="true"></i>;
                    } else {
                        iconContent = <i className="App-icon fa fa-times fa-5x" aria-hidden="true"></i>;
                    }

                    cols.push(
                        <div key={i + '.' + j} className="App-game-board-column" onClick={this.move.bind(this, i, j)}>
                            {iconContent}
                        </div>
                    );

                }

                rows.push(
                    <div key={i} className="App-game-board-row">
                        {cols}
                    </div>
                );

            }

            appSquareContent =
                <div className="App-game-board">
                    {rows}
                </div>

        } else if (this.state.gameState === 'over') {

            var resultText;

            if (this.state.game.score > 0) {
                resultText = 'YOU WIN';
            } else if (this.state.game.score < 0) {
                resultText = 'YOU LOST!';
            } else {
                resultText = 'IT IS DRAW!';
            }

            appSquareContent =
                <div className="App-game-lobby">
                    <h1>{resultText}</h1>
                    <button onClick={this.restart.bind(this)}>
                        RESTART
                    </button>
                </div>

        } else {
            topBarContent = <div/>
            appSquareContent = <div/>
        }

        return (
            <div className="App">
                <div className="App-top-bar">
                    {topBarContent}
                </div>
                <div className="App-square">
                    {appSquareContent}
                </div>
            </div>
        );

    }

    start() {
        this.restart();
    }

    restart() {

        this.setState({
            gameState: 'playing',
            game: new Game(3),
        });

    }

    move(r, c) {

        var game = this.state.game;
        game.move('X', r, c);

        // For debug!
        // game.move(game.player === 'X' ? 'O' : 'X', r, c);

        if (!game.over) {
            var nextMove = {};
            game.minimax(game, nextMove);
            game.move('O', nextMove.r, nextMove.c);
        }

        var gameState;

        if (game.over) {
            gameState = 'over';
        } else {
            gameState = 'playing';
        }

        this.setState({
            gameState: gameState,
            game: game,
        });

    }



}

export default App;
