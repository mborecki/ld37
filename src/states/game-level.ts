import * as Phaser from 'phaser'
import LevelData from '../types/level-data';
import CFG from '../config';
import Player from '../sprites/player';
import AI from '../ai/ai';

import StupidElf from '../sprites/enemies/stupid-elf';

enum ControlState {
    NONE,
    PLAYER
}

export class GameLevelState extends Phaser.State {
    data: LevelData;
    floor: Phaser.Group;
    walls: Phaser.Group;
    castle: Phaser.Sprite;
    player: Player;
    objects: Phaser.Group;

    controlState: ControlState = ControlState.NONE;

    init (levelData: LevelData) {
        this.data = levelData;
    }

    preload () {}

    create () {
        console.log('Level Data', this.data);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.buildLevel();
    }

    render () {}

    update () {

        this.game.physics.arcade.collide(this.player, this.objects);
        this.game.physics.arcade.collide(this.player, this.walls);

        this.readInput();
    }

    buildLevel () {
        this.buildFloor();
        this.buildLevelBoundaries();
        this.buildLevelObjects();
        this.placePlayer();
        this.placeCastle();
        this.placeSpawns();

        this.addDebugElf();

        this.startLevel();
    }

    buildFloor () {
        this.floor = this.game.add.group();

        for (let i=0; i < this.data.width; i++) {
            for (let j=0; j < this.data.height; j++) {
                this.floor.create(i*CFG.TILE_SIZE, j*CFG.TILE_SIZE, 'floorTile');
            }
        }
    }

    buildLevelBoundaries () {
        this.walls = this.game.add.group();

        for (let i = -20; i <= this.data.width * CFG.TILE_SIZE; i = i + 20) {
            this.walls.create(i, -20, 'wallTile');
            this.walls.create(i, this.data.height * CFG.TILE_SIZE, 'wallTile');
        }

        for (let j = 0; j < this.data.height * CFG.TILE_SIZE; j = j + 20) {
            this.walls.create(-20, j, 'wallTile');
            this.walls.create(this.data.width * CFG.TILE_SIZE, j, 'wallTile');
        }

        this.game.physics.arcade.enable(this.walls);
        this.walls.enableBody = true;
        this.walls.forEach((s: Phaser.Sprite) => {
            s.body.immovable = true;
        }, this)
    }

    buildLevelObjects () {
        this.objects = this.game.add.group();

        this.data.objects.forEach((o) => {
            switch (o.type) {
                case 'block':
                    let s = this.objects.create(o.x * CFG.TILE_SIZE, o.y * CFG.TILE_SIZE, 'block');
                    this.game.physics.arcade.enable(s);
                    s.body.enable = true;
                    s.body.immovable = true;


                    break;
            }
        });

    }

    placePlayer () {
        this.player = new Player({
            game: this.game,
            x: this.data.playerStart.x * CFG.TILE_SIZE,
            y: this.data.playerStart.y * CFG.TILE_SIZE
        });

        this.game.add.existing(this.player);

        this.game.physics.arcade.enable(this.player);

        this.player.body.collideWorldBounds = true;
    }

    placeCastle () {
        this.game.add.sprite(this.data.castle.x * CFG.TILE_SIZE, this.data.castle.y * CFG.TILE_SIZE, 'castle');
        AI.setCastle([this.data.castle.x, this.data.castle.y])
    }

    placeSpawns () {console.error('TODO!')}

    startLevel () {
        this.controlState = ControlState.PLAYER;
    }

    readInput () {
        switch (this.controlState) {
            case ControlState.PLAYER:
                this.readInputPlayerState();
        }
    }

    readInputPlayerState () {
        let cursors = this.game.input.keyboard.createCursorKeys();

        let moveVector  : [number, number] = [0, 0]

        if (cursors.down.isDown) {
            moveVector[1] += 1;
        }

        if (cursors.up.isDown) {
            moveVector[1] += -1;
        }

        if (cursors.left.isDown) {
            moveVector[0] += -1;
        }

        if (cursors.right.isDown) {
            moveVector[0] += 1;
        }

        // this.game.physics.arcade.moveToXY(this.player, this.player.x + moveVector[0], this.player.y + moveVector[1]);
        this.player.move(moveVector);
    }

    addDebugElf() {
        let elf = new StupidElf({
            game: this.game,
            x: 19 * CFG.TILE_SIZE,
            y: 9 * CFG.TILE_SIZE
        });

        this.game.physics.arcade.enable(elf);

        this.game.add.existing(elf);
    }

}
