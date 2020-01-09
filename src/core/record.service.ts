import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlanTarget } from './plan.target.service';
import { RecordQuestion } from './record.question.service';
import { TagStatus } from './record.tag.service';

export class RecordDTO {
    target: PlanTarget;
    tagList: TagStatus[];
    questionList: RecordQuestion[];
}

@Injectable({
    providedIn: 'root'
})
export class RecordService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    saveRecord(targetData: PlanTarget, tagList: TagStatus[], questionList: RecordQuestion[], status: number) {
        const data = new RecordDTO();
        data.target = targetData;
        data.target.status = status;
        if (status === 4) { // 正常回访-保存数据
            data.tagList = tagList;
            data.questionList = questionList;
        }

        console.log(this.httpClient);

        return this.httpClient.post(`/v1/api/record`, data);
    }

    getPlanList(params) {
        return this.httpClient.get('/v1/api/record/planPageList', {params});
    }

    getPlanTargetList(params) {
        return this.httpClient.get('/v1/api/record/planTargetPageList', {params});
    }
}
