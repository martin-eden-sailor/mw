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
import {ControlErrorComponent} from './directive/control-errors/control-error-component';
import {
  ControlErrorContainerDirective,
  ControlErrorsDirective
} from './directive/control-errors/control-errors-directive';
import {FormSubmitDirective} from './directive/control-errors/form-submit-directive';
import {defaultErrors, FORM_ERRORS} from './directive/control-errors/form-errors-provider';

@NgModule({
  declarations: [
    AppComponent,
    ControlErrorComponent,
    ControlErrorsDirective,
    ControlErrorContainerDirective,
    FormSubmitDirective,

    TranslatePageComponent,
    HomePageComponent
  ],
  entryComponents: [
    ControlErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    SubtitleService,
    {
      provide: FORM_ERRORS, useValue: defaultErrors
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
