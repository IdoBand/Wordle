export interface Tile {
    id: number, 
    content: string, 
    className: string
}


export interface EncryptedObject {
    iv: {
        type: string;
        data: number[];
        };
    encrypted: string;
}

const dialogMessagesMap = new Map([
    ['0', 'Nice Try!'],
    ['1', 'So Close!'],
    ['2', 'Don\'t Give Up Yet!'],
    ['3', 'You\'re Getting There!'],
    ['4', 'Almost!'],
    ['5', 'Keep Trying!'],
    ['VICTORY', 'Well Done!']
])

export class Game {
    gameId: string
    userId: string
    currentTile: number
    currentRowFirstTile: number
    totalAttempts: number
    completed: boolean
    win: boolean
    score: number
    tiles: Tile[]
    dialogMessage: {
        message: string
        className: string
    }
    word: string
    encryptedObject: EncryptedObject | undefined
    constructor (gameId=Date.now().toString(), userId='', currentTile=0, currentRowFirstTile=0, totalAttempts=0, completed=false, win=false, score=0, tilesContent='', tilesClassNames='', encryptedObject=undefined) {
        this.gameId = gameId
        this.userId = userId
        this.currentTile = currentTile
        this.currentRowFirstTile = currentRowFirstTile
        this.totalAttempts = totalAttempts
        this.completed = completed
        this.win = win
        this.score = score
        this.dialogMessage = {
            message:'Good Luck!',
            className: ''
        }
        this.word = ''
        this.encryptedObject = encryptedObject
        this.tiles = this.decideTilesContent(tilesContent, tilesClassNames)
    }
    decideTilesContent(tilesContent: string, tilesClassNames: string) {
        // for a new game the function returns 'emptyTiles'.
        // for an existing game it maps out the 'tilesContent' into the 'emptyTiles' and returns it.
        const emptyTiles =  [ // game board
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
        ]
        if (tilesContent) {
            const existingGameTiles = emptyTiles.map((tile, idx) =>{
                tile.content = idx < tilesContent.length ? tilesContent[idx] : ''
                tile.className = this.codeToClassName(tilesClassNames[idx])
                return tile
            })
            return existingGameTiles
        }
        return emptyTiles
    }
    addLetter(letter: string) {
        if (this.currentTile !== 999) {
            const newTiles: Tile[] = this.tiles.map((tile: Tile) => {
                if (tile.id === this.currentTile) tile.content = letter
                return tile
            })
        if (!((this.currentTile+1) % 5 === 0)) {
            this.currentTile += 1;
            }
        return newTiles 
        }
    }
    findLastFullTile() {
        let tileIdToRemove: number | undefined = undefined
        for (const tile of this.tiles) {
            if (tile.content !== '') {
                tileIdToRemove = tile.id
            }
        }
        return tileIdToRemove;
    }
    removeLetter() {
        if (this.currentTile !== 999) {
            const tileIdToRemove = this.findLastFullTile();
            const currentRowFirstTile = this.currentRowFirstTile;
            
            if (tileIdToRemove !== undefined && ( (currentRowFirstTile <= tileIdToRemove && tileIdToRemove <= currentRowFirstTile + 4))) {
            
            const newTiles: Tile[] = this.tiles.map((tile: Tile) =>{
                if (tile.id === tileIdToRemove ) tile.content = ''
                return tile
            })
            // deletion occurred -> update current tile.
            this.currentTile = tileIdToRemove;
            return newTiles 
            }
            
        }                       
    }
    private classNameToCode(className: string) {
        const classNamesToCode: {[key: string]: string} = {
            'bg-default': '0',
            'bg-dark': '1',
            'bg-cow': '2',
            'bg-bull': '3',
        }
        return classNamesToCode[className]
    }
    private codeToClassName(code: string): string {
        const codeToClassName: {[key: string]: string} = {
            '0': 'bg-default',
            '1': 'bg-dark',
            '2': 'bg-cow',
            '3': 'bg-bull'
        };
        return codeToClassName[code]
    }
    getADialogMessage(string: string) {
        return dialogMessagesMap.get(string)
    }
    extractContentAndClassNamesFromTiles() {
        let tilesContent = ''
        let tilesClassNames = ''
        for (const tile of this.tiles) {
            tilesClassNames += this.classNameToCode(tile.className)
            tilesContent += tile.content
        }
        return {tilesContent, tilesClassNames}
    }
    setWord(word: string) {
        this.word = word
    }
    setEncryptedObject(encryptedObject: EncryptedObject) {
        this.encryptedObject = encryptedObject
    }
    setUserId(userId: string) {
        this.userId = userId ? userId : ''
    }
    determineWinOrNot(bullLetters: number) {
        let newDialogMessage;
        let newClassName
        let updatedCurrentTile: number;

        if ( bullLetters === 5 ) {
            // user is correct --> WIN
            this.score = 6 - this.totalAttempts
            this.win = true
            this.completed = true
            newDialogMessage = `${dialogMessagesMap.get('VICTORY')} Score: ${this.score}`
            newClassName = 'bg-bull'
            updatedCurrentTile = 998
        } 
        else if (this.currentRowFirstTile === 25) {
            // user is incorrect && was last attempt --> GAME OVER
            this.completed = true
            newDialogMessage = 'Game Over :('
            newClassName = 'bg-red-500'
            updatedCurrentTile = this.currentTile + 1
        }
        else {
            // user is incorrect && has more attempt --> GAME CONTINUES
            newDialogMessage = dialogMessagesMap.get(Math.floor(Math.random() * (dialogMessagesMap.size - 1)).toString())
            newClassName = ''
            updatedCurrentTile = this.currentTile + 1
        }
        this.dialogMessage = {
            message: newDialogMessage as string,
            className: newClassName,
        };
        this.currentTile = updatedCurrentTile
        this.currentRowFirstTile = this.currentRowFirstTile + 5
        this.totalAttempts = this.totalAttempts + 1
    }
}
