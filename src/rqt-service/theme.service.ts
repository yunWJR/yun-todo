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

export class ThemeDto {
    tmpId: number;
    name: string;
    remark: string;
}

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    list() {
        return this.httpClient.get(`/v1/api/record/theme/list`);
    }

    page(params) {
        return this.httpClient.get(`/v1/api/record/theme/page`, {params});
    }

    info(themeId: number, params) {
        return this.httpClient.get(`/v1/api/record/theme/${themeId}`, {params});
    }

    delete(themeId: number) {
        return this.httpClient.delete(`/v1/api/record/theme/${themeId}`);
    }

    create(body: ThemeDto) {
        return this.httpClient.post(`/v1/api/record/theme`, body);
    }
}
