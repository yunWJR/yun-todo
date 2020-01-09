import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class PlanTarget {
    id: number;
    target: string;
    remark: string;
    priority: number;
    status: number;
}

@Injectable({
    providedIn: 'root'
})
export class RecordTargetService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    getList(params) {
        return this.httpClient.get('/v1/api/planTarget/pageList', {params});
    }
}
