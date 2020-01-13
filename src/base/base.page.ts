import {AlertController, LoadingController} from '@ionic/angular';
import {BaseModel} from './base-model';

// Page基础类
export class BasePage {
    // 加载框
    public loadingController: LoadingController;
    public loadView: HTMLIonLoadingElement = null;
    public loadViewOn = false;

    // alert
    public alertController: AlertController;


    constructor() {
        this.loadingController = new LoadingController();
        this.alertController = new AlertController();
    }

    // region load

    // 加载数据
    loadDataStart() {
        this.loadData(null);
    }

    // 加载数据
    loadData(msg: string) {
        if (msg === null) {
            msg = '加载中';
        }

        this.presentLoading(msg);
    }

    // 加载完成
    loadDataCmp() {
        this.disLoading();

        this.loadDataCmpHandle();
    }

    // 加载完成后处理函数，加载成功和失败都会调用
    loadDataCmpHandle() {
    }

    // 显示加载框
    async presentLoading(message: string) {
        // 已经显示，不处理
        if (this.loadViewOn === true) {
            return;
        }

        this.loadViewOn = true;

        this.loadView = await this.loadingController.create({
            message: message,
            duration: 600000, // 600秒
            spinner: 'bubbles',
            translucent: true,
            // cssClass: null,
        });

        await this.loadView.present();

        const {role, data} = await this.loadView.onDidDismiss();
        this.loadViewOn = false;
        this.loadView = null;
    }

    // 关闭加载框
    disLoading() {
        if (this.loadView) {
            this.loadView.dismiss().then(r => {
                // console.log(r);
            });
        }
    }

    // endregion

    // region alert

    async presentAlert(msg: string) {
        this.presentAlertConfirm('提示', msg);
    }

    async presentErrAlert(msg: string) {
        this.presentAlertConfirm(' 错误', msg);
    }

    async presentAlertConfirm(header: string, msg: string) {
        const alert = await this.alertController.create({
            header: header === null ? '提示' : header,
            // message: '登录已过期，请重新登录 <strong>!!!</strong>',
            message: msg,
            buttons: [
                {
                    text: '确定',
                    handler: () => {
                    }
                }
            ]
        });

        await alert.present();
    }

    // endregion

    handleRqtError(error: any) {
        console.log('handleRqtError');
        console.log(error);

        this.loadDataCmpHandle();

        this.loadDataCmp();

        if (error instanceof BaseModel) {
            let msg = null;
            if (error.errorMsg) {
                msg = error.errorMsg;
            } else {
                msg = '未知错误';
            }
            this.presentAlertConfirm('错误', msg);

            return;
        }

        this.presentAlertConfirm('错误', error);
    }
}
