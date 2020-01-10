import {Component, Input, OnInit} from '@angular/core';
import {ThemeTag, ThemeTagProp} from '../../../core/theme.service';
import {PopoverController} from '@ionic/angular';
import {TagPropDataDto, ThemeTagDataDto, ThemeTagDataService} from '../../../core/themeTagData.service';

@Component({
    selector: 'app-create-tag',
    templateUrl: './create-tag.component.html',
    styleUrls: ['./create-tag.component.scss'],
})
export class CreateTagComponent implements OnInit {

    @Input() tag: ThemeTag;

    constructor(
        public popoverCtrl: PopoverController,
        public themeTagDataService: ThemeTagDataService,
    ) {
        console.log(this.tag);
    }

    ngOnInit() {
    }

    clearData() {
        for (const pp of this.tag.propList) {
            pp.dataValue = null;
        }
    }

    cancel() {
        this.clearData();
        this.popoverCtrl.dismiss({
            save: false,
        });
    }

    save() {
        this.saveTagData();
    }

    saveTagData() {
        const dto = new ThemeTagDataDto();
        dto.tagId = this.tag.id;
        dto.dateTime = new Date().getTime();
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

            return;
        }

        this.themeTagDataService.save(dto).subscribe((res: any) => {
            this.clearData();
            this.popoverCtrl.dismiss({
                save: true,
            });
        });
    }

    propTitleStr(prop: ThemeTagProp): string {
        let title = prop.name;
        title = title + ' (';

        title = title + '类型：' + this.dataTypeStr(prop.dataType);
        if (prop.dataUnit) {
            title = title + ';  单位：' + prop.dataUnit;
        }

        title = title + ')';

        return title;
    }

    dataTypeStr(dataType: number): string {
        // 数据类型：1-Text、2-Int、3-Double、4-Money、5-Enum、6-Time、7-XXX7、8-XXX8、9-XXX9

        if (dataType === 1) {
            return '文本';
        } else if (dataType === 2) {
            return '数字';
        } else if (dataType === 3) {
            return '小数';
        } else if (dataType === 4) {
            return '金额';
        } else if (dataType === 5) {
            return '选择';
        } else if (dataType === 6) {
            return '次';
        }

        return '未知类型';
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
