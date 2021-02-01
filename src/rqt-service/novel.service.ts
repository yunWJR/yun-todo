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

@Injectable({
    providedIn: 'root'
})
export class NovelService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    search(name: string, params) {
        return this.httpClient.get(`/v1/api/novel/search`, {params});
    }

    addItem(srcId: string) {
        return this.httpClient.post(`/v1/api/novel/add/${srcId}`, {});
    }

    delete(novelId: number) {
        return this.httpClient.delete(`/v1/api/novel/${novelId}`);
    }

    list(params) {
        return this.httpClient.get(`/v1/api/novel/list`, {params});
    }

    info(novelId: number) {
        return this.httpClient.get(`/v1/api/novel/${novelId}`, {});
    }

    chapterList(novelId: number, params) {
        return this.httpClient.get(`/v1/api/novel/chapterList/${novelId}`, {params});
    }

    chapterContent(chapterId: number, params) {
        return this.httpClient.get(`/v1/api/novel/chapterContent/${chapterId}`, {params});
    }

    updateAllIndex() {
        return this.httpClient.get(`/v1/api/novel/updateAllIndex`);
    }
}
