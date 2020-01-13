import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {CommonService} from './common.service';
import {HttpInterceptorsService} from '../base/http-interceptors.service';

@NgModule({
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorsService, multi: true},
        CommonService,
    ]
})
export class RqtServiceModule {
}
