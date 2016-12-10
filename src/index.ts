/// <reference path="../lib/phaser.d.ts"/>
/// <reference path="../typings/index.d.ts"/>
import * as Phaser from 'phaser'

import {BootState} from './states/boot'
import {SplashState} from './states/splash'
import {MenuState} from './states/menu'
import {GameLevelState} from './states/game-level'

class Game extends Phaser.Game {

  constructor () {
    let width = document.documentElement.clientWidth;
    let height = document.documentElement.clientHeight;

    super(width, height, Phaser.AUTO, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Menu', MenuState, false)
    this.state.add('GameLevel', GameLevelState, false)

    this.state.start('Boot')
  }
}

new Game()
