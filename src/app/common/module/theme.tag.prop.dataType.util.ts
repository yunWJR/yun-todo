import {Injectable} from '@angular/core';

export class ThemeTagPropDataType {
    type: number;
    name: string;

    constructor(type: number, name: string) {
        this.type = type;
        this.name = name;
    }
}

@Injectable({
    providedIn: 'root'
})
export class ThemeTagPropDataTypeUtil {

    types: ThemeTagPropDataType[];

    constructor() {
        this.types = [];

        this.types.push(new ThemeTagPropDataType(1, '文本'));
        this.types.push(new ThemeTagPropDataType(2, '数字'));
        this.types.push(new ThemeTagPropDataType(3, '小数'));
        this.types.push(new ThemeTagPropDataType(4, '金额'));
        this.types.push(new ThemeTagPropDataType(5, '选择项-暂不支持'));
        this.types.push(new ThemeTagPropDataType(6, '次数'));
    }

    nameByType(type: number): string {
        return this.types[(type - 1)].name;
    }
}
