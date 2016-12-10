import * as Phaser from 'phaser'
import LevelData from '../types/level-data';
import CFG from '../config';
import Player from '../sprites/player';

enum ControlState {
    NONE
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

        this.buildLevel();
    }

    render () {}

    update () {
        this.readInput();
    }

    buildLevel () {
        this.buildFloor();
        this.buildLevelBoundaries();
        this.buildLevelObjects();
        this.placePlayer();
        this.placeCastle();
        this.placeSpawns();

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
    }

    buildLevelObjects () {
        this.objects = this.game.add.group();

        this.data.objects.forEach((o) => {
            switch (o.type) {
                case 'block':
                    this.objects.create(o.x * CFG.TILE_SIZE, o.y * CFG.TILE_SIZE, 'block');
                    break;
            }
        });
    }

    placePlayer () {
        this.player = new Player({
            game: this.game,
            x: this.data.playerStart.x,
            y: this.data.playerStart.y
        });

        this.game.add.existing(this.player);
    }

    placeCastle () {
        this.game.add.sprite(this.data.castle.x * CFG.TILE_SIZE, this.data.castle.y * CFG.TILE_SIZE, 'castle');
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

        if (cursors.down.isDown) {
            this.player.move(0, 1 * CFG.PLAYER_SPEED * this.time.elapsed / 1000);
        }

        if (cursors.up.isDown) {
            this.player.move(0, -1 * CFG.PLAYER_SPEED * this.time.elapsed / 1000);
        }

        if (cursors.left.isDown) {
            this.player.move(-1 * CFG.PLAYER_SPEED * this.time.elapsed / 1000, 0);
        }

        if (cursors.right.isDown) {
            this.player.move(1 * CFG.PLAYER_SPEED * this.time.elapsed / 1000, 0);
        }
    }

}
