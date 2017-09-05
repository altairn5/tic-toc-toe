
class Game {

    constructor() {

        this.board =  [
            [ '', '', '', ],
            [ '', '', '', ],
            [ '', '', '', ],
        ];

        this.draw = false;
        this.over = false;

    }

    move(r, c) {

        this.board[r][c] = 'X';

        console.log (this.board[0].join(''));

        // Check if O wins.
        if (this.board[0].join('') === 'XXX') {
            this.over = true;
        }

    }

    minimax(gameBoard) {

    }

}

export default Game;