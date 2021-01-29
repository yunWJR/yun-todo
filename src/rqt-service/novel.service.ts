import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

export class NovelItemData {
    id: number;
    srcId: string;
    createTime: number;
    updateTime: number;
    name: string;
    author: string;
    remark: string;
    img: string;

    bookStatus: string;
    lastChapter: string;
    cname: string;

    curChapterId: number;
    curChapter: string;
    newChapter: boolean;
}

export class NovelChapterData {
    id: number;
    createTime: number;
    updateTime: number;
    novelId: number;


    preId: number;
    nextId: number;

    name: string;
    sectionName: string;

    hasContent: number;
    content: string;
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
export class NovelService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    list(params) {
        return this.httpClient.get(`/v1/api/novel/list`, {params});
    }

    page(params) {
        return this.httpClient.get(`/v1/api/record/themeData/page`, {params});
    }

    chapterContent(chapterId: number, params) {
        return this.httpClient.get(`/v1/api/novel/itemContent/${chapterId}`, {params});
    }

    chapterList(novelId: number) {
        return this.httpClient.get(`/v1/api/novel/itemIndex/${novelId}`);
    }

    tagStatistics(body: TagStatisticsDto) {
        return this.httpClient.post(`/v1/api/record/themeData/tagStatistics`, body);
    }

    delete(novelId: number) {
        return this.httpClient.delete(`/v1/api/novel/${novelId}`);
    }


    search(name: string, params) {
        return this.httpClient.get(`/v1/api/novel/search`, {params});
    }

    addItem(srcId: string) {
        return this.httpClient.post(`/v1/api/novel/add/${srcId}`, {});
    }

    updateAllIndex() {
        return this.httpClient.get(`/v1/api/novel/updateAllIndex`);
    }
}
