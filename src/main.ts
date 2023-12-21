import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { ROUTES } from './_routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

import {
  DatePipe, 
  registerLocaleData,
  HashLocationStrategy,
  LocationStrategy
 } from '@angular/common';

 import en from '@angular/common/locales/en';
import { HandleErrorInterceptor } from './app/brokers/intercepters/handle.error.interceptor';
import { HeaderInterceptor } from './app/brokers/intercepters/header.interceptor';
import { provideEnvironmentNgxMask } from 'ngx-mask';

registerLocaleData(en);

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(ROUTES),
    importProvidersFrom(HttpClientModule, BrowserAnimationsModule),
    provideEnvironmentNgxMask(),
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HandleErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
    { 
      provide: LocationStrategy, 
      useClass: HashLocationStrategy 
    },
    DatePipe,
  ],
});
