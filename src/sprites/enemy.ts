import * as Phaser from 'phaser'
import CFG from '../config';
import {normalTo} from '../utils/math';
import HealthBar from './ui/health-bar';

export type EnemyParams = {
    game: Phaser.Game,
    x: number,
    y: number,
    spriteKey: string
}

export default class Enemy extends Phaser.Sprite {
    velocity: number = 10;
    maxHealth: number = 100;
    health : number = this.maxHealth;
    healthBar: HealthBar;

    constructor(p: EnemyParams) {
        super(p.game, p.x, p.y, p.spriteKey);
    }

    update() {
        this.damage(0.1);

        if (this.alive && this.health < this.maxHealth) {
            if (!this.healthBar) {
                this.healthBar = new HealthBar(this.game, 0, -7, this.width);
                this.addChild(this.healthBar);
            }

            this.healthBar.setValue(this.health / this.maxHealth);
        }


    }

    move(x ,y) {
        let v = normalTo([this.x, this.y], [x, y]);
        this.body.velocity.setTo(v[0] * this.velocity, v[1] * this.velocity);
    }
}
