/// <reference path='./player.interface.ts'/>
/// <reference path='./coord.model.ts'/>
/// <reference path='./piece.model.ts'/>
module Chess.GamePlay {
    export interface PlayerInGame extends Player{
            name: string;
            _coord : Coord;
            _pieces : Array<Piece>;
            _win : boolean;
            isWin() : boolean;
            win() : void;
            getCoord() : Coord;
            getPieces() : Array<Piece>;
    }
}