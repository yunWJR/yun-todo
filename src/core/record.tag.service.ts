import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class TagStatus {
    id: number;
    name: string;
    select: number;
}

@Injectable({
    providedIn: 'root'
})

export class RecordTagService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    getList(planId, itemId) {
        return this.httpClient.get(`/v1/api/tagRecord/list/${planId}/${itemId}`);
    }
}
