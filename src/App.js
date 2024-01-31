import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import {useState} from "react";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import {WINNING_COMBINATIONS} from "./winning-combinations";

const INITIAL_GAME_BOARD = [
    [ null, null, null],
    [ null, null, null],
    [ null, null, null]
];
const PLAYERS = {X:"Player 1", O:"Player 2"}

function detectWinner(gameBoard){
    for(let combination of WINNING_COMBINATIONS){
        let firstSquareValue = gameBoard[combination[0].row][combination[0].column];
        let secondSquareValue = gameBoard[combination[1].row][combination[1].column];
        let thirdSquareValue = gameBoard[combination[2].row][combination[2].column];

        if(firstSquareValue && firstSquareValue === secondSquareValue && firstSquareValue === thirdSquareValue){
            return firstSquareValue;
        }
    }
}

function defineGameBoard(gameTurn){
    let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
    if(gameTurn.length > 0){
        for (let turn of gameTurn){
            const {field, player} = turn;
            const {row, col} = field;
            gameBoard[row][col] = player;
        }
    }
    return gameBoard;
}

function App() {
    const [gameTurn, setGameTurn] = useState([]);
    const [players, setPlayers] = useState(PLAYERS);
    const gameBoard = defineGameBoard(gameTurn);
    let winner = detectWinner(gameBoard);
    let isDraw = !winner && gameTurn.length === 9;
    function handelFieldClick(rowIndex, colIndex){
        setGameTurn( (prevTurn) =>{
                let activePlayer = 'X';
                if(gameTurn.length > 0 && prevTurn[0].player === 'X'){
                    activePlayer = 'O';
                }
                const updatedGameTurn = [{field:{row:rowIndex, col:colIndex}, player:activePlayer}, ...prevTurn];
                return updatedGameTurn;
            }
        )
    }

    function handleRematch(){
       setGameTurn([]);
    }

    function handelNameChange(changedName, symbol){
        setPlayers(prevState =>{
            return {
                ...prevState,
                [symbol]: changedName
            }
        })
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player playerName={PLAYERS.X} symbol='X' isActive={gameTurn[0] ? gameTurn[0].player === 'O' : true} onNameChange={handelNameChange}></Player>
                    <Player playerName={PLAYERS.O} symbol='O' isActive={gameTurn[0] && gameTurn[0].player === 'X'} onNameChange={handelNameChange}></Player>
                </ol>
                {(winner || isDraw) && <GameOver winner = {winner} onRematch={handleRematch} players={players}/>}
                <GameBoard onFieldClick={handelFieldClick} gameTurn={gameTurn} gameBoard={gameBoard}/>
            </div>
            <Log gameTurn={gameTurn} players={players}/>
        </main>
    );
}

export default App;