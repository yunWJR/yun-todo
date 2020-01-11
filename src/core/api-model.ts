import {ThemeTag, ThemeTagProp} from './theme.service';
import {ThemeTagData} from './themeData.service';

export class ThemeTagStatistics {
    tag: ThemeTag;
    tagDataList: ThemeTagData[];
    propStatisticsList: ThemeTagPropStatistics[];
}

export class ThemeTagPropStatistics {
    prop: ThemeTagProp;
    count: number;
    dataValue: string;
    dataUnit: string;
}
