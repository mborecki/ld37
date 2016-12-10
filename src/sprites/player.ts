import * as Phaser from 'phaser'
import CFG from '../config';

type PlayerParams = {
    game: Phaser.Game,
    x: number,
    y: number
}

export default class Player extends Phaser.Sprite {
    constructor(p: PlayerParams) {
        super(p.game, p.x, p.y, 'player');
    }

    move ([x,y]: [number, number]) {
        console.log('Player.move', x, y)
        this.body.velocity.setTo(x * CFG.PLAYER_SPEED,y * CFG.PLAYER_SPEED);
    }
}
