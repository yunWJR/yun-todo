import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class PlanQuestion {
    id: number;
    subject: string;
    remark: string;
    priority: number;
    type: number;
}

export class PlanQuestionDto {
    subject: string;
    remark: string;
    type = 1; // 默认1

    choiceList: PlanQuestionChoiceDto[] = [];
}

export class PlanQuestionChoiceDto {
    choice: string;
    priority = 0;
}

export class TargetListDto {
    items: QuestionDto[] = [];
}

export class QuestionDto {
    questionId: 0;
    priority: 0;
}

@Injectable({
    providedIn: 'root'
})
export class PlanQuestionService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    addQuestion(planId, data: TargetListDto) {
        return this.httpClient.post(`/v1/api/planQuestion/${planId}`, data);
    }

    createQuestion(planId, data) {
        return this.httpClient.post(`/v1/api/planQuestion/newQuestion/${planId}`, data);
    }

    remove(id, qId) {
        return this.httpClient.delete(`/v1/api/planQuestion/delete/${id}/${qId}`);
    }

    getList(params) {
        return this.httpClient.get('/v1/api/planQuestion/pageList', {params});
    }
}
