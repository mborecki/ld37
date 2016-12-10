import * as Phaser from 'phaser'
import * as _ from 'lodash';
import Enemy, {EnemyParams} from '../enemy';
import AI from '../../ai/ai';
import CFG from '../../config';

type Params = {
    game: Phaser.Game,
    x: number,
    y: number
}

export default class StupidElf extends Enemy {
    velocity: 50;

    constructor(p: Params) {
        super(<any>_.assign({spriteKey: 'elf'}, p));
    }

    update() {
        super.update();
        let goal = AI.getShotestPathToCastle([this.x, this.y]);

        this.move(goal[0] * CFG.TILE_SIZE, goal[1] * CFG.TILE_SIZE);
    }
}
