module Chess.State {

  export class Main extends Phaser.State {

    positions; // taille configuration
    board; // group board qui contient tous ce qu'il y a sur le plateau
    piecesP1; // group des pieces des joueurs
    piecesP2;
    _game : GamePlay.Game; // gameplay
    _g_timeline_p1; // barre de temps joueurs
    _g_timeline_p2;
    _g_p1; // joueur sur le plateau
    _g_p2;
    _g_bt_j1; // bouton play
    _g_bt_j2;
    _g_piece; // piece en previsualisation

    create() {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.pageAlignHorizontally = true;
      // Bout de code qui va permettre au jeu de se redimensionner selon la taille de l'écran
      // window.addEventListener('resize', function () {
      //   this.game.scale.refresh();
      // });
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
          y : 20,
          cell : {
            size : 40
          }
        },
        uiP2 : {
          x : 64,
          y : 960 - 40*3-20,
          cell : {
            size : 40
          }
        }
      }
      // le gameplay
      this._game = new GamePlay.Game(null, new GamePlay.PlayerInGame('titi'), new GamePlay.PlayerInGame('ika'));

      // les fonds

      // centre
      var g_bg_board = this.game.add.graphics(0,this.positions.board.y-this.positions.cell.size);
      g_bg_board.beginFill(0x45C0F5);
      g_bg_board.drawRect(0,0,this.positions.cell.size*10, this.positions.cell.size*10);
      // haut et bas*
      var g_haut_bas = this.game.add.graphics(0,0);
      g_haut_bas.beginFill(0x007DB3);
      g_haut_bas.drawRect(0,0,640,this.positions.board.y-this.positions.cell.size);
      g_haut_bas.drawRect(0, this.positions.board.y +this.positions.cell.size*9,640,this.positions.board.y-this.positions.cell.size);

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
      this._g_p1 = this.drawPlayer(0,0, '0x7BFF00', '#7BFF00',this._game.getP1());
      this._g_p2 = this.drawPlayer(0,0,'0xFF0004', '#FF0004',this._game.getP2());
      this.board.add(this._g_p1);
      this.board.add(this._g_p2);

      // la piece en prévision sur le plateau
      this._g_piece = this.game.add.graphics(0,0);
      this.board.add(this._g_piece);

      // Timelines
      this._g_timeline_p1 = this.game.add.graphics(0,0);
      this.drawTimelineP1(); // on différencie car l'autre va dans le x negatif
      this._g_timeline_p2 = this.game.add.graphics(0,0);
      this.drawTimelineP2();

      // UI pour les joueurs
      this._g_bt_j1 = this.game.add.graphics(this.positions.cell.size, this.positions.board.y-this.positions.cell.size-this.positions.cell.size/2);
      this.drawPlayButton(this._g_bt_j1,false);

      this._g_bt_j1.events.onInputDown.add(this.onPlay, this, 0,this._g_p1, this._g_bt_j1, this._game.getP1());

      this._g_bt_j2 = this.game.add.graphics(640-this.positions.cell.size, this.positions.board.y+this.positions.cell.size*8+this.positions.cell.size/2);
      this.drawPlayButton(this._g_bt_j2,false);

      this._g_bt_j2.events.onInputDown.add(this.onPlay, this, 0,this._g_p2, this._g_bt_j2,this._game.getP2());


      // les pieces des joueurs
      // pour chaques pieces on crée un graphique avec un evenement au clique
      // l'index de graphics <> index des pieces des joueurs

      this.piecesP1 = this.game.add.group();
      this.piecesP1.x = this.positions.uiP1.x;
      this.piecesP1.y = this.positions.uiP1.y;

      this.drawPiecesP1();


      // La même chose pour le joueur 2 :)
      this.piecesP2 = this.game.add.group();
      this.piecesP2.x = this.positions.uiP2.x;
      this.piecesP2.y = this.positions.uiP2.y;

