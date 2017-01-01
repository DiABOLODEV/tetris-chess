module Chess.State {
  export class Preload extends Phaser.State {
    private preloadBar: Phaser.Sprite;

    preload() {
      this.game.load.image('cell', './assets/cell.png');
    }

    create() {
      this.game.state.start('menu');
    }
  }
}
