import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class Tag {
    id: number;
    appId: number;
    name: string;
    remark: string;
    createTime: number;
}

@Injectable({
    providedIn: 'root'
})
export class PlanTagService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    addItem(data) {
        return this.httpClient.post(`/v1/api/tag`, data);
    }

    getPageList(params) {
        return this.httpClient.get('/v1/api/tag/pageList', {params});
    }

    getList(params) {
        return this.httpClient.get('/v1/api/tag/list', {params});
    }

    detail(tagId) {
        return this.httpClient.get(`/v1/api/tag/${tagId}`);
    }

    delete(tagId) {
        return this.httpClient.delete(`/v1/api/tag/${tagId}`);
    }
}
