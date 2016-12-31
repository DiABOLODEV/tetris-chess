/// <reference path='./piece.interface.ts'/>
module Chess.GamePlay {
    export class Piece implements PieceInterface {
            
        name: string;
        _coords: Array<Coord>;
        
         constructor(name : string, coords : Array<Coord>) {
            this.name = name;
            this._coords = coords;
        }
        
        getCoords() : Array<Coord>{
            return this._coords;
        }
        setCoords(coords : Array<Coord>): void{
            this._coords = coords;
        }
        
        // pivoter une pièce 
        rotate(): void {
            // (x,y) => (y,-x)
          
        };
    } 
}