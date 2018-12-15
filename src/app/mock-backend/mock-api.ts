import { Position } from 'model/position';
import { Path } from 'model/path';

export const paris: Position = { id: 1, lon: 48.856783, lat: 2.348773 };
export const metz: Position = { id: 2, lon: 49.119457, lat: 6.175982 };
export const charleville: Position = { id: 3, lon: 49.762460, lat: 4.722300 };
export const path1: Path = { start: paris, end: metz };
export const path2: Path = { start: metz, end: charleville };
export const path3: Path = { start: charleville, end: paris };

export const ApiRest: RestApi[] = [
    {
        url: "/nearestpoint",
        method: "GET",
        objectToReturn: paris
    },
    {
        url: "/positions",
        method: "GET",
        objectToReturn: [paris, metz, charleville]
    },
    {
        url: "/path",
        method: "GET",
        objectToReturn: [path2]
    },
    {
        url: "/tsp",
        method: "GET",
        objectToReturn: [path1, path2, path3]
    }
];

export interface RestApi {
    url: string;
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    objectToReturn: any;
}
