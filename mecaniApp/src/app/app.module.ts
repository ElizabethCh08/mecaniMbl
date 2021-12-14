
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthInterceptor } from './pages/services/auth.interceptor';
import { AuthGuard } from './pages/services/auth-guard.service';

import { AgmCoreModule } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NgxMatErrorsModule } from "ngx-mat-errors";


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    NgxMatErrorsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule, AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDtAuTqvo6xhCwFSdZTdQNgvGQAMEVu_DQ',
      libraries: ['places']
    }),],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
    AuthGuard, Geolocation],
  bootstrap: [AppComponent],
})
export class AppModule { }
