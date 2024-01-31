export default function GameOver({winner, onRematch, players}) {
    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            {winner && <p>{`The winner is ${players[winner]}`}</p>}
            {!winner && <p>It is a draw</p>}
            <p>
                <button onClick={onRematch}>Rematch</button>
            </p>
        </div>
    )
}