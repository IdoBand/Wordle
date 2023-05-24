import { useState, useRef, useContext, useEffect } from "react"
import { EncryptedObject, Game, Tile } from '../interface';
import { userContext } from '../providers/userProvider';
const BASIC_URL: string = import.meta.env.VITE_BASIC_URL
const useGame = () => {

    const game = useRef<Game | null>(null)
    const [tiles, setTiles] = useState<Tile[]>([])
    const [error, setError] = useState<boolean>(false)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [uncompletedGame, setUnCompletedGame] = useState<boolean>(false)
    const [dialogMessage, setDialogMessage ] = useState({
        message:'Good Luck!',
        className: ''
    });
    const { user, setUser } = useContext<any>(userContext)

    async function checkForUncompletedGame(currentUser = user, currentGame=game.current) {
        currentGame = new Game()
        setIsFetching(true)
        if (currentUser) {        // 1. check if a user is logged in
            try {
                const response = await fetch(
                `${BASIC_URL}/getUncompletedGame`, 
                { 
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        userId: currentUser.email
                    })
                });
                const result = await response.json()
                if (result.isGame) { // 2. check if the user had an uncompleted
                    currentGame = new Game(
                        result.game.gameId,
                        result.game.userId,
                        result.game.currentTile,
                        result.game.currentRowFirstTile,
                        result.game.totalAttempts,
                        result.game.completed,
                        result.game.win,
                        result.game.score,
                        result.game.tilesContent,
                        result.game.tilesClassNames,
                        result.game.wordToGuess
                        )
                    game.current = currentGame
                    setTiles(game.current.tiles)
                    setUnCompletedGame(true)
                } else {
                    currentGame = new Game()
                    game.current = currentGame
                    game.current.setUserId(user.email)
                    getWordFromServer()
                    setTiles(game.current.tiles)
                }
            } catch (err) {
                console.log(err);
                setError(true)
                setDialogMessage(
                {message: 'Server error :(',
                className: 'bg-red-500'})
            } finally {
                setIsFetching(false)
            }
        } else {
            game.current = currentGame
            setTiles(game.current.tiles)
            setIsFetching(false)
            getWordFromServer()
        }
        
    }
    useEffect(() => {
        checkForUncompletedGame()
      }, [user])

      useEffect(() => {
        async function handleUserSignIn() {
            if (user && game.current) {
                game.current!.setUserId(user.email)
                await saveGame(game.current as Game)
            } else if (game.current) {
                game.current!.setUserId('')
            }
        }
        handleUserSignIn()
    }, [user, game])

    async function getWordFromServer() {
        setIsFetching(true)
        try {
            const response = await fetch(`${BASIC_URL}/getWord`);
            const encryptedObject = await response.json();
            game.current!.setEncryptedObject(encryptedObject)
        } catch (err){
            console.log(err);
            setError(true)
            setDialogMessage(
                {message: 'Server error :(',
                className: 'bg-red-500'})
        } finally {
            setIsFetching(false)
        }
    }

    async function checkWordAtServer (guess: string, requestObject: EncryptedObject = game.current!.encryptedObject!) {
        if (requestObject) {
            setIsFetching(true)
            try {
                const attempt = {
                    guess: guess,
                    encryptedWord: requestObject.encrypted,
                    iv: requestObject.iv.data
                }
                const response = await fetch(
                `${BASIC_URL}/guessWord`, 
                { 
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(attempt)
                });
                
                const resultArray = await response.json()
                return resultArray;
            } catch (err) {
                setError(true)
                setDialogMessage(
                    {message: 'Server error :(',
                    className: 'bg-red-500'}
                )
            } finally {
                setIsFetching(false)
            }
        }
    }
    async function saveGame(game: Game) {
        /**
         * When a user is logged in and the user clicks 'enter' to check a guess.
         * this function responsibility is to save the game.
         *
         * @param {Game} game - The game that is currently being played.
         * @returns {void} - This function only updates the DB.
         * @throws
         *
         * @example
         */
        const tilesContentAndClassNames = game.extractContentAndClassNamesFromTiles()
        const gameObject = {
            gameId: game.gameId,
            userId: game.userId,
            currentTile: game.currentTile,
            currentRowFirstTile: game.currentRowFirstTile,
            totalAttempts: game.totalAttempts,
            completed: game.completed,
            win: game.win,
            score: game.score,
            wordToGuess: game.encryptedObject,
            tilesContent: tilesContentAndClassNames.tilesContent,
            tilesClassNames: tilesContentAndClassNames.tilesClassNames
        }
        setIsFetching(true)
        try {
            const response = await fetch(
            `${BASIC_URL}/saveGame`, 
            { 
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(gameObject)
            });
            const result = await response.json()
            return result
        } catch (err) {
            console.log(err);
        } finally {
            setIsFetching(false)
        }
    }
    function addLetter(letter: string) {
        const newTiles = game.current!.addLetter(letter)
        if (newTiles) {
            setTiles(newTiles)
        }
    }
    function removeLetter() {
        const newTiles = game.current!.removeLetter()
        if (newTiles) {
            setTiles(newTiles)
        }
    }
    function handleKeyPressed(event: KeyboardEvent) {
        const { 
            key, 
            keyCode} = event;
        if (keyCode >= 65 && keyCode <= 90) {
            addLetter(event.key.toUpperCase());
        } else if (key === 'Backspace') {
            removeLetter();
        } else if (key === 'Enter') {
            enterClickHandler();
        }
    }
    async function enterClickHandler() {
        if (game.current!.totalAttempts < 6 && tiles[game.current!.currentRowFirstTile +4].content !== ''){

            let wordToCheck = '';
            // extract the word from relevant row
            const firstTileIndex: number = game.current!.currentRowFirstTile;
            for (let i = firstTileIndex; i <= firstTileIndex+4 ; i++) {
                wordToCheck += tiles[i].content;
            }
            const wordCheckResponse  = await checkWordAtServer(wordToCheck)
            if (wordCheckResponse) {
                checkWordValidity(wordCheckResponse)
            }
            if (user) {
                const response = await saveGame(game.current as Game)
            }
        }
    }
    function checkWordValidity(resultArray: string[]) {

        const newTiles: Tile[] = [];
    
        let letterIndex = 0;
        let bullLetters = 0;
        let cowLetters = 0;
    
        tiles.forEach((tile: Tile) => {
        if ( game.current!.currentRowFirstTile <= tile.id && tile.id <= game.current!.currentRowFirstTile + 4) {
            tile.className = resultArray[letterIndex][1];
        if (tile.className === 'bg-bull') {
            bullLetters += 1
        } else if (tile.className === 'bg-cow') { 
            cowLetters +=1
        }
        letterIndex += 1;
        }
        newTiles.push(tile)});
        setTiles(newTiles);
        game.current!.determineWinOrNot(bullLetters);
        setDialogMessage(game.current!.dialogMessage)
    }
    return (
    {
        dialogMessage,
        tiles,
        setTiles,
        addLetter,
        removeLetter,
        handleKeyPressed,
        enterClickHandler,
        getWordFromServer,
        checkWordAtServer,
        error,
        isFetching,
        uncompletedGame,
        setUnCompletedGame
    }
    )
}

export default useGame