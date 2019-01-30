export interface IApiRest {
    url: string;
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    objectToReturn: any;
}
