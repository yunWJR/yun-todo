import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Theme} from './theme.service';

export class ThemeTagData {
    id: number;
    createTime: number;
    dateTime: number;
    name: string;
    remark: string;
    date: string;
    theme: Theme;
    propDataList: TagPropData[];

    time(): string {
        const d = new Date(this.dateTime / 1000);
        return d.toTimeString();
    }
}

export class TagPropData {
    hasData: boolean;
    prop: ThemeTagProp;
    propData: ThemeTagPropData;
}

export class ThemeTagProp {
    id: number;
    createTime: number;
    name: string;
    dataType: number;
    dataTypeId: number;
    dataUnit: string;
}

export class ThemeTagPropData {
    id: number;
    createTime: number;
    orgValue: string;
    dataType: number;
    dataTypeId: number;
}

export class TagStatisticsDto {
    themeId: number;
    date: string;
    tagIds: number[] = [];
}

@Injectable({
    providedIn: 'root'
})
export class ThemeDataService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    list(params) {
        return this.httpClient.get(`/v1/api/record/themeData/list`, {params});
    }

    page(params) {
        return this.httpClient.get(`/v1/api/record/themeData/page`, {params});
    }

    info(themeId: number, params) {
        return this.httpClient.get(`/v1/api/record/themeData/${themeId}`, {params});
    }

    tagStatistics(body: TagStatisticsDto) {
        return this.httpClient.post(`/v1/api/record/themeData/tagStatistics`, body);
    }
}
