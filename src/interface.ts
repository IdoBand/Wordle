export interface Tile {
    id: number, 
    content: string, 
    className: string
}

export interface User {
    firstName: string,
    lastName?: string,
    email?: string
}

export interface EncryptedObject {
    iv: {
        type: string;
        data: number[];
        };
    encrypted: string;
}

export class Game {
    id: string
    tiles: Tile[]
    score: number
    attempts: number
    currentRowFirstTile: number
    currentTile: number
    user?: User

    constructor (user?: User) {
        this.id = '1'
        this.score = 0
        this.attempts = 0
        this.user = user
        this.currentRowFirstTile = 0
        this.currentTile = 0
        this.tiles = [
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
    }
}