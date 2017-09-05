class Game {

    constructor(boardSize) {

        this.boardSize = boardSize > 3 ? 3 : boardSize;
        this.board = [];
        this.over = false;
        this.score = 0;
        this.player = '';
        this.numberOfMoves = 0;

        for (var i = 0; i < boardSize; ++i) {

            var cols = [];

            for (var j = 0; j < boardSize; ++j) {
                cols.push('');
            }

            this.board.push(cols);

        }

    }

    clone() {
        var newInstance = new Game();
        newInstance.boardSize = this.boardSize;
        newInstance.board = JSON.parse(JSON.stringify(this.board));
        newInstance.over = this.over;
        newInstance.score = this.score;
        newInstance.player = JSON.parse(JSON.stringify(this.player));
        newInstance.numberOfMoves = this.numberOfMoves;
        return newInstance;
    }

    move(player, r, c) {

        ++this.numberOfMoves;

        // Set last player.
        this.player = player;

        // Put the X's move on board.
        this.board[r][c] = player;

        // Calculate the score after X's move..
        this.calculateScore();

    }

    calculateScore() {

        var found, i, j, controlState;

        // Check if it is draw.
        found = true;

        for (i = 0; i < this.boardSize; ++i) {

            for (j = 0; j < this.boardSize; ++j) {

                if (this.board[i][j] === '') {
                    found = false;
                    break;
                }

            }

        }

        if (found) {
            this.over = true;
            this.score = 0;
            return;
        }

        // Check horizontal and vertical lines.
        for (i = 0; i < this.boardSize; ++i) {

            // Horizontal lines.
            found = true;
            controlState = this.board[i][0];

            if (controlState !== '') {

                for (j = 1; j < this.boardSize; ++j) {

                    if (this.board[i][j] !== controlState) {
                        found = false;
                        break;
                    }

                }

                if (found) {
                    this.setWinner(controlState);
                    this.over = true;
                    return;
                }

            }

            // Vertical lines.
            found = true;
            controlState = this.board[0][i];

            if (controlState !== '') {

                for (j = 1; j < this.boardSize; ++j) {

                    if (this.board[j][i] !== controlState) {
                        found = false;
                        break;
                    }

                }

                if (found) {
                    this.setWinner(controlState);
                    this.over = true;
                    return;
                }

            }

        }

        // Check primary diagonal line.
        found = true;
        controlState = this.board[0][0];

        if (controlState !== '') {

            for (i = 1; i < this.boardSize; ++i) {

                if (this.board[i][i] !== controlState) {
                    found = false;
                    break;
                }

            }

            if (found) {
                this.setWinner(controlState);
                this.over = true;
                return;
            }

        }

        // Check secondary diagonal line.
        found = true;
        controlState = this.board[0][this.boardSize - 1];

        if (controlState !== '') {

            for (i = 1; i < this.boardSize; ++i) {

                if (this.board[i][this.boardSize - i - 1] !== controlState) {
                    found = false;
                    break;
                }

            }

            if (found) {
                this.setWinner(controlState);
                this.over = true;
                return;
            }

        }

    }

    setWinner(player) {
        this.score = player === 'X' ? 10 : -10;
    }

    minimax(game, nextMove) {

        if (game.over) {
            return game.score;
        }

        var moves = [];
        var scores = [];
        var i, j;

        for (i = 0; i < this.boardSize; ++i) {

            for (j = 0; j < this.boardSize; ++j) {

                if (game.board[i][j] !== '') {
                    continue;
                }

                var newGame = game.clone();

                newGame.move(newGame.player === 'X' ? 'O' : 'X', i, j);

                // For debug!
                // console.log(JSON.stringify(newGame));

                var score = this.minimax(newGame, moves, scores, nextMove);
                scores.push(score);

                var move = {player: newGame.player, r: i, c: j};
                moves.push(move);

            }

        }

        var min = scores[0];
        var minIX = 0;

        for (i = 1; i < scores.length; ++i) {

            if (scores[i] < min) {
                min = scores[i];
                minIX = i;
            }

        }

        var max = scores[0];
        var maxIX = 0;

        for (i = 1; i < scores.length; ++i) {

            if (scores[i] > max) {
                max = scores[i];
                maxIX = i;
            }

        }

        if (game.player === 'O') {
            nextMove.r = moves[maxIX].r;
            nextMove.c = moves[maxIX].c;
            return max;
        } else {
            nextMove.r = moves[minIX].r;
            nextMove.c = moves[minIX].c;
            return min;
        }

    }

}

export default Game;