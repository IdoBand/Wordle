import { useState } from 'react';
import { Tile, User, EncryptedObject, Game } from '../interface';

const initialGameState = {
    currentRowFirstTile: 0,
    currentTile: 0,
    guessAttempts: 0
    }
const initialDialogMessage = {
        message: 'Good Luck!',
        className: 'basic'
    }
const BASIC_URL: string = import.meta.env.VITE_BASIC_URL
const useGameLogic = () => {
const [error, setError] = useState<boolean>(false)
const [isFetching, setIsFetching] = useState<boolean>(false)
const [dialogMessage, setDialogMessage ] = useState(initialDialogMessage);
const [gameState, setGameState] = useState(initialGameState);
const [encryptedObject, setEncryptedObject] = useState(null)
async function getWordFromServer() {
    setIsFetching(true)
    try {
        const response = await fetch(`${BASIC_URL}/getWord`);
        const encryptedObject = await response.json();
        setEncryptedObject(encryptedObject);
    } catch (err){
        console.log(err);
        
        setError(true)
        setDialogMessage(
            {message: 'Server error :(',
            className: 'bg-red-500 my-2 rounded-lg'})
    } finally {
        setIsFetching(false)
    }
};

async function checkWordAtServer (guess: string, requestObject: EncryptedObject = encryptedObject!) {
    if (requestObject) {
        setIsFetching(true)
        try {
            const attempt = {
                guess: guess,
                encryptedWord: requestObject.encrypted,
                iv: requestObject.iv.data
            }
            const response = await fetch(`${BASIC_URL}/guessWord`, { method: 'post',
                                                    headers: {'Content-Type': 'application/json'},
                                                    body: JSON.stringify(attempt)});
            
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
    };
};
let token: string;
async function loginForToken (userObject: User) {
    const user = {
        firstName: userObject.firstName,
        lastName: userObject.lastName,
        email: userObject.email
    }
const response = await fetch(`${BASIC_URL}/login`, { 
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)});
    const resultTokenObject = await response.json();
    token = resultTokenObject.accessToken;
}

// game board
const [tiles, setTiles] = useState([
{id:0, content: '', className: 'bg-default'},
{id:1, content: '', className: 'bg-default'},
{id:2, content: '', className: 'bg-default'},
{id:3, content: '', className: 'bg-default'},
{id:4, content: '', className: 'bg-default'},

{id:5, content: '', className: 'bg-default'},
{id:6, content: '', className: 'bg-default'},
{id:7, content: '', className: 'bg-default'},
{id:8, content: '', className: 'bg-default'},
{id:9, content: '', className: 'bg-default'},

{id:10, content: '', className: 'bg-default'},
{id:11, content: '', className: 'bg-default'},
{id:12, content: '', className: 'bg-default'},
{id:13, content: '', className: 'bg-default'},
{id:14, content: '', className: 'bg-default'},

{id:15, content: '', className: 'bg-default'},
{id:16, content: '', className: 'bg-default'},
{id:17, content: '', className: 'bg-default'},
{id:18, content: '', className: 'bg-default'},
{id:19, content: '', className: 'bg-default'},

{id:20, content: '', className: 'bg-default'},
{id:21, content: '', className: 'bg-default'},
{id:22, content: '', className: 'bg-default'},
{id:23, content: '', className: 'bg-default'},
{id:24, content: '', className: 'bg-default'},

{id:25, content: '', className: 'bg-default'},
{id:26, content: '', className: 'bg-default'},
{id:27, content: '', className: 'bg-default'},
{id:28, content: '', className: 'bg-default'},
{id:29, content: '', className: 'bg-default'},
]);

const addLetter = (letter: string) => {
    if (gameState.currentTile !== 999) {
    const newTiles: Tile[] = tiles.map((tile: Tile) => {
        if (tile.id === gameState.currentTile) tile.content = letter
        return tile
    });
    setTiles(newTiles);

    if (!( (gameState.currentTile+1) % 5 === 0)) {
    gameState.currentTile += 1;
    } ;
    };
};

const resetGame = () => {
    const newTiles: Tile[] = [];
    tiles.forEach(tile => {
    if (tile.content !== '') tile.content = '';
    newTiles.push(tile)
    });
    setTiles(newTiles);

    setGameState({
    currentRowFirstTile: 0,
    currentTile: 0,
    guessAttempts: 0
});

setDialogMessage({
message: 'Good Luck!',
className: 'basic'
});
};

// returns the last tile that its content is not an empty string.
const findLastFullTile = () => {
let tileIdToRemove: number | undefined = undefined;
for (let tile of tiles) {
if (tile.content !== '' ) {
tileIdToRemove = tile.id;
};
};
return tileIdToRemove;
};

const removeLetter = () => {
if (gameState.currentTile !== 999) {
const tileIdToRemove = findLastFullTile();
const currentRowFirstTile = gameState.currentRowFirstTile;

if (tileIdToRemove !== undefined && ( (currentRowFirstTile <= tileIdToRemove && tileIdToRemove <= currentRowFirstTile + 4))) {

const newTiles: Tile[] = [];
tiles.forEach(tile => {
if (tile.id === tileIdToRemove ) tile.content = '';
newTiles.push(tile);
});
setTiles(newTiles);
// deletion occurred -> update current tile.
gameState.currentTile = tileIdToRemove;
};
};                            
};

const enterClickHandler = () => {


if (gameState.guessAttempts < 6 && tiles[gameState.currentRowFirstTile +4].content !== '' ){
    
    let wordToCheck: string = '';
    // extract the word from relevant row
    const firstTileIndex: number = gameState.currentRowFirstTile;
    for (let i = firstTileIndex; i <= firstTileIndex+4 ; i++) {
        wordToCheck += tiles[i].content;}
    checkWordAtServer(wordToCheck)
    .then(res => {
        if (res) {
            checkWordValidity(res)}
    });

    // restart word to check
    wordToCheck = '';
    };
    };

const handleKeyPressed = (event: KeyboardEvent) => {
const { key, 
keyCode} = event;
if (keyCode >= 65 && keyCode <= 90) {
addLetter(event.key.toUpperCase());
} else if (key === 'Backspace') {
removeLetter();
} else if (key === 'Enter') {
enterClickHandler();
}
};

const checkWordValidity = (resultArray: string[]) => {

const newTiles: Tile[] = [];

let letterIndex = 0;
let bullLetters = 0;
let cowLetters = 0;

tiles.forEach(tile => {
if ( gameState.currentRowFirstTile <= tile.id && tile.id <= gameState.currentRowFirstTile + 4) {
tile.className = resultArray[letterIndex][1];

switch (tile.className) {
    case 'bg-bull': bullLetters += 1;
    case 'bg-cow': cowLetters +=1;
}
letterIndex += 1;
}
newTiles.push(tile)});
setTiles(newTiles);

determineWinOrNot(bullLetters, cowLetters);

letterIndex = 0;
bullLetters = 0;
cowLetters = 0;
};

const failMessages = [  'Nice Try!',
'So Close!',
'Don\'t Give Up Yet!',
'You\'re Getting There!',
'Almost!',
'Keep Trying!'];
const determineWinOrNot = (bullLetters: number, cowLetters: number) =>{
let newMessage: string = dialogMessage.message;
let newClassName: string = dialogMessage.className;
let updatedCurrentTile: number;

if ( bullLetters === 5 ) {
newMessage = 'Well Done!';
newClassName = 'victory';
updatedCurrentTile = 998;
} else if (cowLetters > 0 ) {
newMessage = failMessages[Math.floor(Math.random() * failMessages.length)];
updatedCurrentTile = gameState.currentTile + 1;
} else {updatedCurrentTile = gameState.currentTile + 1; }
    const newDialogMessage = {
        message: newMessage,
        className: newClassName,
    };

    setDialogMessage(newDialogMessage);
    setGameState({...gameState,
    currentTile: updatedCurrentTile!,
    currentRowFirstTile: gameState.currentRowFirstTile+5,
    guessAttempts: gameState.guessAttempts + 1});
};

return (
    {
    dialogMessage,
    gameState,
    setGameState,
    tiles,
    setTiles,
    resetGame,
    addLetter,
    removeLetter,
    handleKeyPressed,
    enterClickHandler,
    getWordFromServer,
    encryptedObject,
    checkWordAtServer,
    loginForToken,
    error,
    isFetching
    }
)}

export default useGameLogic