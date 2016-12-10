type Vector = [number, number] | number[];

export function normalTo(s: Vector, t: Vector) : Vector {
    return normal([t[0] - s[0], t[1] - s[1]]);
}

export function normal(v: Vector) {
    let s = size(v);

    return [v[0] / s, v[1] / s];
}

export function distance(a: Vector, b: Vector) : number {
    let dx = a[0] - b[0];
    let dy = a[1] - b[1];
    return Math.sqrt(dx*dx + dy*dy);
}

export function size(v: Vector) : number {
    return distance([0,0], v);
}
