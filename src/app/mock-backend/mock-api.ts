import { Position } from 'model/position';
import { Path } from 'model/path';
import { City } from 'model/city';

export const paris: Position = { id: 1, lon: 48.856783, lat: 2.348773 };
export const metz: Position = { id: 2, lon: 49.119457, lat: 6.175982 };
export const charleville: Position = { id: 3, lon: 49.762460, lat: 4.722300 };
export const path1: Path = { start: paris, end: metz };
export const path2: Path = { start: metz, end: charleville };
export const path3: Path = { start: charleville, end: paris };
export const path4: Path = { start: charleville, end: metz };
export const path5: Path = { start: metz, end: paris };
export const path6: Path = { start: paris, end: charleville };

export const cities: City[] =
    [
        { name: "metz", position: metz },
        { name: "paris", position: paris },
        { name: "charleville", position: charleville },
    ];
const paths: Path[] = [path1, path2, path3, path4, path5, path6];

export const ApiRest: RestApi[] = [
    {
        url: "/nearestpoint",
        method: "GET",
        objectToReturn: () => paris
    },
    {
        url: "/positions",
        method: "GET",
        objectToReturn: (req) => [paris, metz, charleville]
    },
    {
        url: "/path",
        method: "GET",
        objectToReturn: (req) => {
            const idStart: number = +req.params.get('idStart');
            const idEnd: number = +req.params.get('idEnd');
            return paths.find(path => path.start.id === idStart && path.end.id === idEnd);
        }
    },
    {
        url: "/tsp",
        method: "GET",
        objectToReturn: (req) => {
            const params: string[] = req.params.getAll('id');
            const pathsBuild: { start: number, end: number }[] = [];
            for (let i = 0; i < params.length - 1; i++) {
                pathsBuild.push({ start: +params[i], end: +params[i + 1] });
            }
            pathsBuild.push({ start: +params[params.length - 1], end: +params[0] });
            return pathsBuild.map((pathsId) => paths.find(path => path.start.id === pathsId.start && path.end.id === pathsId.end));
        }
    },
    {
        url: "/cities",
        method: "GET",
        objectToReturn: (req) => cities
    }
];

export interface RestApi {
    url: string;
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    objectToReturn: any;
}
