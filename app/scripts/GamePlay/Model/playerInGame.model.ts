module Chess.GamePlay {
    export class PlayerInGame implements Player{
            name: string;
            _coord : Coord;
            _win : boolean;
            _pieces : Array<Piece>;
            _indexPieceSelected : number;
            _pivotPieceSelected : number;

            constructor(name){
                this.name = name;
                this._win = false;
            }
            getCoord() : Coord{
                return this._coord;
            }
            getPieces() : Array<Piece>{
                return this._pieces;
            }
            replacePiece(i:number, piece:Piece){
              this._pieces[i] = piece;
            }
            getPieceCoordsSelected(): Array<Coord>{
              return this._pieces[this._indexPieceSelected].getCoords(this._pivotPieceSelected);
            }
            getIndexPieceSelected() : number{
              return this._indexPieceSelected;
            }
            setIndexPieceSelected(i : number){
              this._indexPieceSelected = i;
            }
            getPivotPieceSelected(){
              return this._pivotPieceSelected;
            }
            setPivotPieceSelected(r : number){
              this._pivotPieceSelected = r;
            }
            incPivotPieceSelected(){
              if(this._pivotPieceSelected == null || this._pivotPieceSelected == 3){
                this._pivotPieceSelected = 0;
              }
              else{
                this._pivotPieceSelected++;
              }

            }
            isWin() : boolean{
                return this._win;
            }
            win(){
                this._win = true;
            }
            setPieces(pieces : Array<Piece>){
                this._pieces = pieces;
            }
            setCoord(coord: Coord){
                this._coord = coord;
            }

    }
}
