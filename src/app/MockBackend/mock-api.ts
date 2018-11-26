import { Position } from '../Model/position';
import { Path } from '../Model/path';

const position1: Position = { id: 1, lon: 1.123, lat: 3.321 };
const position2: Position = { id: 2, lon: 32.123, lat: 40.321 };
const position3: Position = { id: 3, lon: 48.123, lat: 64.321 };
const path1: Path = { start: position1, end: position2 };
const path2: Path = { start: position2, end: position3 };
const path3: Path = { start: position3, end: position1 };

export const ApiRest: RestApi[] = [
    {
        url: "/api/nearestpoint",
        method: "GET",
        objectToReturn: position1
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
