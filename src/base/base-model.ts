export class BaseModel<T> {
    code: number;
    errorMsg: string;
    data: T;
}

export class PageList<T> {
    pageIndex = 1;
    pageSize = 6;
    totalCount = 0;
    totalPage = 0;
    results: T[] = [];

    loadCmp(): boolean {
        return this.pageIndex === this.totalPage;
    }

    appendPage(rst) {
        const results = this.results;
        const newList: [] = rst.results;
        for (const nI of newList) {
            results.push(nI);
        }

        this.pageIndex = rst.pageIndex;
        this.pageSize = rst.pageSize;
        this.totalCount = rst.totalCount;
        this.totalPage = rst.totalPage;
        this.results = results;
    }

    addPage(rst): PageList<T> {
        const netP = new PageList<T>();

        const results = this.results;
        const newList: [] = rst.results;
        for (const nI of newList) {
            results.push(nI);
        }

        netP.pageIndex = rst.pageIndex;
        netP.pageSize = rst.pageSize;
        netP.totalCount = rst.totalCount;
        netP.totalPage = rst.totalPage;
        netP.results = results;

        return netP;
    }
}
