import {Component, Input, OnInit} from '@angular/core';
import {ThemeTag, ThemeTagProp} from '../../../rqt-service/theme.service';
import {NavController, PopoverController} from '@ionic/angular';
import {TagPropDataDto, ThemeTagDataDto, ThemeTagDataService} from '../../../rqt-service/themeTagData.service';
import {BasePage} from '../../../base/base.page';
import {DateUtils} from '../../../utils/date.utils';
import {ThemeTagPropDataTypeUtil} from '../../common/module/theme.tag.prop.dataType.util';

@Component({
    selector: 'app-create-tag',
    templateUrl: './create-tag.component.html',
    styleUrls: ['./create-tag.component.scss'],
})
export class CreateTagComponent extends BasePage implements OnInit {

    @Input() tag: ThemeTag;

    @Input() selDate: string;

    selTime: string;

    dataType: ThemeTagPropDataTypeUtil = new ThemeTagPropDataTypeUtil();

    constructor(
        public navCtrl: NavController,
        public popoverCtrl: PopoverController,
        public themeTagDataService: ThemeTagDataService,
        public dateUtils: DateUtils,
    ) {
        super(navCtrl);
        this.selTime = this.dateUtils.dateFormat('HH:mm:ss', new Date());
    }

    ngOnInit() {
    }

    clearData() {
        for (const pp of this.tag.propList) {
            pp.dataValue = null;
        }
    }

    cancelOn() {
        this.clearData();
        this.popoverCtrl.dismiss({
            save: false,
        });
    }

    saveOn() {
        this.saveTagData();
    }

    saveTagData() {
        const dto = new ThemeTagDataDto();
        dto.tagId = this.tag.id;
        dto.date = this.selDate;
        dto.time = this.selTime;

        dto.propList = [];

        let hasItem = false;
        for (const prop of this.tag.propList) {
            if (prop.dataValue) {
                hasItem = true;

                const propDto = new TagPropDataDto();
                propDto.propId = prop.id;
                propDto.dataType = prop.dataType;
                propDto.dataValue = prop.dataValue;

                dto.propList.push(propDto);
            }
        }

        if (hasItem === false) {
            this.presentErrorAlert('请至少填写一项内容');
            return;
        }

        this.loadDataStart();
        this.themeTagDataService.save(dto).subscribe((res: any) => {
            this.clearData();

            this.loadDataCmp();

            this.popoverCtrl.dismiss({
                save: true,
            });
        }, (error: any) => {
            this.handleRqtError(error);
        });
    }

    propTitleText(index, prop: ThemeTagProp): string {
        let title = (index + 1) + ':' + prop.name;

        title = title + '[' + this.dataType.nameByType(prop.dataType);
        if (prop.dataUnit) {
            title = title + '：' + prop.dataUnit;
        }

        title = title + ']';

        return title;
    }

    propPlaceholderText(index, prop: ThemeTagProp): string {
        let title = '请输入' + this.dataType.nameByType(prop.dataType);

        if (prop.dataUnit) {
            title = title + '(单位：' + prop.dataUnit + ')';
        }

        return title;
    }

    // 1-input 2-text 3-none
    dataTypeInput(dataType: number): number {
        // 数据类型：1-Text、2-Int、3-Double、4-Money、5-Enum、6-Time、7-XXX7、8-XXX8、9-XXX9

        if (dataType === 1) {
            return 2;
        }

        return 1;
    }
}
