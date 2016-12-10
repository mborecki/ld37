import LevelObject from './level-object';

type LevelData = {
    id: number,
    width: number,
    height: number,
    playerStart: {
        x: number,
        y: number
    },
    castle: {
        x: number,
        y: number
    }
    spawns: Array<{x: number, y: number}>,
    objects: Array<LevelObject>
}

export default LevelData;