      this.drawPiecesP2();




    }

    onPlay(g,p, graphic, bt, player){
      //on joue la piece selected
      if(player.getIndexPieceSelected() == null || player.getIndexPieceSelected() >= player.getPieces().length){
        alert('Aucune piece selec / mauvais piece');
        return;
      }
      if(this._game.playIsValid(player)){
        this._game.play(player);
        this._g_piece.clear(); // on efface la piéce jouées précédemment sélectionnées.
        this.movePlayer(0,0, graphic, player.getCoord());
        this.drawPiecesP1();
        this.drawPiecesP2();
        // on desactive le bouton
        this.drawPlayButton(bt, false);
        // on redessine ses pieces

        if(player.isWin()){
          alert(player.name + ' gagne !');
        }
      }
      else{
        alert('Impossible de jouer cette piéce');
      }



    }
    onClickPiece(g,p,index, graphic, bt, player){
      // gestion de la piece selectionné et la rotation globale
      // on réutilise le vars pour afficher le piece / jouer
      if(index == player.getIndexPieceSelected()){
        player.incPivotPieceSelected();
      }else{
        player.setIndexPieceSelected(index);
        player.setPivotPieceSelected(0);
      }


      this.showPieceOnBoard(player, bt);
    }
    showPieceOnBoard(player, bt){

      var coordPlayer = player.getCoord();
      var coordsPiece = player.getPieceCoordsSelected();
      var color;
      this._g_piece.clear();
      if(this._game.playIsValid(player)){
        color = '0XBFFF40'; //vert valide
        this.drawPlayButton(bt, true);
      }else{
        color = '0XFF4040';
        this.drawPlayButton(bt, false);
      }
      this._g_piece.lineStyle(4, color, 1);
      for(var coord of coordsPiece){
        this._g_piece.drawRect((coordPlayer.x+coord.x)*this.positions.cell.size, (coordPlayer.y+coord.y)*this.positions.cell.size, this.positions.cell.size, this.positions.cell.size)
      }

      // redessine la derniére case avec un fond
      this._g_piece.alpha = 0.9;
      this._g_piece.beginFill(color);
      this._g_piece.drawRect((coordPlayer.x+coord.x)*this.positions.cell.size, (coordPlayer.y+coord.y)*this.positions.cell.size, this.positions.cell.size, this.positions.cell.size)

    }
    movePlayer(x,y,graphics, coord){
      //var actualCoord = {graphics.x, graphics.y};
      let tween = this.game.add.tween(graphics);
      tween.to({ x: (x+coord.x*this.positions.cell.size), y: (y+coord.y*this.positions.cell.size)}, 800,  Phaser.Easing.Elastic.In, true);
    }

    drawPiecesP1(){
      var x = 0;
      var index = 0;
      this.piecesP1.removeAll();
      for(var piece of this._game.getP1().getPieces()){
        var g = this.game.add.graphics(x, 0);
        g.inputEnabled = true;
        g.events.onInputDown.add(this.onClickPiece, this, 0, index, this._g_p1, this._g_bt_j1, this._game.getP1());
        this.drawPiece(g, piece);
        this.piecesP1.add(g);
        x += this.positions.uiP1.cell.size*4;
        index++;
      }
    }

    drawPiecesP2(){
      var x = 0;
      var index = 0;
      this.piecesP2.removeAll();
      for(var piece of this._game.getP2().getPieces()){
        var g = this.game.add.graphics(x, 0);
        g.inputEnabled = true;
        g.events.onInputDown.add(this.onClickPiece, this, 0, index, this._g_p2, this._g_bt_j2,this._game.getP2());
        this.drawPiece(g, piece);
        this.piecesP2.add(g);
        x += this.positions.uiP2.cell.size*4;
        index++;
      }
    }

    drawEmptyCells(graphics, coords){
      //graphics.lineStyle(4, 0X29A9FF, 1);
      graphics.beginFill('0xFFFFFF');
      graphics.alpha = 0.8;
      for( var coord of coords){
        graphics.drawCircle(coord.x*this.positions.cell.size+this.positions.cell.size/2, coord.y*this.positions.cell.size+this.positions.cell.size/2, this.positions.cell.size, this.positions.cell.size);
      }
    }

    drawFullCells(graphics, coords){
      graphics.beginFill('0x000000');
      graphics.alpha = 0.8;
      for( var coord of coords){
        graphics.drawCircle(coord.x*this.positions.cell.size+this.positions.cell.size/2, coord.y*this.positions.cell.size+this.positions.cell.size/2, this.positions.cell.size, this.positions.cell.size);
      }
    }


    drawPlayer(x,y,color0x,color,player: GamePlay.PlayerInGame) : any{

      var coord = player.getCoord();
      var name = player.name;

      var group = this.game.add.group();
      group.x = (x+coord.x*this.positions.cell.size );
      group.y = (y+coord.y*this.positions.cell.size );
      //var img =  this.game.add.sprite(0, 0, 'cell');
      var g = this.game.add.graphics(1,1);
      g.beginFill(color0x);
      g.drawCircle( this.positions.cell.size/2, this.positions.cell.size/2, 2*this.positions.cell.size/3);
      //g.filters = [ this.game.add.filter('Glow') ];
      g.alpha = 0.8;
      name.toLowerCase();
      name.charAt(0).toUpperCase();
      // var t = this.game.add.text(this.positions.cell.size/3, this.positions.cell.size/3, name.substring(0,2),  { font : 'Arial', fontSize : 15, boundsAlignH : 'center', fill: color});

      group.add(g); // pion
      //group.add(img);
      //group.add(t); // pseudo

      return group;
    }

    drawPlayButton(g,active){

      g.clear();
      g.beginFill(0x007DB3);
      g.lineStyle(4, 0x007DB3, 1);
      g.drawCircle( this.positions.cell.size/2, this.positions.cell.size/2, 2*this.positions.cell.size/3);

      if(active == true){
        g.inputEnabled = true;
        g.lineStyle(2,0xffffff, 1);
      }
      else{
        g.inputEnabled = false;
        g.lineStyle(2,0x00577D, 1);
      }

      g.moveTo((this.positions.cell.size/2)-(this.positions.cell.size/9), (2*this.positions.cell.size/3)/2);
      g.lineTo((this.positions.cell.size/2)-(this.positions.cell.size/9),(2*this.positions.cell.size/3));

      g.moveTo((this.positions.cell.size/2)-(this.positions.cell.size/9), (2*this.positions.cell.size/3)/2);
      g.lineTo((this.positions.cell.size/2)+(this.positions.cell.size/9),2*this.positions.cell.size/4);

      g.moveTo((this.positions.cell.size/2)+(this.positions.cell.size/9),2*this.positions.cell.size/4);
      g.lineTo((this.positions.cell.size/2)-(this.positions.cell.size/9),(2*this.positions.cell.size/3));
    }

    drawTimelineP1(){
      var g = this._g_timeline_p1;
      g.clear();
      g.lineStyle(2,0xffffff, 1);
      g.x = 4*this.positions.cell.size/3;
      g.y =  this.positions.board.y-this.positions.cell.size;
      //g.moveTo(this.positions.cell.size/2, this.positions.board.y-this.positions.cell.size);
      g.lineTo(640-4*this.positions.cell.size/3-this.positions.cell.size, 0);
    }

    drawTimelineP2(){
      var g = this._g_timeline_p2;
      g.x = this.positions.cell.size;
      g.y = this.positions.board.y+this.positions.cell.size*9;
      g.clear();
      g.lineStyle(2,0xffffff, 1);
      g.lineTo(640-4*this.positions.cell.size/3, 0);
    }

    drawPiece(graphics, piece: GamePlay.Piece){

      var lastCoord : GamePlay.Coord;

      // on applique pas de rotation aux piéces dessiner destinées à être jouées
      graphics.lineStyle(3, 0x055C82, 1);
      graphics.beginFill(piece.color);
      for(var coord of piece.getCoords(0)){
        graphics.drawRect(coord.x*this.positions.uiP2.cell.size, coord.y*this.positions.uiP2.cell.size,this.positions.uiP2.cell.size, this.positions.uiP2.cell.size);
        lastCoord = coord;
      }
      // on dessine une ligne
      graphics.lineStyle(3, 0x000000, 1);
      graphics.beginFill(0x000000);
      graphics.moveTo(this.positions.uiP2.cell.size/2,this.positions.uiP2.cell.size/2);
      graphics.lineTo(this.positions.uiP2.cell.size/2+coord.x*this.positions.uiP2.cell.size,this.positions.uiP2.cell.size/2+coord.y*this.positions.uiP2.cell.size);

    }

    drawBoard(graphics, board: GamePlay.Board){
      graphics.lineStyle(3, 0x055C82, 1);
      graphics.beginFill('0xE0F6FF');

      for ( var y = 0; y < board.getSize(); y ++){
        for(var x = 0; x < board.getSize(); x ++){
          graphics.drawCircle(x*this.positions.cell.size+this.positions.cell.size/2, y*this.positions.cell.size+this.positions.cell.size/2, this.positions.cell.size-5);
        }
      }
    }
  }
}
