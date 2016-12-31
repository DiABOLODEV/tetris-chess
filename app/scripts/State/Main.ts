  module Chess.State {


      
  export class Main extends Phaser.State {
    _cellSize : number = 50; // 50px
    _game : GamePlay.Game;
    _g_p1;
    _g_p2;
    _g_piece;
    _piece_index_selected;
    _piece_rotate_selected;
    create() {
      this.stage.backgroundColor = 0xFFFFFF;
      
      // le gameplay
      this._game = new GamePlay.Game(GamePlay.BOARDS[0], new GamePlay.PlayerInGame('titi'), new GamePlay.PlayerInGame('ika'));
      
      // le plateau
      var g_board = this.game.add.graphics(this._cellSize*4, this._cellSize);
      this.drawBoard(g_board,this._game.getBoard());
      
      // les cases pleines du plateau
      var g_fullCells = this.game.add.graphics(this._cellSize*4, this._cellSize);
      this.drawFullCells(g_fullCells, this._game.getBoard().getFullCells()); // case intouchable
      
      // les cases empty du plateau
      var g_emptyCells = this.game.add.graphics(this._cellSize*4, this._cellSize);
      this.drawEmptyCells(g_emptyCells, this._game.getBoard().getEmptyCells()); // case intouchable
      
      // les joueurs
      this._g_p1 = this.drawPlayer(this._cellSize*4,this._cellSize, '0xF8FCAC', '#BA7C07',this._game.getP1());
      this._g_p2 = this.drawPlayer(this._cellSize*4,this._cellSize ,'0xF8FCAC', '#BA7C07',this._game.getP2()); 
      
      // la piece en prévision sur le plateau
      this._g_piece = this.game.add.graphics(this._cellSize*4,this._cellSize);

      // les pieces des joueurs
      // pour chaques pieces on crée un graphique avec un evenement au clique
      // l'index de graphics <> index des pieces des joueurs
      var y = 50;
      var index = 0;
      for(var piece of this._game.getP1().getPieces()){
        var g = this.game.add.graphics(this._cellSize,y);
        g.inputEnabled = true;
        g.events.onInputDown.add(this.onClickPiece, this, 0, index, this._g_p1, this._game.getP1());
        this.drawPiece(g, piece);
        y += 150;
        index++;
      }
      // le bouton jouer
      var bt = this.game.add.text(this._cellSize, y, 'Jouer',  { font : 'Arial', fontSize : 16, boundsAlignH : 'center'});
      bt.inputEnabled = true;
      // on joue la piece de p1
      bt.events.onInputDown.add(this.onPlay, this, 0,this._g_p1, this._game.getP1());

      y = 50;
      index = 0;
      for(var piece of this._game.getP2().getPieces()){
         var g = this.game.add.graphics(this._cellSize*13,y);
        g.inputEnabled = true;
        g.events.onInputDown.add(this.onClickPiece, this, 0, index, this._g_p2, this._game.getP2());
        this.drawPiece(g, piece);
        y += 150;
        index++;
      }
        // le bouton jouer
      var bt = this.game.add.text(this._cellSize*13, y, 'Jouer',  { font : 'Arial', fontSize : 16, boundsAlignH : 'center'});
      bt.inputEnabled = true;
      // on joue la piece de p1
      bt.events.onInputDown.add(this.onPlay, this, 0,this._g_p2, this._game.getP2());
      

      
      
    }
    onPlay(g,p, graphic,  player){
      //on joue la piece selected
      if(this._piece_index_selected < 0 && this._piece_index_selected >= player.getPieces().length){
        alert('Aucune piece selec');
        return;
      }
      if(this._game.playIsValid(player.getPieces()[this._piece_index_selected],player)){
             this._game.play(player.getPieces()[this._piece_index_selected],player);
            this.movePlayer(this._cellSize*4,this._cellSize, graphic, player.getCoord());
             if(player.isWin()){
               alert(player.name + ' gagne !');
             }
           }
           else{
             alert('Impossible de jouer cette piéce');
           }
      this._g_piece.clear();
      this._piece_index_selected = -1;
        
           
    }
    onClickPiece(g,p,index, graphic, player){
      
      // gestion de la piece selectionné et la rotation globale
      // on réutilise le vars pour afficher le piece / jouer
      if(index == this._piece_index_selected){
        this._piece_rotate_selected += 1;
        if (this._piece_rotate_selected == 4){
          this._piece_rotate_selected = 0;
        }
      }else{
        this._piece_rotate_selected = 0;
         this._piece_index_selected = index;
      }
     
      // TODO this._piece_rotate_selected;
      this.showPieceOnBoard(player);
            
           /*if(this._game.playIsValid(player.getPieces()[index],player)){
             this._game.play(player.getPieces()[index],player);
            this.movePlayer(this._cellSize*4,this._cellSize, graphic, player.getCoord());
             if(player.isWin()){
               alert(player.name + ' gagne !');
             }
           }
           else{
             alert('Impossible de jouer cette piéce');
           }*/
       //alert('index piece p1 : '+index);
   
    }
    showPieceOnBoard(player){
      var coordPlayer = player.getCoord();
      var coordsPiece = player.getPieces()[this._piece_index_selected].getCoords(); //this._piece_rotate_selected
      var color;
      this._g_piece.clear();
      if(this._game.playIsValid(player.getPieces()[this._piece_index_selected], player)){
        color = '0XBFFF40'; //vert valide
      }else{
        color = '0XFF4040';
      }
      this._g_piece.lineStyle(4, color, 1);
      for(var coord of coordsPiece){
        this._g_piece.drawRect((coordPlayer.x+coord.x)*this._cellSize, (coordPlayer.y+coord.y)*this._cellSize, this._cellSize, this._cellSize)
      }
      
      // redessine la derniére case avec un fond
      this._g_piece.alpha = 0.5;
      this._g_piece.beginFill(color);
      this._g_piece.drawRect((coordPlayer.x+coord.x)*this._cellSize, (coordPlayer.y+coord.y)*this._cellSize, this._cellSize, this._cellSize)

    }
    movePlayer(x,y,graphics, coord){
      //var actualCoord = {graphics.x, graphics.y};
        let tween = this.game.add.tween(graphics);
        tween.to({ x: (x+coord.x*this._cellSize), y: (y+coord.y*this._cellSize)}, 800,  Phaser.Easing.Circular.Out, true);
    }
    
    drawEmptyCells(graphics, coords){
      graphics.lineStyle(2, 0X29A9FF, 1);
      graphics.beginFill('0xC1ECF5');
      
      for( var coord of coords){
         graphics.drawRect(coord.x*this._cellSize, coord.y*this._cellSize, this._cellSize, this._cellSize);
      }
    }
    
    drawFullCells(graphics, coords){
      graphics.lineStyle(2, 0X000000, 1);
      graphics.beginFill('0x000000');
      
      for( var coord of coords){
         graphics.drawRect(coord.x*this._cellSize, coord.y*this._cellSize, this._cellSize, this._cellSize);
      }
    }
    
    
    drawPlayer(x,y,color0x,color,player: GamePlay.PlayerInGame) : any{
      
      var coord = player.getCoord();
      var name = player.name;
    
      var group = this.game.add.group();
      group.x = (x+coord.x*this._cellSize );
      group.y = (y+coord.y*this._cellSize );
      
      var g = this.game.add.graphics(1,1);
      g.lineStyle(0);
      g.beginFill(color0x);
      //g.drawCircle( 0, 0, this._cellSize/2);
      g.drawRect(0,0, this._cellSize-2, this._cellSize-2);
      g.alpha = 0.8;
      name.toLowerCase();
      name.charAt(0).toUpperCase();
      var t = this.game.add.text(this._cellSize/3, this._cellSize/3, name.substring(0,2),  { font : 'Arial', fontSize : 15, boundsAlignH : 'center', fill: color});
    
      group.add(g); // pion
      group.add(t); // pseudo
      
      return group;
    }
    
    drawPiece(graphics, piece: GamePlay.Piece){
       graphics.lineStyle(2, 0X37383a, 1);
       graphics.beginFill('0xFFFFFF');
    
      for(var coord of piece.getCoords()){
          graphics.drawRect(coord.x*this._cellSize/2, coord.y*this._cellSize/2, this._cellSize/2, this._cellSize/2);
      }

    }
    
    drawBoard(graphics, board: GamePlay.Board){
      graphics.lineStyle(2, 0X37383a, 1);
      
      for ( var y = 0; y < board.getSize(); y ++){
          for(var x = 0; x < board.getSize(); x ++){
              graphics.lineStyle(2, 0X37383a, 1);
              graphics.beginFill('0xFFFFFF');
              graphics.drawRect(x*this._cellSize, y*this._cellSize, this._cellSize, this._cellSize);
          }
      }
  }
}
}
