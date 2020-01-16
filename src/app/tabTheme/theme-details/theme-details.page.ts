import {Component, OnInit, ViewChild} from '@angular/core';
import {BasePage} from '../../../base/base.page';
import {IonRefresher, NavController} from '@ionic/angular';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Theme, ThemeService, ThemeTag, ThemeTagProp} from '../../../rqt-service/theme.service';
import {DateUtils} from '../../../utils/date.utils';
import {ThemeTagDto, ThemeTagService} from '../../../rqt-service/themeTag.service';
import {ThemeTagPropDataTypeUtil} from '../../common/module/theme.tag.prop.dataType.util';
import {ThemeTagPropDto, ThemeTagPropService} from '../../../rqt-service/themeTagProp.service';

@Component({
    selector: 'app-theme-details',
    templateUrl: './theme-details.page.html',
    styleUrls: ['./theme-details.page.scss'],
})
export class ThemeDetailsPage extends BasePage implements OnInit {
    @ViewChild('ionRefresher', {read: IonRefresher, static: false}) ionRefresher: IonRefresher;

    themeId: number;

    addTag: boolean;
    newTagName: string;

    addTagPropData: ThemeTagPropDto;

    themeData: Theme = new Theme();

    dataTypeUtil: ThemeTagPropDataTypeUtil = new ThemeTagPropDataTypeUtil();

    propDataTypeAlertOptions: any = {
        header: '请选择类型',
        // subHeader: '',
        // message: '',
        // translucent: true
    };

    constructor(
        public navCtrl: NavController,
        public router: Router,
        public themeRqt: ThemeService,
        public themeTagRqt: ThemeTagService,
        public themeTagPropRqt: ThemeTagPropService,
        public dateUtils: DateUtils,
        public activeRoute: ActivatedRoute,
    ) {
        super(navCtrl);

        this.addTag = false;

        this.activeRoute.queryParams.subscribe((params: Params) => {
            this.themeId = params.themeId;
        });
    }

    // region lift cycle

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.getThemeRqt();
    }

    // 加载完成后，停止刷新动画
    loadDataCmpHandle() {
        this.cmpRefresh();
    }

    // endregion

    // region rqt

    getThemeRqt() {
        this.loadDataStart();

        this.themeRqt.info(this.themeId, null).subscribe((res: Theme) => {
            this.themeData = res;

            this.loadDataCmp();
        }, (error: any) => {
            this.handleRqtError(error);
        });
    }

    createThemeTagRqt(name: string, remark: string) {
        this.loadDataStart();

        const dto = new ThemeTagDto();
        dto.name = name;
        dto.remark = remark;
        dto.themeId = this.themeId;

        this.themeTagRqt.create(dto).subscribe((res: Theme) => {
            this.showNewTagView(false);

            this.presentToast('记录项创建成功!');

            this.getThemeRqt();
        }, (error: any) => {
            this.handleRqtError(error);
        });
    }

    deleteThemeTagRqt(themeId: number) {
        this.loadDataStart();

        this.themeTagRqt.delete(themeId).subscribe((res: any) => {
            this.presentToast('共删除' + res + '条数据');
            this.getThemeRqt();
        }, (error: any) => {
            this.handleRqtError(error);
        });
    }


    createThemeTagPropRqt() {
        this.loadDataStart();

        this.themeTagPropRqt.create(this.addTagPropData).subscribe((res: Theme) => {
            this.showNewTagPropView(null, false);

            this.presentToast('数据项创建成功!');

            this.getThemeRqt();
        }, (error: any) => {
            this.handleRqtError(error);
        });
    }

    deleteThemeTagPropRqt(itemId: number) {
        this.loadDataStart();

        this.themeTagPropRqt.delete(itemId).subscribe((res: Theme) => {
            this.presentToast('共删除' + res + '条数据');

            this.getThemeRqt();
        }, (error: any) => {
            this.handleRqtError(error);
        });
    }

    // endregion

    // region handle

    nagBackOn() {
        this.navCtrl.back();
    }

    editThemeOn() {

    }

    addTagOn() {
        this.showNewTagView(true);
    }

    deleteTagOn(tag: ThemeTag) {
        this.presentAlertYesNo('提示', '确认删除记录项[' + tag.name + ']吗？',
            (suc => {
                this.deleteThemeTagRqt(tag.id);
            }),
            (cancel => {
            }));
    }

    editTagOn(tag: ThemeTag) {

    }

    addTagPropOn(tag: ThemeTag) {
        this.showNewTagPropView(tag, true);
    }

    deleteTagPropOn(prop: ThemeTagProp) {
        this.presentAlertYesNo('提示', '确认删除数据项[' + prop.name + ']吗？',
            (suc => {
                this.deleteThemeTagPropRqt(prop.id);
            }),
            (cancel => {
            }));
    }

    editTagPropOn(prop: ThemeTagProp) {

    }

    addNewTagOn() {
        if (!this.newTagName) {
            this.presentCommonAlert('请输入新纪录项名称');
            return;
        }

        this.createThemeTagRqt(this.newTagName, null);
    }

    addNewTagPropOn() {
        if (!this.addTagPropData) {
            this.presentCommonAlert('请输入新数据项');
            return;
        }

        if (!this.addTagPropData.name) {
            this.presentCommonAlert('请输入新数据项名称');
            return;
        }

        if (!this.addTagPropData.dataType) {
            this.presentCommonAlert('请选择新数据项类型');
            return;
        }

        this.createThemeTagPropRqt();
    }

    newPropDataTypeChangeOn(event) {
        this.addTagPropData.dataType = event.target.value;
    }

    // endregion

    showNewTagView(isShow: boolean) {
        this.newTagName = null;
        this.addTag = isShow;
    }

    showNewTagPropView(tag: ThemeTag, isShow: boolean) {
        if (isShow) {
            this.addTagPropData = new ThemeTagPropDto();
            this.addTagPropData.tagId = tag.id;
        } else {
            this.addTagPropData = null;
        }
    }

    isShowAddProp(tag: ThemeTag): boolean {
        if (!this.addTagPropData || !this.addTagPropData.tagId) {
            return false;
        }

        return tag.id === this.addTagPropData.tagId;
    }

    doRefresh() {
        this.getThemeRqt();
    }

    cmpRefresh() {
        if (this.ionRefresher) {
            this.ionRefresher.complete();
        }
    }
}
