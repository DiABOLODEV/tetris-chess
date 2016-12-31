module Chess.GamePlay {
    export class PlayerInGame implements Player{
            name: string;
            _coord : Coord;
            _win : boolean;
            _pieces : Array<Piece>;
        
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