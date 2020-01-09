import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class PlanTarget {
    id: number;
    target: string;
    name: string;
    remark: string;
    priority: number;
    status: number;
    planId: number;
    recordRemark: string;
    executorName: string;
}

export class PlanTargetStatusUtil {
    public status: [0, 1, 2, 3, 4, 5];

    constructor() {
        this.status = [0, 1, 2, 3, 4, 5];
    }

    isValidStatus(status: number): boolean {
        if (status && status >= 1 && status <= 5) {
            return true;
        }

        return false;
    }
}

export class ExecutorUser {
    id: number;
    name: string;
}

export class PlanTargetIdsDto {
    startIndex: number = 0;
    endIndex: number = 0;
}

export class BatchItemDto {
    batch: string;
}

export class TargetListDto {
    items: TargetItemDto[] = [];
}

export class TargetItemDto {
    target: string;
    remark: string;
}

@Injectable({
    providedIn: 'root'
})
export class PlanTargetService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    getExecutorList(params) {
        return this.httpClient.get('/v1/api/planTarget/executorList', {params});
    }

    updateExecutor(planId, userId, data: PlanTargetIdsDto) {
        return this.httpClient.post(`/v1/api/planTarget/updateExecutor/${planId}/${userId}`, data);
    }

    addItem(planId, data) {
        return this.httpClient.post(`/v1/api/planTarget/item/${planId}`, data);
    }

    addList(planId, data: TargetListDto) {
        return this.httpClient.post(`/v1/api/planTarget/list/${planId}`, data);
    }

    addBatch(planId, data: BatchItemDto) {
        return this.httpClient.post(`/v1/api/planTarget/batch/${planId}`, data);
    }

    remove(id) {
        return this.httpClient.delete(`/v1/api/planTarget/${id}`);
    }

    detail(id) {
        return this.httpClient.get(`/v1/api/planTarget/${id}`);
    }

    getList(params) {
        return this.httpClient.get('/v1/api/planTarget/pageList', {params});
    }
}
