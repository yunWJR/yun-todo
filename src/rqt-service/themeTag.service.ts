import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

export class Theme {
    id: number;
    createTime: number;
    name: string;
    remark: string;
    tagList: ThemeTag[];
}

export class ThemeTag {
    id: number;
    createTime: number;
    name: string;
    remark: string;
    propList: ThemeTagProp[];
}

export class ThemeTagProp {
    id: number;
    createTime: number;
    name: string;
    dataType: number;
    dataTypeId: number;
    dataUnit: string;

    dataValue: string; // 自定义属性：输入值
}

export class ThemeTagDto {
    themeId: number;
    name: string;
    remark: string;
}

@Injectable({
    providedIn: 'root'
})
export class ThemeTagService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    info(themeId: number, params) {
        return this.httpClient.get(`/v1/api/record/themeTag/${themeId}`, {params});
    }

    delete(itemId: number) {
        return this.httpClient.delete(`/v1/api/record/themeTag/${itemId}`);
    }

    create(body: ThemeTagDto) {
        return this.httpClient.post(`/v1/api/record/themeTag`, body);
    }
}
