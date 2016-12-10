import * as Phaser from 'phaser'
import LevelData from '../types/level-data';
import CFG from '../config';
import Player from '../sprites/player';

export class GameLevelState extends Phaser.State {
    data: LevelData;
    floor: Phaser.Group;
    walls: Phaser.Group;
    castle: Phaser.Sprite;
    player: Player;

    init (levelData: LevelData) {
        this.data = levelData;
    }

    preload () {}

    create () {
        console.log('Level Data', this.data);

        this.buildLevel();
    }

    render () {}

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

    buildLevelObjects () {console.error('TODO!')}

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

    startLevel () {console.error('TODO!')}
}
