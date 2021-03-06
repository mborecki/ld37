import * as Phaser from 'phaser';

export class BootState extends Phaser.State {
  stage: Phaser.Stage

  init () {
    this.stage.backgroundColor = '#EDEEC9'
  }

  preload () {

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5)

    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
  }

  render () {
    this.game.state.start('Splash')
  }
}
