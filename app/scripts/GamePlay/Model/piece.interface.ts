/// <reference path='./coord.model.ts'/>
module Chess.GamePlay {
    export interface PieceInterface {
        
        name: string;
        _coords: Array<Coord>;
        
        // pivoter une pièce 
        rotate(): void;
    } 
}