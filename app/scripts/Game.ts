/// <reference path="../../bower_components/phaser-official/typescript/phaser.d.ts"/>

/// <reference path='State/Boot.ts'/>
/// <reference path='State/Preload.ts'/>
/// <reference path='State/Menu.ts'/>
/// <reference path='State/Main.ts'/>
/// <reference path='GamePlay/Model/coord.model.ts'/>
/// <reference path='GamePlay/Model/board.model.ts'/>
/// <reference path='GamePlay/Model/piece.model.ts'/>
/// <reference path='GamePlay/Model/player.interface.ts'/>
/// <reference path='GamePlay/Model/playerInGame.model.ts'/>
/// <reference path='GamePlay/Model/board.model.ts'/>
/// <reference path='GamePlay/Controller/game.controller.ts'/>
/// <reference path='GamePlay/Collection/boards.collection.ts'/>
/// <reference path='GamePlay/Collection/pieces.collection.ts'/>
module Chess {
  export class Game extends Phaser.Game {
    constructor() {
      super(640, 960, Phaser.AUTO, 'game-div');

      this.state.add('boot', State.Boot);
      this.state.add('preload', State.Preload);
      this.state.add('menu', State.Menu);
      this.state.add('main', State.Main);

      this.state.start('boot');
    }
  }
}

window.onload = () => {
  var game = new Chess.Game();
}
