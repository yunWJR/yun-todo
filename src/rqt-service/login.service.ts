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

    register(params) {
        return this.httpClient.post(`/v1/api/login/register`, null, {params});
    }

    login(params) {
        return this.httpClient.post(`/v1/api/login/login`, null, {params});
    }

    info() {
        return this.httpClient.get(`/v1/api/my/myInfo`);
    }

    checkThemeTemplate() {
        return this.httpClient.post(`/v1/api/record/theme/checkTemplate`, null);
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
