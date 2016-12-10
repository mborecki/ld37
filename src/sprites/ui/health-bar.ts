import * as Phaser from 'phaser'

export default class Health extends Phaser.Sprite {
    value: number;
    baseScale: number;

    constructor(game, x = 0, y = 0, maxWith = 100) {

        super(game, x, y, 'healthBar');

        this.baseScale = maxWith / 100;
        this.setValue(1);
    }

    setValue (v: number) {
        this.value = v;
        this.scale.x = this.baseScale * this.value;
    }
}
