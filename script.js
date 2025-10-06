// ゲーム定数
const BOARD_SIZE = 8;
const EMPTY = 0;
const BLACK = 1;
const WHITE = 2;

let board = [];
let currentPlayer = BLACK; // 1: 黒, 2: 白

const boardElement = document.getElementById('othello-board');
const playerElement = document.getElementById('current-player');
// スコア要素なども取得...

// ボードの初期化
function initBoard() {
    // 8x8のボードを0(EMPTY)で初期化
    board = Array(BOARD_SIZE).fill(0).map(() => Array(BOARD_SIZE).fill(EMPTY));

    // 初期配置
    board[3][3] = WHITE;
    board[3][4] = BLACK;
    board[4][3] = BLACK;
    board[4][4] = WHITE;
    
    currentPlayer = BLACK;

    drawBoard();
    updateInfo();
}

// ボードを描画（HTML要素を更新）
function drawBoard() {
    boardElement.innerHTML = ''; // ボードをクリア
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.dataset.row = r;
            square.dataset.col = c;
            square.addEventListener('click', handleSquareClick); // クリックイベントを設定

            if (board[r][c] !== EMPTY) {
                const disc = document.createElement('div');
                disc.classList.add('disc');
                disc.classList.add(board[r][c] === BLACK ? 'black' : 'white');
                square.appendChild(disc);
            }
            
            boardElement.appendChild(square);
        }
    }
}

// クリックイベントのハンドラ
function handleSquareClick(event) {
    const r = parseInt(event.currentTarget.dataset.row);
    const c = parseInt(event.currentTarget.dataset.col);

    // TODO: ここに**裏返しが可能かどうかのチェック**と**裏返し処理**を実装

    if (isValidMove(r, c, currentPlayer)) {
        // コマを置く
        board[r][c] = currentPlayer;

        // 裏返す処理 (flipDiscs(r, c, currentPlayer) など)

        // ターンを切り替え
        currentPlayer = currentPlayer === BLACK ? WHITE : BLACK;

        // ボードを再描画
        drawBoard();
        updateInfo();

        // TODO: ここに**次のプレイヤーが打てる手があるかのチェック**や**ゲーム終了判定**を実装
    } else {
        alert('そこには置けません');
    }
}

// ゲーム情報の更新（ターン、スコアなど）
function updateInfo() {
    playerElement.textContent = currentPlayer === BLACK ? '黒' : '白';
    // スコア計算と表示の更新...
}

// 仮の有効な移動チェック関数 (裏返し処理の実装が必要)
function isValidMove(r, c, player) {
    if (board[r][c] !== EMPTY) {
        return false;
    }
    
    // TODO: 8方向に裏返せるコマがあるか確認するロジックを実装
    // (この行は仮でtrueを返しています。実際には複雑なロジックが必要です)
    // 8方向のチェックロジックが非常に重要です。
    return true; 
}

// リセットボタンのイベントリスナー
document.getElementById('reset-button').addEventListener('click', initBoard);

// ゲーム開始
initBoard();
