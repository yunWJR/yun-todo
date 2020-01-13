import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

export class ThemeTagDataDto {
    tagId: number;
    dateTime: number;
    date: string;
    time: string;

    propList: TagPropDataDto[];
}

export class TagPropDataDto {
    propId: number;
    dataType: number;
    dataValue: string;
}

@Injectable({
    providedIn: 'root'
})
export class ThemeTagDataService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    save(body) {
        return this.httpClient.post(`/v1/api/record/themeTagData`, body);
    }

    delete(themeId: number) {
        return this.httpClient.delete(`/v1/api/record/themeTagData/${themeId}`);
    }
}
