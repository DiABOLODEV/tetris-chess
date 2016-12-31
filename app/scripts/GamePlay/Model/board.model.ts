/// <reference path='./board.interface.ts'/>
module Chess.GamePlay {
    export class Board implements BoardInterface{
        
        _name: string;
        _size : number;
        _p1Coord: Coord;
        _p2Coord : Coord;
        _emptyCells : Array<Coord>;
        _fullCells : Array<Coord>;
        
        constructor(name : string, size : number, p1Coord : Coord, p2Coord : Coord, emptyCells : Array<Coord>, fullCells : Array<Coord>) {
            this._name = name;
            this._size = size;
            this._p1Coord = p1Coord;
            this._p2Coord = p2Coord;
            this._emptyCells = emptyCells;
            this._fullCells = fullCells;
        }
        getName(): string{
            return this._name;
        }
        
        getSize(): number{
            return this._size;
        }
    
        
        getPlayerCoord(player : number): Coord{
         if ( player == 1 ){
             return this._p1Coord;
         }   
         else{
             return this._p2Coord;
         }
        }
        
        setPlayerCoord(player : number, coord : Coord) : void{
            if( player == 1){
                this._p1Coord = coord;
            }
            else{
                this._p2Coord = coord;
            }
        }
        
        getEmptyCells() : Array<Coord> {
            return this._emptyCells;
        }
        
        getFullCells() : Array<Coord> {
            return this._fullCells;
        }
    }
}