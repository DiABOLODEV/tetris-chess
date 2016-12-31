/// <reference path='./board.model.ts'/>
/// <reference path='./piece.model.ts'/>
/// <reference path='./coord.model.ts'/>
/// <reference path='./playerInGame.model.ts'/>
/*
* regles :
* le joueur peut se deplacer sur ces piéce point de dépare premier coord et point arrivé derniére coord
* les emptyCells sont les cases ou les deux joueurs peuvent etre en meme temps
* le gagnant est celui qui arrive sur la meme case que son adversaire sans emptyCell
* TODO les fullCell sont les cases ou une piéce ne peut pas etre jouées (à partir de toutes ces coordonnées)
*/
module Chess.GamePlay {
    export interface GameInterface{
        _board : Board;
        _p1 : PlayerInGame;
        _p2 : PlayerInGame;
        getPieces(n : number) : Array<Piece>;
        getAdversaire(player: PlayerInGame);
        playIsValid(piece: Piece, player: PlayerInGame) : boolean;
        getRelativePiece(piece : Piece, player : PlayerInGame) :  Piece;
        addCoords(c1:Coord, c2:Coord) : Coord;
        play(piece: Piece, player: PlayerInGame)  : void;
        getP1(): PlayerInGame;
        getP2(): PlayerInGame;
        
        getBoard(): Board;
    }
}