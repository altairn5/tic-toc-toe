import React, {Component} from 'react';
import './App.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gameState: 'initial',
            gameBoard: [
                [
                    {state: 0,},
                    {state: 0,},
                    {state: 0,},
                ], [
                    {state: 0,},
                    {state: 0,},
                    {state: 0,},
                ], [
                    {state: 0,},
                    {state: 0,},
                    {state: 0,},
                ],
            ]
        };
    }

    render() {

        var topBarContent;

        if (this.state.gameState === 'initial') {
            topBarContent = <div/>
        } else if (this.state.gameState === 'playing') {

            topBarContent =
                <button onClick={this.restart.bind(this)}>
                    RESTART
                </button>;

        } else {
            topBarContent = <div/>
        }

        var appSquareContent;
        var rows = [];

        for (var i = 0; i < 3; ++i) {

            var cols = [];

            for (var j = 0; j < 3; ++j) {

                var state = this.state.gameBoard[i][j].state;
                var iconContent;

                if (state === 1) {
                    iconContent = <i className="fa fa-circle-o fa-5x" aria-hidden="true"></i>;
                } else if (state === 2) {
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

    restart() {

        var gameBoard = this.state.gameBoard;

        for (var i = 0; i < 3; ++i) {

            for (var j = 0; j < 3; ++j) {
                gameBoard[i][j].state = 0;
            }

        }

        this.setState({
            gameState: 'initial',
            gameBoard: gameBoard,
        });

    }

    move(i, j) {

        var gameBoard = this.state.gameBoard;

        gameBoard[i][j].state = 2;

        this.setState({
            gameState: 'playing',
            gameBoard: gameBoard,
        });

    }

}

export default App;
