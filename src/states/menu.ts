import * as Phaser from 'phaser'

export class MenuState extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.add.button(100, 100, 'newGameButton', this.newGameAction, this, 1, 0);
  }

  render () {}

  newGameAction () {
    console.log('newGameAction');
  }
}
