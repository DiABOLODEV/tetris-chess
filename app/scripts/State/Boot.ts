module Chess.State {
  export class Boot extends Phaser.State {
    preload() {
      this.load.image('preload-bar', 'assets/images/preload-bar.png');
    }

    create() {
      // Assign global settings here
      
      this.game.state.start('preload');
    }
  }
}