  module Chess.State {

  export class Main extends Phaser.State {

    _cellSize : number = 40; // 50px
    positions;
    board; // group board qui contient tous ce qu'il y a sur le plateau
    piecesP1;
    piecesP2;
    _game : GamePlay.Game;

    _g_p1;
    _g_p2;
    _g_piece;

    create() {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.pageAlignHorizontally = true;
      // Bout de code qui va permettre au jeu de se redimensionner selon la taille de l'écran
          window.addEventListener('resize', function () {
            this.game.scale.refresh();
          });
      this.game.scale.refresh();
      this.stage.backgroundColor = 0xFFFFFF;

      //positions des elements graphique
      this.positions = {
        cell : {
          size : 64
        },
        board : {
          x : 64,
          y : 960/2 - 4*64
        },
        uiP1  : {
          x : 64,
          y : 64,
          cell : {
            size : 40
          }
        },
        uiP2 : {
          x : 64,
          y : 960 - 64*3,
          cell : {
            size : 40
          }
        }
      }
      // le gameplay
      this._game = new GamePlay.Game(GamePlay.BOARDS[0], new GamePlay.PlayerInGame('titi'), new GamePlay.PlayerInGame('ika'));

      // le plateau
      this.board = this.game.add.group();
      this.board.x = this.positions.board.x;
      this.board.y = this.positions.board.y;

      var g_board = this.game.add.graphics(0,0);
      this.drawBoard(g_board,this._game.getBoard());
      this.board.add(g_board);

      // les cases pleines du plateau
      var g_fullCells = this.game.add.graphics(0,0);
      this.drawFullCells(g_fullCells, this._game.getBoard().getFullCells()); // case intouchable
      this.board.add(g_fullCells);

      // les cases empty du plateau
      var g_emptyCells = this.game.add.graphics(0,0);
      this.drawEmptyCells(g_emptyCells, this._game.getBoard().getEmptyCells()); // case intouchable
      this.board.add(g_emptyCells);

      // les joueurs
      this._g_p1 = this.drawPlayer(0,0, '0xF8FCAC', '#BA7C07',this._game.getP1());
      this._g_p2 = this.drawPlayer(0,0,'0xF8FCAC', '#BA7C07',this._game.getP2());
      this.board.add(this._g_p1);
      this.board.add(this._g_p2);

      // la piece en prévision sur le plateau
      this._g_piece = this.game.add.graphics(0,0);
      this.board.add(this._g_piece);

      // les pieces des joueurs
      // pour chaques pieces on crée un graphique avec un evenement au clique
      // l'index de graphics <> index des pieces des joueurs

      this.piecesP1 = this.game.add.group();
      this.piecesP1.x = this.positions.uiP1.x;
      this.piecesP1.y = this.positions.uiP1.y;

      var x = 0;
      var index = 0;

      for(var piece of this._game.getP1().getPieces()){
        var g = this.game.add.graphics(x, 0);
        g.inputEnabled = true;
        g.events.onInputDown.add(this.onClickPiece, this, 0, index, this._g_p1, this._game.getP1());
        this.drawPiece(g, piece);
        this.piecesP1.add(g);
        x += this.positions.uiP1.cell.size*3;
        index++;
      }
      // le bouton jouer
      var bt = this.game.add.text(x, 0, 'Jouer',  { font : 'Arial', fontSize : 16, boundsAlignH : 'center'});
      bt.inputEnabled = true;
      bt.events.onInputDown.add(this.onPlay, this, 0,this._g_p1, this._game.getP1());
      this.piecesP1.add(bt);

      // La même chose pour le joueur 2 :)
      this.piecesP2 = this.game.add.group();
      this.piecesP2.x = this.positions.uiP2.x;
      this.piecesP2.y = this.positions.uiP2.y;

      x = 0;
      index = 0;

      for(var piece of this._game.getP2().getPieces()){
        var g = this.game.add.graphics(x, 0);
        g.inputEnabled = true;
        g.events.onInputDown.add(this.onClickPiece, this, 0, index, this._g_p2, this._game.getP2());
        this.drawPiece(g, piece);
        this.piecesP2.add(g);
        x += this.positions.uiP2.cell.size*3;
        index++;
      }
      // le bouton jouer
      var bt = this.game.add.text(x, 0, 'Jouer',  { font : 'Arial', fontSize : 16, boundsAlignH : 'center'});
      bt.inputEnabled = true;
      bt.events.onInputDown.add(this.onPlay, this, 0,this._g_p2, this._game.getP2());
      this.piecesP2.add(bt);

      //
      // y = this.positions.cell.size;
      // index = 0;
      // for(var piece of this._game.getP2().getPieces()){
      //    var g = this.game.add.graphics(this.positions.cell.size*12,y);
      //   g.inputEnabled = true;
      //   g.events.onInputDown.add(this.onClickPiece, this, 0, index, this._g_p2, this._game.getP2());
      //   this.drawPiece(g, piece);
      //   y += this.positions.cell.size*3;
      //   index++;
      // }
      //   // le bouton jouer
      // var bt = this.game.add.text(this.positions.cell.size*12, y, 'Jouer',  { font : 'Arial', fontSize : 16, boundsAlignH : 'center'});
      // bt.inputEnabled = true;
      // // on joue la piece de p1
      // bt.events.onInputDown.add(this.onPlay, this, 0,this._g_p2, this._game.getP2());

    }

    onPlay(g,p, graphic,  player){
      //on joue la piece selected
      if(player.getIndexPieceSelected() == null || player.getIndexPieceSelected() >= player.getPieces().length){
        alert('Aucune piece selec / mauvais piece');
        return;
      }
      if(this._game.playIsValid(player)){
            this._game.play(player);
            this._g_piece.clear(); // on efface la piéce jouées précédemment sélectionnées.
            this.movePlayer(0,0, graphic, player.getCoord());
             if(player.isWin()){
               alert(player.name + ' gagne !');
             }
           }
           else{
             alert('Impossible de jouer cette piéce');
           }



    }
    onClickPiece(g,p,index, graphic, player){
      // gestion de la piece selectionné et la rotation globale
      // on réutilise le vars pour afficher le piece / jouer
      if(index == player.getIndexPieceSelected()){
        player.incPivotPieceSelected();
      }else{
         player.setIndexPieceSelected(index);
         player.setPivotPieceSelected(0);
      }

      this.showPieceOnBoard(player);
    }
    showPieceOnBoard(player){

      var coordPlayer = player.getCoord();
      var coordsPiece = player.getPieceCoordsSelected();
      var color;
      this._g_piece.clear();
      if(this._game.playIsValid(player)){
        color = '0XBFFF40'; //vert valide
      }else{
        color = '0XFF4040';
      }
      this._g_piece.lineStyle(4, color, 1);
      for(var coord of coordsPiece){
        this._g_piece.drawRect((coordPlayer.x+coord.x)*this.positions.cell.size, (coordPlayer.y+coord.y)*this.positions.cell.size, this.positions.cell.size, this.positions.cell.size)
      }

      // redessine la derniére case avec un fond
      this._g_piece.alpha = 0.5;
      this._g_piece.beginFill(color);
      this._g_piece.drawRect((coordPlayer.x+coord.x)*this.positions.cell.size, (coordPlayer.y+coord.y)*this.positions.cell.size, this.positions.cell.size, this.positions.cell.size)

    }
    movePlayer(x,y,graphics, coord){
      //var actualCoord = {graphics.x, graphics.y};
        let tween = this.game.add.tween(graphics);
        tween.to({ x: (x+coord.x*this.positions.cell.size), y: (y+coord.y*this.positions.cell.size)}, 800,  Phaser.Easing.Elastic.In, true);
    }

    drawEmptyCells(graphics, coords){
      graphics.lineStyle(2, 0X29A9FF, 1);
      graphics.beginFill('0xC1ECF5');

      for( var coord of coords){
         graphics.drawRect(coord.x*this.positions.cell.size, coord.y*this.positions.cell.size, this.positions.cell.size, this.positions.cell.size);
      }
    }

    drawFullCells(graphics, coords){
      graphics.lineStyle(2, 0X000000, 1);
      graphics.beginFill('0x000000');

      for( var coord of coords){
         graphics.drawRect(coord.x*this.positions.cell.size, coord.y*this.positions.cell.size, this.positions.cell.size, this.positions.cell.size);
      }
    }


    drawPlayer(x,y,color0x,color,player: GamePlay.PlayerInGame) : any{

      var coord = player.getCoord();
      var name = player.name;

      var group = this.game.add.group();
      group.x = (x+coord.x*this.positions.cell.size );
      group.y = (y+coord.y*this.positions.cell.size );

      var g = this.game.add.graphics(1,1);
      g.lineStyle(0);
      g.beginFill(color0x);
      //g.drawCircle( 0, 0, this.positions.cell.size/2);
      g.drawRect(0,0, this.positions.cell.size-2, this.positions.cell.size-2);
      g.alpha = 0.8;
      name.toLowerCase();
      name.charAt(0).toUpperCase();
      var t = this.game.add.text(this.positions.cell.size/3, this.positions.cell.size/3, name.substring(0,2),  { font : 'Arial', fontSize : 15, boundsAlignH : 'center', fill: color});

      group.add(g); // pion
      group.add(t); // pseudo

      return group;
    }

    drawPiece(graphics, piece: GamePlay.Piece){
       graphics.lineStyle(2, 0X37383a, 1);
       graphics.beginFill('0xFFFFFF');

      // on applique pas de rotation aux piéces dessiner destinées à être jouées
      for(var coord of piece.getCoords(0)){
          graphics.drawRect(coord.x*this.positions.uiP2.cell.size, coord.y*this.positions.uiP2.cell.size,this.positions.uiP2.cell.size, this.positions.uiP2.cell.size);
      }

    }

    drawBoard(graphics, board: GamePlay.Board){
      graphics.lineStyle(2, 0X37383a, 1);

      for ( var y = 0; y < board.getSize(); y ++){
          for(var x = 0; x < board.getSize(); x ++){
              graphics.lineStyle(2, 0X37383a, 1);
              graphics.beginFill('0xFFFFFF');
              graphics.drawRect(x*this.positions.cell.size, y*this.positions.cell.size, this.positions.cell.size, this.positions.cell.size);
          }
      }
  }
}
}
