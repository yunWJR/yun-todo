import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataStorage {
    constructor() {
    }

    saveLoginToken(token: string) {
        localStorage.setItem('token', token);
    }

    getLoginToken(): string {
        const token = localStorage.getItem('token') || '';

        return token;
    }
}
