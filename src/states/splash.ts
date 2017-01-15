import * as Phaser from 'phaser'
import {centerGameObjects} from '../utils'
import CFG from '../config';

export class SplashState extends Phaser.State {
  loaderBg: Phaser.Sprite
  loaderBar: Phaser.Sprite

  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //

    // MENU
    this.load.spritesheet('newGameButton', 'assets/images/ui/new-game-button.png', 270, 80);


    // LEVEL DATA
    this.load.json('levelData1', 'assets/game-data/level1.json')

    // LEVEL ASSETS
    this.load.spritesheet('floorTile', 'assets/images/level/tile.png', CFG.TILE_SIZE, CFG.TILE_SIZE);
    this.load.spritesheet('wallTile', 'assets/images/level/wall.png', 20, 20);
    this.load.spritesheet('castle', 'assets/images/level/flag.png', CFG.TILE_SIZE, CFG.TILE_SIZE);
    this.load.spritesheet('block', 'assets/images/level/block.png', CFG.TILE_SIZE, CFG.TILE_SIZE);

    // UI ASSETS
    this.load.spritesheet('healthBar', 'assets/images/ui/health-bar.png', 100, 5);

    // PLAYER ASSETS
    this.load.spritesheet('player', 'assets/images/level/player.png', CFG.TILE_SIZE, CFG.TILE_SIZE);
    this.load.spritesheet('stick', 'assets/images/weapons/stick', 5, 50);

    // ENEMIES ASSETS
    this.load.spritesheet('elf', 'assets/images/level/elf.png', 30, 30);
  }

  create () {
    this.game.state.start('Menu')
  }

}
