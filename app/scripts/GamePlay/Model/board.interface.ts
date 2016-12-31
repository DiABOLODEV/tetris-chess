/// <reference path='./coord.model.ts'/>
module Chess.GamePlay {

    export interface BoardInterface{
        _name: string;
        _size : number;
        _p1Coord: Coord;
        _p2Coord : Coord;
        _emptyCells : Array<Coord>; // cases ou les deux joueurs peuvent cohabiter
        _fullCells : Array<Coord>; // case injouable
        
        getName() : string;
        getSize() : number;
        getPlayerCoord(player : number): Coord;
        setPlayerCoord(player : number, coord : Coord): void;
        getEmptyCells() : Array<Coord>;
        getFullCells() : Array<Coord>;

    }
}