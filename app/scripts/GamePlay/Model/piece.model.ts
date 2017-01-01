/// <reference path='./piece.interface.ts'/>
module Chess.GamePlay {
    export class Piece implements PieceInterface {

        name: string;
        _coords: Array<Coord>;

         constructor(name : string, coords : Array<Coord>) {
            this.name = name;
            this._coords = coords;
        }

        getCoords(r : number) : Array<Coord>{

          var newCoords: Array<Coord> = new Array<Coord>();
          // Pour chaques coordonnées de la piéce on calcul sa rotation
          for(var coord of this._coords){
            newCoords.push(this.pivot(coord, r));
          }
          return newCoords;
        }

        pivot(coord : Coord, r : number) : Coord{
          // On applique r pivot
          var newCoord : Coord = {x : coord.x, y : coord.y}; // attention si newCoord = coord alors on modifie this._coord ...
          // vive typescript t_t
          for(var i = 0; i < r; i ++){
            var buffer: number = newCoord.x;
            newCoord.x = newCoord.y;
            newCoord.y = - buffer;
          }
          return newCoord;
        }

        setCoords(coords : Array<Coord>): void{
            this._coords = coords;
        }

    }
}
