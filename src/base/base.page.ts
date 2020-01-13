import {AlertController, LoadingController, NavController} from '@ionic/angular';
import {BaseModel} from './base-model';

// Page基础类
export class BasePage {
    // 加载框
    public loadingController: LoadingController;
    public loadView: HTMLIonLoadingElement = null;
    public loadViewOn = false;

    // alert
    public alertController: AlertController;


    constructor(
        public navController: NavController,
    ) {
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
    async presentLoading(msg: string) {
        // 已经显示，不处理
        if (this.loadViewOn === true) {
            return;
        }

        this.loadViewOn = true;

        this.loadView = await this.loadingController.create({
            message: msg,
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

    async presentCommonAlert(msg: string) {
        this.presentAlert('提示', msg);
    }

    async presentErrorAlert(msg: string) {
        this.presentAlert(' 错误', msg);
    }

    async presentAlert(header: string, msg: string) {
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

    async presentAlertHandle(header: string, msg: string, okHandler: any) {
        const alert = await this.alertController.create({
            header: header === null ? '提示' : header,
            // message: '登录已过期，请重新登录 <strong>!!!</strong>',
            message: msg,
            buttons: [
                {
                    text: '确定',
                    handler: okHandler,
                }
            ]
        });

        await alert.present();
    }

    // endregion

    handleRqtError(error: any) {
        this.loadDataCmpHandle();

        this.loadDataCmp();

        console.log(error)

        if (error instanceof BaseModel) {
            // 登录已过期
            if (error.code === 401) {

                this.presentAlertHandle('提示', '登录已过期，请重新登录', (rst => {
                    this.navController.navigateRoot('login');
                }));

                return;
            }


            let msg = null;
            if (error.errorMsg) {
                msg = error.errorMsg;
            } else {
                msg = '未知错误';
            }
            this.presentAlert('错误', msg);

            return;
        }

        this.presentAlert('错误', error);
    }
}
