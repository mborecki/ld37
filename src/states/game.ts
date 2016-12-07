import * as Phaser from 'phaser'
import {Mushroom} from '../sprites/mushroom'
import {setResponsiveWidth} from '../utils'

export class GameState extends Phaser.State {
  mushroom: Mushroom

  init () {}
  preload () {}

  create () {
    let banner = this.add.text(this.game.world.centerX, this.game.height - 30, 'Phaser + ES6 + Webpack', {})
    banner.font = 'Arial'
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.anchor.setTo(0.5)

    this.mushroom = new Mushroom({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      asset: 'mushroom'
    })

    // set the sprite width to 30% of the game width
    setResponsiveWidth(this.mushroom, 30, this.game.world)
    this.game.add.existing(this.mushroom)
  }

  render () {
    if (window['__DEV__']) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
