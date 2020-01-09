import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class RecordQuestion {
    id: number;
    subject: string;
    type: number;
    text: string;
    remark: string;
    choiceList: RecordQuestionChoice[];
    oneChoiceId: number;
}

export class RecordQuestionChoice {
    id: number;
    choice: string;
    // select: number;
    selectStatus: boolean;
}

@Injectable({
    providedIn: 'root'
})

export class RecordQuestionService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    getList(planId, itemId) {
        return this.httpClient.get(`/v1/api/questionRecord/list/${planId}/${itemId}`);
    }
}
