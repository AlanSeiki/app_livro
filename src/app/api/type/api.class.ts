
import { isNumber, isString } from '@functions';
import { ApiInterface } from './api.interface';

export class Api {
    activity?: string;
    type?: string;
    link?: string;
    key?: string;
    participants?: number;
    accessibility?: number;
    price?: number;

    constructor(data: ApiInterface) {
        this.activity = isString(data.activity);
        this.type = isString(data.type);
        this.link = isString(data.link);
        this.key = isString(data.key);
        this.participants = isNumber(data.participants);
        this.accessibility = isNumber(data.accessibility);
        this.price = isNumber(data.price);
    }
}


