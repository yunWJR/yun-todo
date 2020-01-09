import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class Question {
    id: number;
    type: number;
    subject: string;
    remark: string;
    createTime: number;
    choiceList: QuestionChoice[];
}

export class QuestionChoice {
    id: number;
    choice: string;
    selCount: number;
}

@Injectable({
    providedIn: 'root'
})
export class QuestionService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    detail(tagId) {
        return this.httpClient.get(`/v1/api/question/${tagId}`);
    }

    getPageList(params) {
        return this.httpClient.get('/v1/api/question/pageList', {params});
    }
}
