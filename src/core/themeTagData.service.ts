import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

export class ThemeTagDataDto {
    tagId: number;
    dateTime: number;

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
}
