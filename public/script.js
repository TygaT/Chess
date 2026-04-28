let board = null;
let game = new Chess();
let sourceSquare = null;

function clear() { $('.square-55d63').css('box-shadow', ''); }

$(document).on('click', '.square-55d63', function() {
    let square = $(this).data('square');
    if (sourceSquare === null) {
        const p = game.get(square);
        if (p && p.color === game.turn()) {
            sourceSquare = square;
            clear();
            $(this).css('box-shadow', 'inset 0 0 0 5px #fff700');
            game.moves({square: square, verbose: true}).forEach(m => {
                $('.square-' + m.to).css('box-shadow', 'inset 0 0 0 3px rgba(255,247,0,0.5)');
            });
        }
    } else {
        let move = game.move({from: sourceSquare, to: square, promotion: 'q'});
        if (move === null) {
            const p = game.get(square);
            if (p && p.color === game.turn()) {
                sourceSquare = square; clear();
                $(this).css('box-shadow', 'inset 0 0 0 5px #fff700');
                game.moves({square: square, verbose: true}).forEach(m => {
                    $('.square-' + m.to).css('box-shadow', 'inset 0 0 0 3px rgba(255,247,0,0.5)');
                });
            } else {
                $(this).css('background', 'rgba(255,0,0,0.5)');
                setTimeout(() => $(this).css('background', ''), 300);
            }
        } else {
            board.position(game.fen());
            sourceSquare = null; clear();
        }
    }
});

board = Chessboard('myBoard', { position: 'start', pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png' });