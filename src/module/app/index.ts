import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RoutingModule} from '../routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslatePageComponent} from './page/translate/component';
import {MaterialModule} from '../material';
import {SubtitleService} from './service/subtitle';
import {HomePageComponent} from './page/home/component';
import {AppComponent} from './component/app/component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,

    TranslatePageComponent,
    HomePageComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
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
