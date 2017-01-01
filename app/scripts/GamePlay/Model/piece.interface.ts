/// <reference path='./coord.model.ts'/>
module Chess.GamePlay {
    export interface PieceInterface {

        name: string;
        _coords: Array<Coord>;
        getCoords(r : number) : Array<Coord>;
        setCoords(coords : Array<Coord>): void;
        pivot(coord : Coord, r : number) : Coord;

    }
}
