import React, {Component} from 'react';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gameState: 'initial',
        };
    }

    render() {

        var topBarContent;
        var appSquareContent;

        if (this.state.gameState === 'initial') {

            topBarContent =
                <button onClick={this.restart}>
                    RESTART
                </button>

            var rows = [];

            for (var i = 0; i < 3; ++i) {

                var cols = [];

                for (var j = 0; j < 3; ++j) {

                    cols.push(
                        <div key={i + '.' + j} className="App-game-board-column" onClick={this.move}>
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

    restart() {
        console.log('restart');
    }

    move() {
        console.log('move');
    }

}

export default App;
