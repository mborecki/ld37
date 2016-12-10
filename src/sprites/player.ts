import * as Phaser from 'phaser'

type PlayerParams = {
    game: Phaser.Game,
    x: number,
    y: number
}

export default class Player extends Phaser.Sprite {
    constructor(p: PlayerParams) {
        super(p.game, p.x, p.y, 'player');
    }
}
