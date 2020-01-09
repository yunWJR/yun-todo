import {HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of, throwError} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';
import {ApiService} from '../api.service';

@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorsService implements HttpInterceptor {

    public BaseUrl = '';
    public tUrl = '';
    public apiService: ApiService = new ApiService();

    constructor(
        public router: Router,
    ) {
        this.BaseUrl = this.apiService.BaseUrl;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = sessionStorage.getItem('token') || '';


        const fullUrl = req.url.indexOf('http') === 0;

        const commonUrl = req.url.indexOf('/common') === 0;

        let url = fullUrl ? req.url : `${this.BaseUrl}${req.url}`;

        if (commonUrl) {
            url = `${this.tUrl}${req.url}`;
        }

        let header;

        if (req.url.includes('planTarget/updateExcelOfTarget')) {
            header = {
                DEVICE_TYPE: '3',
                Authorization: token,
            };
        } else {
            header = {
                DEVICE_TYPE: '3',
                Authorization: token,
                'Content-Type': 'application/json',
            };
        }

        const newReq = req.clone({
            url,
            setHeaders: header,
        });

        return next.handle(newReq).pipe(
            mergeMap((event) => {
                if (event instanceof HttpResponse && event.status === 200) {
                    if (fullUrl) {
                        return of(event);
                    }
                    return this.filterData(event);
                }
                return of(event);
            }),
            catchError((err) => {
                if (err.status === 401) {
                    this.createMsg('error', '登陆过期请重新登陆');
                    this.router.navigate(['login']);
                    return throwError(err);
                }
                if (err.status === 200) {
                    this.createMsg('error', err.body.errorMsg);
                    return throwError(err);
                }
                this.createMsg('error', '网络连接失败');
                // console.log(err);
                return throwError(err);
            })
        );
    }

    createMsg(type, msg) {
        console.log(type + msg);
    }

    private filterData(event: HttpResponse<any>): Observable<any> {
        if (event.body.code === 200) {
            return of(new HttpResponse(Object.assign(event, {body: event.body.data})));
        }
        throw event;
    }
}
