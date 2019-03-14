import { IApiRest } from "./apiRestInterface";

import { paths, cities, METZ, PARIS, CHARLEVILLE } from "./mock-data";

export const ApiRest: IApiRest[] = [
    {
        url: "/nearestpoint",
        method: "GET",
        objectToReturn: () => METZ
    },
    {
        url: "/positions",
        method: "GET",
        objectToReturn: () => [PARIS, METZ, CHARLEVILLE]
    },
    {
        url: "/path",
        method: "GET",
        objectToReturn: (req) => {
            const idStart: number = +req.params.get('startId');
            const idEnd: number = +req.params.get('endId');
            return paths.find(path => path.startPlace.id === idStart && path.endPlace.id === idEnd);
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
            return pathsBuild.map((pathsId) => paths.find(path => path.startPlace.id === pathsId.start && path.endPlace.id === pathsId.end));
        }
    },
    {
        url: "/searchbyname",
        method: "GET",
        objectToReturn: (req) => cities.filter((city) => city.name.indexOf(req.params.get('name')) >= 0)
    }
];
