import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    getQNToken(): Observable<any> {
        return this.httpClient.get('/common/getQnToken', {});
    }

    uploadQN() {
        // return this.httpClient.post()
    }
}
