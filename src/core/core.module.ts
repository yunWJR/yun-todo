import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonService } from './common.service';
import { HttpInterceptorsService } from './interceptors/http-interceptors.service';
import { PlanService } from './plan.service';

@NgModule({
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorsService, multi: true},
        CommonService,
        PlanService,
    ]
})
export class CoreModule {
}
