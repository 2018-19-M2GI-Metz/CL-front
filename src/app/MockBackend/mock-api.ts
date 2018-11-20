const position = { x: 1, y: 1 };

export const ApiRest: RestApi[] = [
    {
        url: "/api/position",
        method: "GET",
        objectToReturn: position
    }
];

export interface RestApi {
    url: string;
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    objectToReturn: any;
}
