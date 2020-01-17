import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeTemplateService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    list() {
        return this.httpClient.get(`/v1/api/record/themeTemplate/list`);
    }

    //
    // page(params) {
    //     return this.httpClient.get(`/v1/api/record/themeTemplate/page`, {params});
    // }
    //
    info(themeId: number, params) {
        return this.httpClient.get(`/v1/api/record/themeTemplate/${themeId}`, {params});
    }
    //
    // delete(themeId: number) {
    //     return this.httpClient.delete(`/v1/api/record/themeTemplate/${themeId}`);
    // }
    //
    // create(body: ThemeDto) {
    //     return this.httpClient.post(`/v1/api/record/themeTemplate`, body);
    // }
}
