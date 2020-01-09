import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class Plan {
    id: number;
    createTime: number;
    appId: number;
    name: string;
    startTime: number;
    status: number;
    endTime: number;
    remark: string;
    executorName: string;
}

@Injectable({
    providedIn: 'root'
})
export class PlanService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    remove(id) {
        return this.httpClient.delete(`/v1/api/plan/${id}`);
    }

    detail(id) {
        return this.httpClient.get(`/v1/api/plan/${id}`);
    }

    getList(params) {
        return this.httpClient.get('/v1/api/plan/pageList', {params});
    }

    save(data) {
        console.log(data)
        return this.httpClient.post('/v1/api/plan', data);
    }
}
