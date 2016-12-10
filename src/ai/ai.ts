type Vector = [number, number] | number[];

class AI {
    map: Array<Array<number>>;
    map_w: number;
    map_h: number;

    castle: Vector;

    init (w: number, h: number) {
        this.map_w = w;
        this.map_h = h;
    }

    setCastle(v : Vector) {
        this.castle = v;
    }

    getShotestPathToCastle(start) : Vector {
        return this.castle;
    }
}

export default new AI();
