import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataStorage {
    tokenKey: 'token';

    constructor() {
    }

    saveLoginToken(token: string) {
        localStorage.setItem(this.tokenKey, token);
    }

    getLoginToken(): string {
        const token = localStorage.getItem(this.tokenKey) || '';

        return token;
    }

    clearLoginToken() {
        localStorage.removeItem(this.tokenKey);
    }
}
