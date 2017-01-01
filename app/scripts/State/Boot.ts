module Chess.State {
  export class Boot extends Phaser.State {
    preload() {

    }

    create() {
      // Assign global settings here

      this.game.state.start('preload');

    }
  }
}
