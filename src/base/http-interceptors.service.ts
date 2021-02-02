import {HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of, throwError} from 'rxjs';
import {catchError, mergeMap, retry} from 'rxjs/operators';
import {AlertController} from '@ionic/angular';
import {DataStorage} from './data-storage.service';
import {environment} from '../environments/environment';
import {BaseModel} from './base-model';

@Injectable({
    providedIn: 'root'
})

export class HttpInterceptorsService implements HttpInterceptor {

    public baseUrl = '';

    constructor(
        public router: Router,
        private alertController: AlertController,
        public dataStorage: DataStorage,
    ) {
        if (environment.production === true) {
            // this.baseUrl = 'http://fffy.api.yunsoho.cn';

            // yun-aliyun
            this.baseUrl = 'http://47.106.189.179:12041';

            this.baseUrl = 'http://test.byb100.com:12041';
        } else {
            this.baseUrl = 'http://test.byb100.com:12041';
            // this.baseUrl = 'http://127.0.0.1:12041';
        }
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        // url 格式化
        const fullUrl = req.url.indexOf('http') === 0;
        const url = fullUrl ? req.url : `${this.baseUrl}${req.url}`;

        // 添加 header
        const token = this.dataStorage.getLoginToken();
        const header = {
            DEVICE_TYPE: '3',
            Authorization: token,
            'Content-Type': 'application/json',
        };

        // clone 新请求
        const newReq = req.clone({
            url,
            setHeaders: header,
        });

        return next.handle(newReq).pipe(
            // 失败时重试2次
            retry(2),
            // 正常返回
            mergeMap((event: any) => {
                // 请求成功
                if (event instanceof HttpResponse && event.status === 200) {
                    return this.filterData(event);
                }

                return of(event);
            }),
            catchError((err) => {
                // 登录过期
                if (err.status === 401) {
                    return throwError(this.createErrData(401, null, err));
                }

                if (err.status === 200) {
                    return throwError(this.createErrData(err.body.code, err.body.errorMsg, err));
                }

                return throwError(this.createErrData(-1, '网络错误', err));
            }),
        );
    }

    createErrData(code, msg, event): BaseModel<any> {
        const err = new BaseModel<any>();
        err.code = code;
        err.errorMsg = msg;
        err.data = event;

        return err;
    }

    async presentAlertConfirm(msg: string) {
        const alert = await this.alertController.create({
            header: '提示',
            // message: '登录已过期，请重新登录 <strong>!!!</strong>',
            message: msg,
            buttons: [
                {
                    text: '确定',
                    handler: () => {
                        this.router.navigate(['login']);
                    }
                }
            ]
        });

        await alert.present();
    }

    private filterData(event: HttpResponse<any>): Observable<any> {
        if (event.body.code === 200) {
            return of(new HttpResponse(Object.assign(event, {body: event.body.result})));
        }

        throw event;
    }
}
