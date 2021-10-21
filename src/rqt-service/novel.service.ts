import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

export class PageData {
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPage: number;

    results: FckItemData[] = null;
}

export class FckItemData {
    author: string;
    title: string;
    type: string;
    content: string;
    image: string;
    videoUrl: string;
    createTime: string;
    channelId: string;
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
        return this.httpClient.get(`/fck-api/v1/api/fck/page`, {params});
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

    updateAllChapter() {
        return this.httpClient.get(`/v1/api/novel/updateAllChapter`);
    }
}
