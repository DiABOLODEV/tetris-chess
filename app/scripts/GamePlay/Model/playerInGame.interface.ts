/// <reference path='./player.interface.ts'/>
/// <reference path='./coord.model.ts'/>
/// <reference path='./piece.model.ts'/>
module Chess.GamePlay {
    export interface PlayerInGame extends Player{
            name: string;
            _coord : Coord;
            _pieces : Array<Piece>;
            _win : boolean;
            _indexPieceSelected : ?number;
            _pivotPieceSelected : ?number;
            isWin() : boolean;
            win() : void;
            getCoord() : Coord;
            getPieces() : Array<Piece>;
            replacePiece(i:number, piece:Piece);
            getPieceCoordSelected(): Array<Coord>;
            getIndexPieceSelected() : number;
            setIndexPieceSelected(i : number);
            getPivotPieceSelected(): number;
            setPivotPieceSelected(r : number);
            incPivotPieceSelected();

    }
}
