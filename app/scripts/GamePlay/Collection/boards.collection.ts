/// <reference path='../Model/board.model.ts'/>
module Chess.GamePlay {
    export const BOARDS: Array<Board> = [
        new Board('rouloulou',8,{x:0,y:0},{x:7,y:7}, [{x:4,y:4}, {x:3,y:3},{x:4,y:3}, {x:3,y:4}],[{x:2,y:2}, {x:5,y:5}])
        ];
}
