import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslatePageComponent} from './page/translate/component';
import {MaterialModule} from '../module/material';
import {SubtitleService} from '../service/subtitle';
import {HomePageComponent} from './page/home/component';

@NgModule({
  declarations: [
    AppComponent,

    TranslatePageComponent,
    HomePageComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    SubtitleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
