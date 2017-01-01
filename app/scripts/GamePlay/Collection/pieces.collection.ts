/// <reference path='../Model/piece.model.ts'/>
module Chess.GamePlay {
        export const PIECES: Array<Piece> = [

                new Piece('z', 0xE13EF0, [{x: 0, y:0}, {x:1,y:0}, {x:1, y:1}, {x:2, y:1}]),
                new Piece('carre', 0x3EF06B, [{x:0,y:0},{x:1,y:0},{x:0,y:1},{x:1,y:1}]),
                new Piece('carre2', 0xF0EA3E, [{x:0,y:0},{x:1,y:0}, {x:1, y:1}, {x:0,y:1}]),
                new Piece('piece1', 0x3EF09D,[{x: 0, y: 0},{x: 1,y: 0},{x: 1,y: 1}]),
                new Piece('piece2', 0x3E4DF0, [{x: 0, y: 0},{x: 0,y: 1}, {x: 0,y: 2}]),
                new Piece('piece3', 0x38453D, [{x: 0, y: 0},{x: 0,y: 1}, {x: 1,y: 1}, {x:0, y:2}]),
                new Piece('piece4', 0xD15CFF, [{x: 0, y: 0},{x: 1,y: 1}]),
                new Piece('piece5', 0xFF805C, [{x: 0, y: 0},{x: 0,y: 1}]),
                new Piece('piece6', 0x8AFF5C, [{x: 0, y: 0},{x: 0,y: 1},{x: 1,y: 0}])
            ];
}
