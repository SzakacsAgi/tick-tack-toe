export default function Log({gameTurn, players}){
    return <ol id="log">
        {gameTurn.map((game) => <li key={`${game.field.row}${game.field.col}`}>{`${players[game.player]} (${game.player}) selected ${game.field.row}, ${game.field.col}`}</li>)}
    </ol>
}