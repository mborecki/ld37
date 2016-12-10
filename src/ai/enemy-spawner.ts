import * as Phaser from 'phaser'
import CFG from '../config';
import StupidElf from '../sprites/enemies/stupid-elf';

export default class Spawner {
    value: number = 5;
    game: Phaser.Game;
    group: Phaser.Group;
    x: number;
    y: number;

    constructor(game, group, x, y) {
        this.game = game;
        this.group = group;
        this.x = x;
        this.y = y;
    }

    addValue (v : number) {
        this.value += v;
    }

    update () {
        this.value += this.game.time.elapsed / 1000;

        if (this.value > 5) {
            this.spawnElf();
            this.value -= 5;
        }
    }

    spawnElf () {
        let elf = new StupidElf({
            game: this.game,
            x: this.x,
            y: this.y
        });

        this.game.physics.arcade.enable(elf);

        this.game.add.existing(elf);
    }
}

