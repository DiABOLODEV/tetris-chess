/// <reference path='../Model/piece.model.ts'/>
module Chess.GamePlay {
        export const PIECES: Array<Piece> = [

                new Piece('z', [{x: 0, y:0}, {x:-1,y:0}, {x:0, y:1}, {x:1, y:1}]),
                new Piece('carre', [{x:0,y:0},{x:1,y:0},{x:0,y:1},{x:1,y:1}]),
                new Piece('carre2', [{x:0,y:0},{x:1,y:0}, {x:1, y:1}, {x:0,y:1}]),
                new Piece('piece1',[{x: 0, y: 0},{x: 1,y: 0},{x: 1,y: 1}]),
                new Piece('piece2',[{x: 0, y: 0},{x: 0,y: 1}, {x: 0,y: 2}]),
                new Piece('piece3',[{x: 0, y: 0},{x: 0,y: 1}, {x: 1,y: 1}, {x:0, y:2}]),
                new Piece('piece4',[{x: 0, y: 0},{x: 1,y: 1}]),
                new Piece('piece5',[{x: 0, y: 0},{x: 0,y: -1}]),
                new Piece('piece6',[{x: 0, y: 0},{x: 0,y: 1},{x: 1,y: 0}])
            ];
}
