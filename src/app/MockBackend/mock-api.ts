import { Position } from '../Model/position';
import { Path } from '../Model/path';

const paris: Position = { id: 1, lon: 48.856783, lat: 2.348773 };
const metz: Position = { id: 2, lon: 49.119457, lat: 6.175982 };
const charleville: Position = { id: 3, lon: 49.762460, lat: 4.722300 };
const path1: Path = { start: paris, end: metz };
const path2: Path = { start: metz, end: charleville };
const path3: Path = { start: charleville, end: paris };

export const ApiRest: RestApi[] = [
    {
        url: "/api/nearestpoint",
        method: "GET",
        objectToReturn: paris
    },
    {
        url: "/api/positions",
        method: "GET",
        objectToReturn: [paris, metz, charleville]
    },
    {
        url: "/api/path",
        method: "GET",
        objectToReturn: [path1, path2]
    },
    {
        url: "/api/tsp",
        method: "GET",
        objectToReturn: [path1, path2, path3]
    }
];

export interface RestApi {
    url: string;
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    objectToReturn: any;
}
