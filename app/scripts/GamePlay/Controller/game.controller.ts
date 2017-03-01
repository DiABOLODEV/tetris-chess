/// <reference path='../Model/game.interface.ts'/>
/// <reference path='../Collection/pieces.collection.ts'/>
/// <reference path='../Collection/boards.collection.ts'/>
module Chess.GamePlay {
    export class Game implements GameInterface{
        NB_PIECES : number = 3;
        TIME : number = 30; // secondes
        _board : Board;
        _p1 : PlayerInGame;
        _p2 : PlayerInGame;
        _time: number ;

        constructor(board : Board, p1 : PlayerInGame, p2 :PlayerInGame){
            // si aucun plateau n'est spécifié on en tire un au hasard
            if(board == null){
              this._board = this.getRandomBoard();
            }
            else{
              this._board = board;
            }
            this._p1 = p1;
            this._p1.setPieces(this.getRandomPieces(this.NB_PIECES)); // récupére
            this._p1.setCoord(this._board.getPlayerCoord(1));

            this._p2 = p2;
            this._p2.setPieces(this.getRandomPieces(this.NB_PIECES)); // récupére
            this._p2.setCoord(this._board.getPlayerCoord(2));

        }


        getRandomPieces(n : number) : Array<Piece>{
            var pieces : Array<Piece> = [];
            for(var i = 0; i < n ; i ++){
                 pieces.push(this.getRandomPiece());
            }
            return pieces;
        }

        getRandomBoard() : Board{
          return BOARDS[Math.floor((BOARDS.length)*Math.random())];
        }

        getRandomPiece(): Piece{
          return PIECES[Math.floor((PIECES.length)*Math.random())];
        }

        playIsValid(player: PlayerInGame) : boolean{

            var piece = player.getPieces()[player.getIndexPieceSelected()];
            var r : number = player.getPivotPieceSelected();
            var pieceCoord : Coord;
            var playerCoord : Coord =  player.getCoord();

            for(var coord  of piece.getCoords(r)){

                pieceCoord = this.addCoords(playerCoord, coord);
                for( var fullCoord of this._board.getFullCells()){
                    if(pieceCoord.x == fullCoord.x && pieceCoord.y == fullCoord.y){
                        return false;
                    }
                }

                if (pieceCoord.x >= this._board.getSize() || pieceCoord.x < 0){
                    return false;
                }
                if (pieceCoord.y >= this._board.getSize() || pieceCoord.y < 0){
                    return false;
                }
            }

            return true;
        }


        addCoords(c1:Coord, c2:Coord) : Coord{
            var c3 : Coord = {x:0,y:0};

            c3.x = c1.x + c2.x;
            c3.y = c1.y + c2.y;

            return c3;
        }

        play(player: PlayerInGame) : void{

            var piece = player.getPieces()[player.getIndexPieceSelected()];
            var r : number = player.getPivotPieceSelected();
            var newCoord : Coord;
            var playerCoord : Coord = player.getCoord();
            var lastPieceCoord : Coord = piece.getCoords(r)[piece.getCoords(r).length-1]; // on prend la derniére position de la piéce

            player.setCoord(this.addCoords(playerCoord,lastPieceCoord));
            // on attribut une nouvelle piéce au joueurs
            player.replacePiece(player.getIndexPieceSelected(), this.getRandomPiece());
            // on remet ses attributs à 0
            player.setIndexPieceSelected(null);
            player.setPivotPieceSelected(0);


            if (this.gameIsFinish()){
                player.win();
            }



        }

        getAdversaire(player: PlayerInGame){
              if(player === this._p1){
                return this._p2;
            }else{
                return this._p1;
            }
        }

        gameIsFinish() : boolean{
            // Le jeu n'est pas fini si un joueur est sur une emptyCell (case où les deux joueurs peuvent cohabiter)
            for(var coord of this._board.getEmptyCells()){
                if(this._p1.getCoord().x == coord.x && this._p1.getCoord().y == coord.y){
                    return false;
                }
            }
            // sinon on retourne true si les deux joueurs sont sur une case commune o ils ne peuvent pa cohabiter
            return (this._p1.getCoord().x == this._p2.getCoord().x && this._p1.getCoord().y == this._p2.getCoord().y );
        }

        getBoard() : Board{
            return this._board;
        }

        getRelativePiece(piece : Piece, r:number, player: PlayerInGame) :  Piece{
            var relativeCoords : Array<Coord>;

            for( var pieceCoord of piece.getCoords(r)){
                relativeCoords.push(this.addCoords(pieceCoord, player.getCoord()));
            }

            return new Piece(piece.name, piece.color, relativeCoords);
        }

        getP1(): PlayerInGame{
            return this._p1;
        }

        getP2(): PlayerInGame{
            return this._p2;
        }
    }
}
