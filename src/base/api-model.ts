import {ThemeTag, ThemeTagProp} from '../rqt-service/theme.service';
import {ThemeTagData} from '../rqt-service/themeData.service';

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
