import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    login(params) {
        return this.httpClient.post(`/v1/api/login/login`, null, {params});
    }
}

export class LoginPara {
    password: string;
    acctName: string;
    wcOpenId: string;
}

export class LoginUser {
    id: number;
    createTime: number;
    enabled: number;
    acctName: string;
    phone: string;
    loginToken: string;
}
