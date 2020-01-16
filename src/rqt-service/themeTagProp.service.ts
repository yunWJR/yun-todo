import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';


export class ThemeTagProp {
    id: number;
    createTime: number;
    name: string;
    dataType: number;
    dataTypeId: number;
    dataUnit: string;

    dataValue: string; // 自定义属性：输入值
}

export class ThemeTagPropDto {
    tagId: number;
    name: string;
    dataType: number;
    dataUnit: string;
}

@Injectable({
    providedIn: 'root'
})
export class ThemeTagPropService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    info(themeId: number, params) {
        return this.httpClient.get(`/v1/api/record/themeTagProp/${themeId}`, {params});
    }

    delete(itemId: number) {
        return this.httpClient.delete(`/v1/api/record/themeTagProp/${itemId}`);
    }

    create(body: ThemeTagPropDto) {
        return this.httpClient.post(`/v1/api/record/themeTagProp`, body);
    }
}
