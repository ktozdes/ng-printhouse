import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { httpInterceptorProviders } from './interceptors';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppStoreModule } from './store/app-store.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxUploaderModule } from 'ngx-uploader';


import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { SimpleDemoComponent } from './simple-demo-component/simple-demo-component.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    SimpleDemoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    AppStoreModule,
    NgxUploaderModule
  ],
  exports: [
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
