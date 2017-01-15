import * as Phaser from 'phaser'
import CFG from '../config';
import Wearpon from '../types/wearpon';

type PlayerParams = {
    game: Phaser.Game,
    x: number,
    y: number
}

export default class Player extends Phaser.Sprite {
    wearpon: Wearpon;

    constructor(p: PlayerParams) {
        super(p.game, p.x, p.y, 'player');
    }

    move ([x,y]: [number, number]) {
        this.body.velocity.setTo(x * CFG.PLAYER_SPEED,y * CFG.PLAYER_SPEED);
    }

    equip(w: Wearpon) {
        this.wearpon = w;
    }

    attack(x, y) {
        if (this.wearpon) {
            this.wearpon.attack([x, y], [this.x, this.y]);
        }
    }
}
