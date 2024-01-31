export default function GameBoard({onFieldClick, gameBoard}){
    return(
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((col, colIndex) => <li key={colIndex}><button onClick={() => onFieldClick(rowIndex, colIndex)} disabled={gameBoard[rowIndex][colIndex]}>{col}</button></li>)}
                </ol>
            </li>
            )}
        </ol>
    )
}
